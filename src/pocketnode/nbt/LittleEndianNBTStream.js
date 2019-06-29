const NBTStream = pocketnode("nbt/NBTStream");
const Binary = pocketnode("../src/binarystream/BinaryStream");

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