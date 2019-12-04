const BinaryStream = require("../../binarystream/BinaryStream");

class UUID {

    initVars(){
        this._parts = [0, 0, 0, 0];
        this._version = null;
    }

    constructor(part1 = 0, part2 = 0, part3 = 0, part4 = 0, version = null){
        this.initVars();
        this._parts = [part1, part2, part3, part4];

        this._version = version || (this._parts[1] & 0xf000) >> 12;
    }

    getVersion(){
        return this._version;
    }

    equals(uuid){
        if(uuid instanceof UUID){
            //best way to do that
            return JSON.stringify(uuid._parts) === JSON.stringify(this._parts);
        }
        return false;
    }

    static fromString(uuid, version = null){
        return UUID.fromBinary(Buffer.from(uuid.trim().replace(/-/g, ""), "hex"), version);
    }

    static fromBinary(uuid, version){
        if(uuid.length !== 16){
            throw new TypeError("UUID buffer must be exactly 16 bytes");
        }
        let stream = new BinaryStream(Buffer.from(uuid));
        return new UUID(stream.readInt(), stream.readInt(), stream.readInt(), stream.readInt(), version);
    }

    toBinary() {
        let stream = new BinaryStream();
        return stream.writeInt(this._parts[0] + this._parts[1] + this._parts[2] + this._parts[3]);
    }

    getPart(i){
        return this._parts[i] ? this._parts[i] : null;
    }

    static hex2bin(hex)
    {
        let bytes = [], str;

        for(let i=0; i< hex.length-1; i+=2)
            bytes.push(parseInt(hex.substr(i, 2), 16));

        return String.fromCharCode.apply(String, bytes);
    }
}

module.exports = UUID;