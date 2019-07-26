const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class SetPlayerGameTypePacket extends DataPacket {
    static getId() {
        return MinecraftInfo.SET_PLAYER_GAME_TYPE_PACKET;
    }

    initVars(){
        this.gamemode = -1;
    }

    constructor() {
        super();
        this.initVars();
    }

    _decodePayload() {
        console.log("player gamemode packet called");

        this.gamemode = this.readVarInt();
    }

    _encodePayload() {
        this.writeVarInt(this.gamemode);
    }

    handle(session){
        return session.handleSetPlayerGameType(this);
    }

}

module.exports = SetPlayerGameTypePacket;