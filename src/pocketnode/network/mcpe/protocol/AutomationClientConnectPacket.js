const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class AutomationClientConnectPacket extends DataPacket {

    getId() {
        return ProtocolInfo.AUTOMATION_CLIENT_CONNECT_PACKET;
    }

    initVars(){
        /** @type {string} */
        this.serverUri = "";
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.serverUri = this.readString();
    }

    _encodePayload() {
        this.writeString(this.serverUri);
    }

    handle(session) {
        return session.handleAutomationClientConnect(this);
    }
}
module.exports = AutomationClientConnectPacket;