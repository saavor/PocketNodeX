const Isset = pocketnode("utils/methods/Isset");
const Binary = pocketnode("../src/binarystream/BinaryStream");
const NamedTag = pocketnode("nbt/tag/NamedTag");
const CompoundTag = pocketnode("nbt/tag/CompoundTag");
const Zlib = require("zlib");

class NBTStream{

    initVars(){
        this._buffer = "";
        this._offset = 0;
    }

    get(len) {
        if (len < 0) {
            this._offset = this._buffer.length - 1;
        } else if (len === true) {
            return this._buffer.substr(this._offset); //should work
        }

        return len === 1 ? this._buffer[this._offset++] : this._buffer.substr((this._offset += len) - len, len);
    }

    put(v) {
        this._buffer.append(v); //should work same as .= or push()
    }

    feof(){
        return !Isset(this._buffer[this._offset]);
    }

    read(buffer, doMultiple = false, offset = 0){
        this._offset = offset;
        this._buffer = buffer;
        let data = this.readTag();

        if (data === null){
            console.log("Found TAG_End at the start of buffer");
        }

        if (doMultiple && !this.feof()){
            data = [data];
            do {
                let tag = this.readTag();
                if (tag !== null){
                    data.append(tag); //push() same but append() better for arrays
                }
            }while (!this.feof());
        }
        this._buffer = "";

        return data;
    }

    readCompressed(buffer){
        return this.read(Zlib.unzipSync(buffer)); //deflate or unzip.. mhh.. dude try
    }

    write(data){
        this._offset = 0;
        this._buffer = "";
        
        if (data instanceof CompoundTag) {
            this.writeTag()
        }
    }

    writeTag(tag): void{
        CheckTypes([NamedTag, tag]);
        this.putByte(tag.getType());
        this.putString(tag.getName());
        tag.write(this);
    }

    putByte(v) : void{
        this._buffer.append(Binary.writeByte(v));
    }

    putShort(v) : void;

    putString(v) : void{
        let len = v.length;
        if (len > 32767){
            console.log(`NBT strings cannot be longer than 32767 bytes, got ${len} bytes`)
        }
        this.putShort(len);
        this.put(v);
    }
}

module.exports = NBTStream;