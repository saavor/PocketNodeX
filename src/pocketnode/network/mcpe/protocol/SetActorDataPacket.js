const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class SetActorDataPacket extends DataPacket {

    static getId() {
        return ProtocolInfo.SET_ACTOR_DATA_PACKET;
    }

    initVars(){
        this.entityRuntimeId = -1;
        this.metadata = null;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityRuntimeId = this.getEntityRuntimeId();
        this.metadata = this.readEntityMetadata();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeEntityMetadata(this.metadata);
    }

    handle(session){
        return session.handleSetEntityData(this);
    }
}
module.exports = SetActorDataPacket;