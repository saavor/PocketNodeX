const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

const CommandOriginData = require("./types/CommandOriginData");

class CommandRequestPacket extends DataPacket {

    getId() {
        return ProtocolInfo.COMMAND_REQUEST_PACKET;
    }

    initVars() {
        /** @type {string} */
        this.command = "";
        /** @type {CommandOriginData} */
        this.originData = null;
        /** @type {boolean} */
        this.isInternal = false;
    }

    constructor() {
        super();
        this.initVars();
    }

    _decodePayload() {
        this.command = this.readString();
        this.originData = this.getCommandOriginData();
        this.isInternal = this.readBool();
    }

    _encodePayload() {
        this.writeString(this.command);
        this.putCommandOriginData(this.originData);
        this.writeBool(this.isInternal);
    }

    handle(session) {
        return session.handleCommandRequest(this);
    }
}

module.exports = CommandRequestPacket;