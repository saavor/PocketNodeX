const NBT = require("../../nbt/NBT");
const NamedTag = require("../../nbt/tag/NamedTag");

class ByteArrayTag extends NamedTag{

    initVars() {
        this.value = "";
    }

    constructor(name = "", value = ""){
        super();
        this.initVars();
        this.constructor.call(name);
    }

    getType(): number {
        return NBT.TAG_ByteArray;
    }

    /**
     *
     * @param nbt {NBTStream}
     */
    read(nbt): void {
        // CheckTypes([NBTStream, nbt]);
        this.value = nbt.get(nbt.getInt());
    }

    /**
     *
     * @param nbt {NBTStream}
     */
    write(nbt): void {
        nbt.putInt(this.value.length);
        nbt.put(this.value);
    }

    getValue() {
        return this.value;
    }
}