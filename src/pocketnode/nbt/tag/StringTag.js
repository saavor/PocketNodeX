const NamedTag = pocketnode("nbt/tag/NamedTag");
const NBT = pocketnode("nbt/NBT");

class StringTag extends NamedTag{

    initVars() {
        this.value = "";
    }

    constructor(name = "", value = ""){
        super();
        this.constructor.call(name);
        this.initVars();
        if (value.length > 32767){
            console.log(`StringTag cannot hold more than 32767 bytes, got string of length " . ${value.length}`);
        }
        this.value = value;
    }

    getType(): number {
        return NBT.TAG_String;
    }

    /**
     *
     * @param nbt {NBTStream}
     */
    read(nbt){
        CheckTypes([NBTStream, nbt]);
        this.value = nbt.getString();
    }
}