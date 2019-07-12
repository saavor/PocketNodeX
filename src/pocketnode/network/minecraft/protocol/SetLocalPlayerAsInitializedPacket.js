const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class SetLocalPlayerAsInitializedPacket extends DataPacket {
    static getId() {
        return MinecraftInfo.SET_LOCAL_PLAYER_AS_INITIALIZED_PACKET;
    }

    initVars(){
        this.entityRuntimeId = -1;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        console.log("SetLocalPlayerAsInitialized called!");

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