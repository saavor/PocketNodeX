const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class NetworkStackLatencyPacket extends DataPacket {
    static getId() {
        return MinecraftInfo.NETWORK_STACK_LATENCY_PACKET;
    }

    initVars(){
        this.timestamp = null;
        this.needResponse = false;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        console.log('NetworkStackLatency called! :)');

        this.timestamp = this.readLLong();
        this.needResponse = this.readBool();
    }

    _encodePayload() {
        this.writeLLong(this.timestamp);
        this.writeBool(this.needResponse);
    }

    handle(session){
        return true;
    }
}
module.exports = NetworkStackLatencyPacket;