const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

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