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

const Binary = require("../../../src/binarystream/BinaryStream");

const Isset = require("../utils/methods/Isset");

const NamedTag = require("./tag/NamedTag");
const CompoundTag = require("./tag/CompoundTag");
const Zlib = require("zlib");

class NBTStream{

    initVars(){
        this.buffer = "";
        this.offset = 0;
    }

    constructor(){
        this.initVars();
    }

    get(len) {
        if (len < 0) {
            this.offset = this.buffer.length - 1;
        } else if (len === true) {
            return this.buffer.substr(this.offset); //should work
        }

        return len === 1 ? this.buffer[this.offset++] : this.buffer.substr((this.offset += len) - len, len);
    }

    put(v) {
        this.buffer.append(v); //should work same as .= or push()
    }

    feof(){
        return !Isset(this.buffer[this.offset]);
    }

    read(buffer, doMultiple = false, offset = 0){
        this.offset = offset;
        this.buffer = buffer;
        let data = this.readTag();

        if (data === null){
            console.log("Found TAGEnd at the start of buffer");
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
        this.buffer = "";

        return data;
    }

    readCompressed(buffer){
        return this.read(Zlib.unzipSync(buffer)); //deflate or unzip.. mhh.. dude try
    }

    write(data){
        this.offset = 0;
        this.buffer = "";
        
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
        this.buffer.append(Binary.writeByte(v));
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

    getString() : string{
        return this.get(this.getShort());
    }

    readTag() : ?NamedTag{
        let tagType = this.getByte();
        if (tagType === NBT.TAG_End){
            return null;
        }
        let tag = NBT.createTag(tagType);
        tag.setName(this.getString());
        tag.read(this);

        return tag;
    }

    getByte() : number{
        Binary.readByte(this.get(1));
    }

    getShort() : number;

    getInt() : number;

    putInt(v) : void;
}

module.exports = NBTStream;