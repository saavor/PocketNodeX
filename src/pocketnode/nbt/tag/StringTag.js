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
const NBTStream = require("../NBTStream");
const NBT = require("../NBT");

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

    getType() {
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
module.exports = StringTag;