/*
 *   _____           _        _   _   _           _
 *  |  __ \         | |      | | | \ | |         | |
 *  | |__) |__   ___| | _____| |_|  \| | ___   __| | ___
 *  |  ___/ _ \ / __| |/ / _ \ __| . ` |/ _ \ / _` |/ _ \
 *  | |  | (_) | (__|   <  __/ |_| |\  | (_) | (_| |  __/
 *  |_|   \___/ \___|_|\_\___|\__|_| \_|\___/ \__,_|\___|
 *
 *  @author PocketNode Team
 *  @link https://pocketnode.me
*/

const NamedTag = require("./NamedTag");

const NBT = require("../NBT");

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