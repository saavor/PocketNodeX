const INT32_MIN = -0x80000000;
const INT32_MAX = 0x7fffffff;

const Isset = pocketnode("utils/methods/Isset");

const Server = pocketnode("Server");

const Position = pocketnode("level/Position");
const Vector3 = pocketnode("math/Vector3");
const Generator = pocketnode("level/generator/Generator");
const ChunkLoader = pocketnode("level/ChunkLoader");

class Level {

    static get Y_MAX() {
        return 0x100
    };

    static get Y_MASK() {
        return 0xFF
    };

    static get DIFFICULTY_PEACEFUL() {
        return 0
    };

    static get DIFFICULTY_EASY() {
        return 1
    };

    static get DIFFICULTY_NORMAL() {
        return 2
    };

    static get DIFFICULTY_HARD() {
        return 3
    };

    initVars() {
        /** @type {number} */
        this._levelIdCounter = 1;
        this._chunkLoaderCounter = 1;

        this._tiles = [];

        this._players = [];

        this._entities = [];

        this.updateEntities = [];
        this.updateTiles = [];
        this._blockCache = [];

        this._chunkCache = [];

        this._sendTimeTicker = 0;

        this._server = null;

        this._levelId = -1;

        this._provider = null;
        this._providerGarbageCollectionTicker = 0;

        this._worldHeight = 256;

        this._loaders = [];
        this._loaderCounter = [];
        this._chunkLoaders = [];
        this._playerLoaders = [];

        this._chunkPackets = [];
        this._globalPackets = [];

        this._unloadQueue = [];

        this._time = -1;
        this.stopTime = false;

        this._sunAnglePercentage = 0.0;
        this._skyLightReduction = 0;

        this._folderName = "";
        this._displayName = "";

        this._chunks = [];

        this._changedBlocks = [];

        this._scheduledBlockUpdateQueue = null;
        this._scheduledBlockUpdateQueueIndex = [];

        this._neighbourBlockUpdateQueue = null;

        this._chunkSendQueue = [];
        this._chunkSendTasks = [];

        this._chunkPopulationQueue = [];
        this._chunkPopulationLock = [];
        this._chunkPopulationQueueSize = 2;
        this._generatorRegisteredWorkers = [];

        this._autoSave = true;

        this._blockMetadata = null;

        /** @type {Position} */
        this._temporalPosition = new Position(0, 0, 0);
        /** @type {Vector3} */
        this._temporalVector = new Vector3(0, 0, 0);

        this._blockStates = [];

        /** @type {number} */
        this._sleepTicks = 0;

        /** @type {number} */
        this._chunkTickRadius = -1;
        /** @type {number[]} */
        this._chunkTickList = [];
        /** @type {number} */
        this._chunksPerTick = -1;
        /** @type {boolean} */
        this._clearChunksOnTick = false;
        this._randomTickBlocks = null;

        this.timings = null;

        /** @type {number} */
        this.tickRateTime = 0;
        /**
         * @deprecated
         * @type {number}
         */
        this.tickRateCounter = 0;

        /** @type {boolean} */
        this._doingTick = false;

        /** @type {string|Generator} */
        this._generator = "";

        /** @type {boolean} */
        this._closed = false;

        this._blockLightUpdate = null;
        this._skyLightUpdate = null;
    }

    /**
     * @param x {number}
     * @param z {number}
     * @return {number}
     */
    static chunkHash(x, z) {
        return ((x & 0xFFFFFFFF) << 32) | (z & 0xFFFFFFFF);
    }

    /**
     *
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @return {number}
     */
    static blockHash(x, y, z) {
        if (y < 0 || y >= Level.Y_MAX) {
            console.log(`Y coordinate ${y} is out of range!`);
        }
        return ((x & 0xFFFFFFF) << 36) | ((y & Level.Y_MASK) << 28) | (z & 0xFFFFFFF);
    }

    /**
     *
     * @param x
     * @param y
     * @param z
     * @return {number}
     */
    static chunkBlockHash(x, y, z) {
        return (y << 8) | ((z & 0xf) << 4) | (x & 0xf);
    }

    /**
     *
     * @param hash {number}
     * @param x {number}
     * @param y {number}
     * @param z {number}
     */
    static getBlockXYZ(hash, x, y, z) {
        x = hash >> 36;
        y = (hash >> 28) & Level.Y_MASK; //it's always positive
        z = (hash & 0xFFFFFFF) << 36 >> 36;
    }

    /**
     *
     * @param hash {number}
     * @param x {number|null}
     * @param z {number|null}
     */
    static getXZ(hash, x, z) {
        x = hash >> 32;
        z = (hash & 0xFFFFFFFF) << 32 >> 32;
    }

    /**
     *
     * @param loader {ChunkLoader}
     * @return {number}
     */
    static generateChunkLoaderId(loader) {
        if (loader.getLoaderId() === 0) {
            return self._chunkLoaderCounter++;
        } else {
            console.log(`ChunkLoader has a loader id already assigned: " . ${loader.getLoaderId()}`);
        }
    }

