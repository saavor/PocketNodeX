const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class SetEntityDataPacket extends DataPacket {
    static getId() {
        return ProtocolInfo.SET_ENTITY_DATA_PACKET;
    }

    initVars(){
        this.entityRuntimeId = -1;
        this.metadata = null;
    }

    constructor(){
        super();
        this.initVars();
        //this.entityRuntimeId = entityRuntimeId;
        //this.metadata = metadata;
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
module.exports = SetEntityDataPacket;