const CompoundTag = pocketnode("nbt/tag/CompoundTag");

const LevelProvider = pocketnode("level/format/io/LevelProvider");

class BaseLevelProvider extends LevelProvider{

    initVars(){
        /** @type {string} */
        this._path = "";
        /** @type CompoundTag */
        this._levelData = null;
    }

    constructor(path){
        super();
        this.initVars();

        this._path = path;
        if (!this._path.isFile()){
            this._path.mkdir(this._path);
        }

        this.loadLevelData();
    }

    loadLevelData(){

    }
}
module.exports = BaseLevelProvider;