    /**
     *
     * @param str {string}
     * @return {number}
     */
    static getDifficultyFromString(str) {
        switch (str.toLowerCase().trim()) {
            case "0":
            case "peaceful":
            case "p":
                return Level.DIFFICULTY_PEACEFUL;

            case "1":
            case "easy":
            case "e":
                return Level.DIFFICULTY_EASY;

            case "2":
            case "normal":
            case "n":
                return Level.DIFFICULTY_NORMAL;

            case "3":
            case "hard":
            case "h":
                return Level.DIFFICULTY_HARD;
        }

        return -1;
    }


    /**
     *
     * @param server {Server}
     * @param name {string}
     * @param provider {LevelProvider}
     */
    constructor(server, name, provider) {
        this.initVars();

        //this._blockStates = BlockFactory; //TODO
        this._levelId = this._levelIdCounter++;
        //this._blockMetadata = new BlockMetadataStore(this); //TODO
        this._server = server;
        this._autoSave = server.getAutoSave();

        this._provider = provider;

        this._displayName = this._provider.getName();
        this._worldHeight = this._provider.getWorldHeight();

        console.log("Preparing level " + this._displayName + "...");
        //this._generator = GeneratorManager.getGenerator(this._provider.getGenerator(), true);
        //TODO: validate generator options

        this._folderName = name;

        //this._scheduledBlockUpdateQueue = new ReversePriorityQueue(); TODO
        //this._scheduledBlockUpdateQueue.setExtractFlags()

        //this._neighbourBlockUpdateQueue = new SplQueue();

        this._time = this._provider.getTime();

        //this._chunkTickRadius = Math.min(this._server.getViewDistance(), Math.max(1, this)) TODO

        let dontTickBlocks = [];

        this._randomTickBlocks = new Array(256);
        this._randomTickBlocks.forEach(id => {
           for (let $null in id){
               if (id.hasOwnProperty($null)){
                   let block = BlockFactory.get(id); //Make sure it's a copy
                   if (!Isset(dontTickBlocks[id]) && block.tickRandomly()){
                       this._randomTickBlocks[id] = block;
                   }
               }
           }
        });

        this._temporalPosition = new Position(0, 0, 0, this);
        this._temporalVector = new Vector3(0, 0, 0);
    }

    getChunkAtPosition(pos, create = false) {
        return this.getChunk(pos.getFloorX() >> 4, pos.getFloorZ() >> 4, create);
    }

    getChunk(x, z, create = false) {
        let index;
        if (this._chunks.has(index = Level.chunkHash(x, z))) {
            return this._chunks.get(index);
        } else if (this.loadChunk(x, z, create)) {
            return this._chunks.get(index);
        }

        return null;
    }

    actuallyDoTick(currentTick) {
        this.processChunkRequest();
    }

    doTick(currentTick) {
        //console.log(`CurrentTick: ${currentTick}`);
        this._doingTick = true;
        try {
            this.actuallyDoTick(currentTick);
        } finally {
            this._doingTick = false;
        }
    }

    processChunkRequest() {
        //todo
    }

    /*actuallyDoTick(currentTick){
       this..getOnlinePlayers().forEach(player => {
           player.onUpdate(currentTick);
       });
    }*/

    getBlock(pos, cached = true, addToCache = true) {
        return this.getBlockAt(Number(Math.floor(pos.x)), Number(Math.floor(pos.y)), Number(Math.floor(pos.z)), cached, addToCache);
    }


    getBlockAt(x, y, z, cached = true, addToCache = true) {
        let fullState = 0;
        let relativeBlockHash = null;
        let chunkHash = Level.chunkHash(x >> 4, z >> 4);

        if (this.isInWorld(x, y, z)) {
            relativeBlockHash = Level.chunkBlockHash(x, y, z);

            if (cached && Isset(this._blockCache[chunkHash][relativeBlockHash])) {
                return this._blockCache[chunkHash][relativeBlockHash];
            }

            let chunk = this._chunks[chunkHash];
            if (chunk !== null) {
                let fullState = chunk.getFullBlock(x & 0x0f, y, z & 0x0f);
            } else {
                addToCache = false;
            }
        }

        let block = Object.assign({}, this._blockStates[fullState & 0xfff]);

        block.x = x;
        block.y = y;
        block.z = z;

        if (addToCache && relativeBlockHash !== null) {
            this._blockCache[chunkHash][relativeBlockHash] = block;
        }

        return block;
    }

    isInWorld(x, y, z) {
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
    loadChunk(x, z, create = true) {
        let chunkHash;
        if (this._chunks.has(chunkHash = Level.chunkHash(x, z))) {
            return true;
        }

        this._chunks.set(chunkHash, this.getGenerator().generateChunk(x, z));

        return true;
    }

    getServer() {
        return this._server;
    }

    getName() {
        return this._name;
    }

    /**
     * @return {Generator}
     */
    getGenerator() {
        return this._generator;
    }
}

module.exports = Level;