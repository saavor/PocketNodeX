const Isset = pocketnode("utils/methods/Isset");
const BinaryStream = binarystream("BinaryStream");

class RuntimeBlockMapping{

    static init(){
        this._legacyToRuntimeId = [];
        this._runtimeIdToLegacy = [];
        this._runtimeIdAllocator = [];
        this._compiledTable = [];

        this._legacyToRuntimeId.returnValue = -1;
        this._runtimeIdToLegacy.returnValue = -1;

        let stream = pocketnode("resources/runtimeid_table.json");
        if (stream == null){
            console.log("Unable to locate RuntimeID table");
        }

        let entries = Object.assign(stream);
        let table = new BinaryStream();

        entries.forEach(entry => {
           this.registerMapping((entry.id << 4) | entry.data);
           table.writeString(entry.name);
           table.writeLShort(entry.data);
        });

        this._compiledTable = table.getBuffer();

        /*this._legacyToRuntimeMap = [];
        this._runtimeToLegacyMap = [];

        let legacyIdMap = Object.assign(JSON.parse(pocketnode("resources/runtimeid_table.json")));

        let compressedTable = Object.assign(JSON.parse(pocketnode("resources/required_block_states.json")));
        let decompressed = [];

        console.log(JSON.stringify(compressedTable));
        
        for (let i = 0; i < compressedTable.length; ++i){
            console.log(JSON.stringify(compressedTable));
        }

        /*compressedTable.forEach(prefix => {
            for (let entries in prefix){
                if (prefix.hasOwnProperty(entries)) {
                    entries.forEach(shortStringId => {
                       for (let states in shortStringId){
                           if (shortStringId.hasOwnProperty(states)){
                               states.forEach(state => {
                                   decompressed.push({
                                      "name": `${prefix}:${shortStringId}`,
                                      "data": state
                                   });
                               });
                           }
                       }
                    });
                }
            } 
        });
        this._bedrockKnownStates = decompressed;

        this._bedrockKnownStates.forEach(k => {
           for (let obj in k){
               if (k.hasOwnProperty(obj)){
                   if (!Isset(legacyIdMap[obj["name"]])){
                       continue;
                   }

                   RuntimeBlockMapping.registerMapping(k, legacyIdMap[obj["name"]], obj["data"]);

               }
           }
        });*/
    }

    static getCompiledTable(){
        return this._compiledTable;
    }

    static getBedrockKnownStates(){
        //return this._bedrockKnownStates;
    }

    static registerMapping(legacyId){
        let runtimeId = this._runtimeIdAllocator += 1;
        this._runtimeIdToLegacy.push(runtimeId, legacyId);
        this._legacyToRuntimeId.push(legacyId, runtimeId);
        return runtimeId;


        //RuntimeBlockMapping._legacyToRuntimeMap[(legacyId << 4) | legacyMeta] = staticRuntimeId;
        //RuntimeBlockMapping._runtimeToLegacyMap[staticRuntimeId] = (legacyId << 4) | legacyMeta;
    }
}
module.exports = RuntimeBlockMapping;