 class Level {
     /**
      * @param x {Number}
      * @param z {Number}
      * @return {Number}
      */
    static chunkHash(x, z){
        return ((x & 0xFFFFFFFF) << 32) | (z & 0xFFFFFFFF);
    }

    initVars(){
        this.tickRateTime = 0;
        this._server = null;
        this._name = "";
        this._id = -1;
        /** @type {Map<Number, Dimension>} */
        this._dimensions = new Map();
        this._defaultDimension = null;

        /** @type {Map<String, GameRule>} */
        this._gameRules = new Map();

        /** @type {Map<Number, Chunk>} */
        this._chunks = new Map();
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