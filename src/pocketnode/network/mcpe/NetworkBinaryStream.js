const UUID = require("../../utils/UUID");
const Vector3 = require("../../math/Vector3");
const Entity = require("../../entity/Entity");

class NetworkBinaryStream extends require("../../../binarystream/BinaryStream") {
    /**
     * @return {string}
     */
    readString(){
        return this.read(this.readUnsignedVarInt().toString());
    }

    /**
     * @param v {string}
     * @return {NetworkBinaryStream}
     */
    writeString(v){
        this.writeUnsignedVarInt(Buffer.byteLength(v));
        this.append(v);
    }

    /**
     * @return {UUID}
     */
    readUUID(){
        let [p1, p0, p3, p2] = [this.readLInt(), this.readLInt(), this.readLInt(), this.readLInt()];

        return new UUID(p0, p1, p2, p3);
    }

    /**
     * @param uuid {UUID}
     * @return {NetworkBinaryStream}
     */
    writeUUID(uuid){
       this.writeLInt(uuid.getPart(1))
           .writeLInt(uuid.getPart(0))
           .writeLInt(uuid.getPart(3))
           .writeLInt(uuid.getPart(2));

       return this;
    }

    readEntityMetadata(types = true){
        let count = this.readUnsignedVarInt();
        let data = [];
        for (let i = 0; i < count; ++i){
            let key = this.readUnsignedVarInt();
            let type = this.readUnsignedVarInt();
            let value = null;
            switch (type) {
                case Entity.DATA_TYPE_BYTE:
                    value = this.readByte();
                    break;
                case Entity.DATA_TYPE_SHORT:
                    value = this.readSignedLShort();
                    break;
                case Entity.DATA_TYPE_INT:
                    value = this.readInt();
                    break;
                case Entity.DATA_TYPE_FLOAT:
                    value = this.readLFloat();
                    break;
                case Entity.DATA_TYPE_STRING:
                    value = this.readString();
                    break;
                case Entity.DATA_TYPE_SLOT:
                    //TODO
                    console.log("fuck.. not implemented yet.. ima lazy");
                    break;
                case Entity.DATA_TYPE_POS:
                    value = new Vector3();
                    this.getSignedBlockPosition(value.x, value.y, value.z);
                    break;
                case Entity.DATA_TYPE_LONG:
                    value = this.readVarInt();
                    break;
                case Entity.DATA_TYPE_VECTOR3F:
                    value = this.getVector3Obj();
                    break;
                default:
                    console.log(`Invalid data type " . ${type}`);
            }
            if (types){
                data[key] = [type, value];
            } else {
                data[key] = value;
            }
        }

        return data;
    }

    //TODO: idk if works
    writeEntityMetadata(metadata){
        this.writeUnsignedVarInt(metadata.length);
        metadata.forEach(key => {
            key.forEach(d => {
                this.writeUnsignedVarInt(key);
                this.writeUnsignedVarInt(d[0]);
                switch (d[0]) {
                    case Entity.DATA_TYPE_BYTE:
                        this.writeByte(d[1]);
                        break;
                    case Entity.DATA_TYPE_SHORT:
                        this.writeLShort(d[1]);
                        break;
                    case Entity.DATA_TYPE_INT:
                        this.writeVarInt(d[1]);
                        break;
                    case Entity.DATA_TYPE_FLOAT:
                        this.writeLFloat(d[1]);
                        break;
                    case Entity.DATA_TYPE_STRING:
                        this.writeString(d[1]);
                        break;
                    case Entity.DATA_TYPE_SLOT:
                        //TODO: this.writeSlot(d[1]);
                        break;
                    case Entity.DATA_TYPE_POS:
                        let v = d[1];
                        if (v !== null) {
                            //TODO: here ahead
                        }
                        break;
                    case Entity.DATA_TYPE_LONG:
                        this.writeVarInt(d[1]);
                        break;
                    case Entity.DATA_TYPE_VECTOR3F:
                        this.writeVector3Obj(d[1]); //TODO: make nullable

                }
            });
        });
    }

    readByteRotation(){
        return (this.readByte() * (360 / 256));
    }

    writeByteRotation(rotation){
        this.writeByte((rotation / (360 / 256)));
    }

    readEntityLink(){
        //TODO
    }

    getSignedBlockPosition(x, y, z){
        x = this.readVarInt();
        y = this.readVarInt();
        z = this.readVarInt();
    }

    // todo everything else
}

module.exports = NetworkBinaryStream;