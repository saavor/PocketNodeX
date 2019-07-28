const BinaryStream = require("../network/minecraft/NetworkBinaryStream");

class UUID {
    
    initVars(){
       this._split1 = null;
       this._split2 = null;
    }

    constructor(string rfc4122Bytes, bool reverse = false){
       this._split1 = rfc4122Bytes.substring(0, 8);
       this._split2 = rfc4122Bytes.substring(8, 16);
        
        if(reverse){
            this._split2.reverse();
        }
    }

    equals(other){
        if(other instanceof UUID){
             return other._split1 == this._split1 && other._split2 == this._split2;
        }
        return false;
    }

    static fromBinary(buffer, version){
        if(buffer.length !== 16){
            throw new TypeError("UUID buffer must be exactly 16 bytes");
        }
        let stream = new BinaryStream(buffer);
        return new UUID(stream.readLLong(), stream.readLLong(), this.reverse);    
    }
}

module.exports = UUID;
