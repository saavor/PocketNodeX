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

const NBTStream = require("../nbt/NBTStream");
// const Binary = require("../../../src/thisstream/thisStream");

class LittleEndianNBTStream extends NBTStream{

    getShort() {
        return this.readLShort(this.get(2));
    }

    getSignedShort() {
        this.readSignedLShort(this.get(2));
    }

    putShort(v) {
        this.put(this.writeLShort(v));
    }

    getInt() {
        return this.readLInt(this.get(4));
    }

    putInt(v) {
        this.put(this.writeLInt(v));
    }

    getLong() {
        return this.readLLong(this.get(8));
    }

    putLong(v){
        this.put(this.writeLLong(v));
    }

    getFloat() {
        return this.readLFloat(this.get(4));
    }

    putFloat(v){
        this.put(this.writeLFloat(v));
    }

    getDouble(){
        return this.readLDouble(this.get(8));
    }

    putDouble(v){
        this.put(this.writeLDouble(v));
    }


    //TODO: finish array values.

}