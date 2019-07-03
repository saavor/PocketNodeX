const INT32_MIN = -0x80000000;
const INT32_MAX = 0x7fffffff;

const Isset = pocketnode("utils/methods/Isset");


 class Level {
     /**
      * @param x {Number}
      * @param z {Number}
      * @return {Number}
      */
    static chunkHash(x, z){
        return ((x & 0xFFFFFFFF) << 32) | (z & 0xFFFFFFFF);
    }

     static chunkBlockHash(x, y, z){
        return (y << 8) | ((z & 0xf) << 4) | (x & 0xf);
     }

    initVars(){
        this.tickRateTime = 0;
        this._server = null;
        this._name = "";
        this._id = -1;
        /** @type {Map<Number, Dimension>} */
        this._dimensions = new Map();
        this._defaultDimension = null;
        this._blockCache = [];

        /** @type {Map<String, GameRule>} */
        this._gameRules = new Map();

        /** @type {Map<Number, Chunk>} */
        this._chunks = new Map();
        this._worldHeight = 256;
        this._blockStates = [];

        this.updateEntities = [];
    }

    constructor(server, name, id, chunks){
        this.initVars();
    }

    getChunkAtPosition(pos, create = false){
        return this.getChunk(pos.getFloorX() >> 4, pos.getFloorZ() >> 4, create);
    }

    getChunk(x, z, create = false){
        let index;
        if(this._chunks.has(index = Level.chunkHash(x, z))){
            return this._chunks.get(index);
        }else if(this.loadChunk(x, z, create)){
            return this._chunks.get(index);
        }

        return null;
    }

    /*doTick(currentTick){
        //console.log(`CurrentTick: ${currentTick}`);
        this.doingTick = true;
        try{
            //this.actuallyDoTick(currentTick);
        }finally {
            this.doingTick = false;
        }
    }

     /*actuallyDoTick(currentTick){
        this..getOnlinePlayers().forEach(player => {
            player.onUpdate(currentTick);
        });
     }*/

    getBlock(pos, cached = true, addToCache = true){
        return this.getBlockAt(Number(Math.floor(pos.x)), Number(Math.floor(pos.y)), Number(Math.floor(pos.z)), cached, addToCache);
    }


    getBlockAt(x, y, z, cached = true, addToCache = true){
        let fullState = 0;
        let relativeBlockHash = null;
        let chunkHash = Level.chunkHash(x >> 4, z >> 4);

        if (this.isInWorld(x, y , z)){
            relativeBlockHash = Level.chunkBlockHash(x, y ,z);

            if (cached && Isset(this._blockCache[chunkHash][relativeBlockHash])){
                return this._blockCache[chunkHash][relativeBlockHash];
            }

            let chunk = this._chunks[chunkHash];
            if (chunk !== null){
                let fullState = chunk.getFullBlock(x & 0x0f, y, z & 0x0f);
            }else {
                addToCache = false;
            }
        }

        let block = Object.assign({}, this._blockStates[fullState & 0xfff]);

        block.x = x;
        block.y = y;
        block.z = z;

        if (addToCache && relativeBlockHash !== null){
            this._blockCache[chunkHash][relativeBlockHash] = block;
        }

        return block;
    }

     isInWorld(x, y ,z){
        return (
            x <= INT32_MAX && x >= INT32_MIN &&
            y < this._worldHeight && y >= 0 &&
            z <= INT32_MAX && z >= INT32_MIN
        );
     }

     /**
      * @param x {Number}
      * @param z {Number}
      * @param create {Boolean}
      * @return {Boolean}
      */
    loadChunk(x, z, create = true){
        let chunkHash;
        if(this._chunks.has(chunkHash = Level.chunkHash(x, z))){
            return true;
        }

        this._chunks.set(chunkHash, this.getGenerator().generateChunk(x, z));

        return true;
    }

    getServer(){
        return this._server;
    }

    getName(){
        return this._name;
    }

     /**
      * @return {Generator}
      */
    getGenerator(){
        return this._generator;
    }
}

module.exports = Level;