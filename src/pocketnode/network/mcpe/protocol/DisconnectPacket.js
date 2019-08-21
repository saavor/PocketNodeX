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
        if (!this.hideDisconnectionScreen){
            this.message = this.readString();
        }
    }

    _encodePayload(){
        this.writeBool(this.hideDisconnectionScreen);
        if(!this.hideDisconnectionScreen){
            this.writeString(this.message);
        }
    }

    handle(session){
        return session.handleDisconnect(this);
    }
}

module.exports = DisconnectPacket;