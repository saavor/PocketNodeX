const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class SetTimePacket extends DataPacket {
    static getId() {
        return MinecraftInfo.SET_TIME_PACKET;
    }

    initVars(){
        this.time = 0;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.time = this.readVarInt();
    }

    _encodePayload() {
        this.writeVarInt(this.time);
    }

    handle(session) {
        return session.handleSetTime(this);
    }
}
module.exports = SetTimePacket;