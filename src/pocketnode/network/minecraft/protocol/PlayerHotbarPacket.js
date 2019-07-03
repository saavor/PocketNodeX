const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class PlayerHotbarPacket extends DataPacket {
    static getId() {
        return MinecraftInfo.PLAYER_ACTION_PACKET;
    }

    _decodePayload() {

    }

    _encodePayload() {

    }
}