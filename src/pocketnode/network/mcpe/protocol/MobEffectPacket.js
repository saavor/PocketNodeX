const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class MobEffectPacket extends DataPacket {

    static getId() {
        return ProtocolInfo.MOB_EFFECT_PACKET;
    }

    static get EVENT_ADD() {return 1};
    static get EVENT_MODIFY() {return 2};
    static get EVENT_REMOVE() {return 3};

    initVars(){
        this.entityRuntimeId = -1;
        this.eventId = -1;
        this.effectId = -1;
        this.amplifier = 0;
        this.particles = true;
        this.duration = 0;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityRuntimeId = this.getEntityRuntimeId();
        this.eventId = this.readByte();
        this.effectId = this.readVarInt();
        this.amplifier = this.readVarInt();
        this.particles = this.readBool();
        this.duration = this.readVarInt();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeByte(this.eventId);
        this.writeVarInt(this.effectId);
        this.writeVarInt(this.amplifier);
        this.writeBool(this.particles);
        this.writeVarInt(this.duration);
    }

    handle(session) {
        return session.handleMobEffect(this);
    }
}
module.exports = MobEffectPacket;