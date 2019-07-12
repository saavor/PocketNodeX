const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class ChunkRadiusUpdatedPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.CHUNK_RADIUS_UPDATED_PACKET;
    }

    initVars(){
        this.radius = 0;
    }

    _decodePayload(){
        console.log("ChunkRadiusUpdatedPacket called");
        this.radius = this.readVarInt();
    }

    _encodePayload(){
        this.writeVarInt(this.radius);
    }
}

module.exports = ChunkRadiusUpdatedPacket;