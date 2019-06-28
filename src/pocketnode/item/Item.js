const ItemIds = pocketnode("item/ItemIds");
const CompoundTag = pocketnode("nbt/tag/CompoundTag");

class Item implements ItemIds{
    static get TAG_ENCH() {return "ench"};
    static get TAG_DISPLAY() {return "display"};
    static get TAG_BLOCK_ENTITY_TAG() {return "BlockEntityTag"};

    static get TAG_DISPLAY_NAME() {return "Name"};
    static get TAG_DISPLAY_LORE() {return "Lore"};

    initVars(){
        //little endian
        this._cachedParser = null;
    }

    static parseCompoundTag(tag){
        if (tag === ""){
            console.log("No NBT data found in supplied string");
        }

        if (self._cachedParser === null){
            self._cachedParser = new LittleEndianNBTStream();
        }

        let data = self._cachedParser.read(tag);
        if (!(data instanceof CompoundTag)){
            console.log("Invalid item NBT string given, it could not be deserialized");
        }

        return data;
    }

    static writeCompoundTag(tag){
        CheckTypes([CompoundTag, tag]);
        if (self._cachedParser === null){
            self._cachedParser = new LittleEndianNBTStream();
        }

        return self._cachedParser.write(tag);
    }

    static get(id, meta = 0, count = 1, tags = "") : Item{
        return ItemFactory.get(id, meta, count, tags);
    }

}

module.exports = Item;