const Chunk = pocketnode("level/format/Chunk");

const Vector3 = pocketnode("math/Vector3");

class LevelProvider {

    /**
     * @param path {string}
     */
    constructor(path){}

    /**
     * @return {string}
     */
    getProviderName(){}

    /**
     * @return {number}
     */
    getWorldHeight(){}

    /**
     * @return string
     */
    getPath(){}

    /**
     * Tells if the path is a valid level.
     * This must tell if the current format supports opening the files in the directory
     *
     * @param path {string}
     *
     * @return {boolean}
     */
    isValid(path){}

    /**
     * Generate the needed files in the path given
     *
     * @param path {string}
     * @param name {string}
     * @param seed {number}
     * @param generator {string}
     * @param options {[]}
     */
    generate(path, name, seed, generator, options = []){}

    /**
     * Returns the generator name
     *
     * @return {string}
     */
    getGenerator(){}

    /**
     * @return {[]}
     */
    getGeneratorOptions(){}

    /**
     * Saves a chunk (usually to disk).
     *
     * @param chunk {Chunk}
     */
    saveChunk(chunk){}

    /**
     * Loads a chunk (usually from disk storage) and returns it. If the chunk does not exist, null is returned.
     *
     * @param chunkX {number}
     * @param chunkZ {number}
     *
     * @return {null|Chunk}
     */
    loadChunk(chunkX, chunkZ){}

    /**
     * @return {string}
     */
    getName(){}

    /**
     * @return {number}
     */
    getTime(){}

    /**
     * @param value {number}
     */
    setTime(value){}

    /**
     * @return {number}
     */
    getSeed(){}

    /**
     * @param value {number}
     */
    setSeed(value){}

    /**
     * @return {Vector3}
     */
    getSpawn(){}

    /**
     * @param pos {Vector3}
     */
    setSpawn(pos){}

    /**
     * Returns the world difficulty. This will be one of the Level constants.
     * @return {number}
     */
    getDifficulty(){}

    /**
     * Sets the world difficulty.
     *
     * @param difficulty {number}
     */
    setDifficulty(difficulty){}

    /**
     * Performs garbage collection in the level provider, such as cleaning up regions in Region-based worlds.
     */
    doGarbageCollection(){}

    /**
     * Performs cleanups necessary when the level provider is closed and no longer needed.
     */
    close(){}
}
module.exports = LevelProvider;