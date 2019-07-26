const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class ChunkRadiusUpdatedPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.CHUNK_RADIUS_UPDATED_PACKET;
    }

    initVars(){
        this.radius = 0;
    }

    _decodePayload(){
        this.radius = this.readVarInt();
    }

    _encodePayload(){
        this.writeVarInt(this.radius);
    }
}

module.exports = ChunkRadiusUpdatedPacket;