const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class SetLocalPlayerAsInitializedPacket extends DataPacket {
    static getId() {
        return ProtocolInfo.SET_LOCAL_PLAYER_AS_INITIALIZED_PACKET;
    }

    initVars(){
        this.entityRuntimeId = -1;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityRuntimeId = this.getEntityRuntimeId();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
    }

    handle(session){
        return session.handleSetLocalPlayerAsInitialized(this);
    }
}

module.exports = SetLocalPlayerAsInitializedPacket;