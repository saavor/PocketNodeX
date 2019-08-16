const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class RemoveActorPacket extends DataPacket {

    getId() {
        return ProtocolInfo.REMOVE_ACTOR_PACKET;
    }

    initVars(){
        /** @type {number} */
        this.entityUniqueId = -1;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityUniqueId = this.getEntityUniqueId();
    }

    _encodePayload() {
        this.writeEntityUniqueId(this.getEntityUniqueId());
    }

    handle(session) {
        return session.handleRemoveActor(this);
    }
}
module.exports = RemoveActorPacket;