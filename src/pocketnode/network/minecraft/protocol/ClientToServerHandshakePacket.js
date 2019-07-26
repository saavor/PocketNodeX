const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class ClientToServerHandshakePacket extends DataPacket {
    static getId() {
        return MinecraftInfo.CLIENT_TO_SERVER_HANDSHAKE_PACKET;
    }

    canBeSentBeforeLogin() {
        return true;
    }

    _decodePayload() {
        // no payload
    }

    _encodePayload() {
        // no payload
    }

    handle(session) {
        return session.handleClientToServerHandshake(this);
    }
}

module.exports = ClientToServerHandshakePacket;