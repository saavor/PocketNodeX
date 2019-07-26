const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class DisconnectPacket extends DataPacket {

    static getId(){
        return ProtocolInfo.DISCONNECT_PACKET;
    }

    initVars(){
        this.hideDisconnectionScreen = false;
        this.message = "";
    }

    constructor(){
        super();
        this.initVars();
    }

    canBeSentBeforeLogin(){
        return true;
    }

    _decodePayload(){
        this.hideDisconnectionScreen = this.readBool();
        this.message = this.readString();
    }

    _encodePayload(){
        this.writeBool(this.hideDisconnectionScreen);
        if(!this.hideDisconnectionScreen){
            this.writeString(this.message);
        }
    }
}

module.exports = DisconnectPacket;