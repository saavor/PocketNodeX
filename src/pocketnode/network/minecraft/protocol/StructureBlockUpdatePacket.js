const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class StructureBlockUpdatePacket extends DataPacket {
    static getId() {
        return MinecraftInfo.STRUCTURE_BLOCK_UPDATE_PACKET;
    }

    _decodePayload() {
        //TODO
    }

    _encodePayload() {
        //TODO
    }

    handle(session) {
        return session.handleStructureBlockUpdate(this);
    }
}

module.exports = StructureBlockUpdatePacket;