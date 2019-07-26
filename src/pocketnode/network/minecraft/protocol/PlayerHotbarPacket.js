const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class PlayerHotbarPacket extends DataPacket {
    static getId() {
        return MinecraftInfo.PLAYER_ACTION_PACKET;
    }

    _decodePayload() {

    }

    _encodePayload() {

    }
}