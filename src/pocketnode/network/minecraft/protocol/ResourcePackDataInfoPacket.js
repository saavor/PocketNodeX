const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class ResourcePackDataInfoPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.RESOURCE_PACK_DATA_INFO_PACKET;
    }

    initVars(){
        this.packId = "";
        this.maxChunkSize = 0;
        this.chunkCount = 0;
        this.compressedPackSize = 0;
        this.sha256 = "";
        this.isPremium = false;
        this.packType = 1;
    }

    _decodePayload(){
        this.packId = this.readString();
        this.maxChunkSize = this.readLInt();
        this.chunkCount = this.readLInt();
        this.compressedPackSize = this.readLLong();
        this.sha256 = this.readString();
        this.isPremium = this.readBool();
        this.packType = this.readByte();
    }

    _encodePayload(){
        this.writeString(this.packId);
        this.writeLInt(this.maxChunkSize);
        this.writeLInt(this.chunkCount);
        this.writeLLong(this.compressedPackSize);
        this.writeString(this.sha256);
        this.writeBool(this.isPremium);
        this.writeByte(this.packType);
    }
}

module.exports = ResourcePackDataInfoPacket;