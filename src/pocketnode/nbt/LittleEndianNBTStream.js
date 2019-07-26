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
const Binary = require("../../../src/binarystream/BinaryStream");

class LittleEndianNBTStream extends NBTStream{

    getShort() : number{
        return Binary.readLShort(this.get(2));
    }

    getSignedShort() : number{
        Binary.readSignedLShort(this.get(2));
    }

    putShort(v): void {
        this.put(Binary.writeLShort(v));
    }

    getInt() : number{
        return Binary.readLInt(this.get(4));
    }

    putInt(v) : void{
        this.put(Binary.writeLInt(v));
    }

    getLong() : number{
        return Binary.readLLong(this.get(8));
    }

    putLong(v){
        this.put(Binary.writeLLong(v));
    }

    getFloat() {
        return Binary.readLFloat(this.get(4));
    }

    putFloat(v){
        this.put(Binary.writeLFloat(v));
    }

    getDouble(){
        return Binary.readLDouble(this.get(8));
    }

    putDouble(v){
        this.put(Binary.writeLDouble(v));
    }


    //TODO: finish array values.

}