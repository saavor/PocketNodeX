const BinaryStream = require("../NetworkBinaryStream");
const Vector3 = require("../../../math/Vector3");

const Attribute = require("../../../entity/Attribute");

class DataPacket extends BinaryStream {

    static getId(){
        return 0;
    }

    getId(){
        return this.constructor.getId();
    }

    constructor(){
        super();

        this.isEncoded = false;
    }

    getName(){
        return this.constructor.name;
    }

    canBeBatched(){
        return true;
    }

    canBeSentBeforeLogin(){
        return false;
    }

    mayHaveUnreadBytes(){
        return false;
    }

    decode(){
        this.offset = 0;
        this._decodeHeader();
        this._decodePayload();
    }

    _decodeHeader(){
        let pid = this.readUnsignedVarInt();
        if (pid !== this.getId()){
            console.log(`Expected " . ${this.getId()} . " for packet ID, got ${pid}`);
        }
    }

    _decodePayload(){}

    encode(){
        this.reset();
        this._encodeHeader();
        this._encodePayload();
        this.isEncoded = true;
    }

    _encodeHeader(){
        this.writeUnsignedVarInt(this.getId());
    }

    _encodePayload(){}

    getBuffer(){
        return this.buffer;
    }

    getEntityUniqueId(){
        return this.readVarLong();
    }

    writeEntityUniqueId(eid){
        this.writeVarLong(eid);
        return this;
    }

    getEntityRuntimeId(){
        return this.readUnsignedVarLong();
    }

    writeEntityRuntimeId(eid){
        this.writeUnsignedVarLong(eid);
        return this;
    }

    getVector3Obj(){
        return new Vector3(
            this.readRoundedLFloat(4),
            this.readRoundedLFloat(4),
            this.readRoundedLFloat(4)
        );
    }

    writeVector3Obj(vector){
        this.writeLFloat(vector.x);
        this.writeLFloat(vector.y);
        this.writeLFloat(vector.z);
    }

    writeVector3Nullable(vector){
        if (vector) {
            this.writeVector3Obj(vector);
        }else {
            this.writeLFloat(0.0);
            this.writeLFloat(0.0);
            this.writeLFloat(0.0);
        }
    }

    getBlockPosition(){
        return [
            this.readVarInt(),
            this.readUnsignedVarInt(),
            this.readVarInt()
        ];
    }

    writeBlockPosition(x, y, z){
        this.writeVarInt(x)
            .writeUnsignedVarInt(y)
            .writeVarInt(z);
        return this;
    }

    getGameRules(){
        let count = this.readUnsignedVarInt();
        let rules = [];
        for(let i = 0; i < count; ++i){
            let name = this.readString();
            let type = this.readUnsignedVarInt();
            let value = null;
            switch(type){
                case 1:
                    value = this.readBool();
                    break;
                case 2:
                    value = this.readUnsignedVarInt();
                    break;
                case 3:
                    value = this.readLFloat();
                    break;
            }

            rules[name] = [type, value];
        }

        return rules;
    }

    writeGameRules(rules){
        this.writeUnsignedVarInt(rules.length);
        rules.forEach(rule => {
            this.writeString(rule.getName());
            if(typeof rule.getValue() === "boolean") {
                this.writeByte(1);
                this.writeBool(rule.getValue());
            }else if(Number.isInteger(rule.getValue())){
                this.writeByte(2);
                this.writeUnsignedVarInt(rule.getValue());
            }else if(typeof rule.getValue() === "number" && !Number.isInteger(rule.getValue())){
                this.writeByte(3);
                this.writeLFloat(rule.getValue());
            }
        });

        return this;
    }

    /**
     * @return {Attribute[]}
     */
    readAttributeList(){
        let list = [];
        let count = this.readUnsignedVarInt();

        for (let i = 0; i < count; ++i){
            let min = this.readLFloat();
            let max = this.readLFloat();
            let current = this.readLFloat();
            let def = this.readLFloat();
            let name = this.readString();

            let attr = Attribute.getAttributeByName(name);
            if (attr !== null){
                attr.setMinValue(min);
                attr.setMinValue(max);
                attr.setMinValue(current);
                attr.setMinValue(def);

                list.push(attr);
            }else {
                console.log(`Unknown attribute type "${name}"`);
            }
        }

        return list;
    }

    writeAttributeList(...attributes){
        this.writeUnsignedVarInt(attributes.length);
        attributes[0].forEach(attribute => {
            this.writeLFloat(attribute.minValue);
            this.writeLFloat(attribute.maxValue);
            this.writeLFloat(attribute.currentValue);
            this.writeLFloat(attribute.defaultValue);
            this.writeString(attribute.name);
        });
    }

    handle(session){
        return false;
    }
}

module.exports = DataPacket;