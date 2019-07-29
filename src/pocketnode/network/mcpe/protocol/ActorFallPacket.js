const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class ActorFallPacket extends DataPacket {

    getId() {
        return ProtocolInfo.ACTOR_FALL_PACKET;
    }

    initVars(){
        /** @type {number} */
        this.entityRuntimeId = -1;
        /** @type {number} */
        this.fallDistance = -1;
        /** @type {boolean} */
        this.isInVoid = false;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityRuntimeId = this.getEntityRuntimeId();
        this.fallDistance = this.readLFloat();
        this.isInVoid = this.readBool();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeLFloat(this.fallDistance);
        this.writeBool(this.isInVoid);
    }

    handle(session) {
        return session.handleActorFall(this);
    }
}
module.exports = ActorFallPacket;