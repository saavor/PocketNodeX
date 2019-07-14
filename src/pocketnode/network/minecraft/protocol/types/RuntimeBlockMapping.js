const Isset = pocketnode("utils/methods/Isset");
const BinaryStream = binarystream("BinaryStream");

class RuntimeBlockMapping{

    constructor(){
        //NOOP
    }

    static init(){
        this._legacyToRuntimeMap = [];
        this._runtimeToLegacyMap = [];

        let legacyIdMap = pocketnode("resources/legacy_id_map.json");
        this._bedrockKnownStates = pocketnode("resources/runtimeid_table.json");

        this._bedrockKnownStates.forEach(k => {
            for (let obj in k){
                if (k.hasOwnProperty(obj)){
                    if(Isset(legacyIdMap[obj["name"]])){
                        //continue;
                        this.registerMapping(k, legacyIdMap[obj["name"]], obj["data"]);
                    }
                    
                }
            }
        });
    }

    static getBedrockKnownStates(){
        return this._bedrockKnownStates;
    }

    static registerMapping(legacyId){
        RuntimeBlockMapping._legacyToRuntimeMap[(legacyId << 4) | legacyMeta] = staticRuntimeId;
        RuntimeBlockMapping._runtimeToLegacyMap[staticRuntimeId] = (legacyId << 4) | legacyMeta;
    }
}
module.exports = RuntimeBlockMapping;