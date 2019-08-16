const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class UpdateBlockPacket extends DataPacket {

    static getId() {
        return ProtocolInfo.UPDATE_BLOCK_PACKET;
    }

    static get FLAG_NONE() {return 0b0000};
    static get FLAG_NEIGHBORS() {return 0b0001};
    static get FLAG_NETWORK() {return 0b0010};
    static get FLAG_NOGRAPHIC() {return 0b0100};
    static get FLAG_PRIORITY() {return 0b1000};

    static get FLAG_ALL() {return UpdateBlockPacket.FLAG_NEIGHBORS | UpdateBlockPacket.FLAG_NETWORK};
    static get FLAG_ALL_PRIORITY() {return UpdateBlockPacket.FLAG_ALL | UpdateBlockPacket.FLAG_PRIORITY};

    static get DATA_LAYER_NORMAL() {return 0};
    static get DATA_LAYER_LIQUID() {return 1};

    initVars(){
        /** @type {number} */
        this.x = -1;
        /** @type {number} */
        this.z = -1;
        /** @type {number} */
        this.y = -1;
        /** @type {number} */
        this.blockRuntimeId = -1;
        /** @type {number} */
        this.flags = -1;
        /** @type {number} */
        this.dataLayerId = UpdateBlockPacket.DATA_LAYER_NORMAL;
    }

    constructor() {
        super();
        this.initVars();
    }

    _decodePayload() {
        this.getBlockPosition(this.x, this.y, this.z);
        this.blockRuntimeId = this.readUnsignedVarInt();
        this.flags = this.readUnsignedVarInt();
        this.dataLayerId = this.readUnsignedVarInt();
    }

    _encodePayload() {
        this.writeBlockPosition(this.x, this.y, this.z);
        this.writeUnsignedVarInt(this.blockRuntimeId);
        this.writeUnsignedVarInt(this.flags);
        this.writeUnsignedVarInt(this.dataLayerId);
    }

    handle(session) {
        return session.handleUpdateBlock(this);
    }

}
module.exports = UpdateBlockPacket;