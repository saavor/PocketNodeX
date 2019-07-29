const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class ActorPickRequestPacket extends DataPacket {

    getId() {
        return ProtocolInfo.ACTOR_PICK_REQUEST_PACKET;
    }

    initVars(){
        /** @type {number} */
        this.entityUniqueId = -1;
        /** @type {number} */
        this.hotbarSlot = -1;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityUniqueId = this.readLLong();
        this.hotbarSlot = this.readByte();
    }

    _encodePayload() {
        this.writeLLong(this.entityUniqueId);
        this.writeByte(this.hotbarSlot);
    }

    handle(session) {
        return session.handleActorPickRequest(this);
    }
}
module.exports = ActorPickRequestPacket;
