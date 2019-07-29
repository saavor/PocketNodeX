const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class AddBehaviorTreePacket extends DataPacket {

    getId() {
        return ProtocolInfo.ADD_BEHAVIOR_TREE_PACKET;
    }

    initVars(){
        /** @type {string} */
        this.behaviorTreeJson = "";
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.behaviorTreeJson = this.readString();
    }

    _encodePayload() {
        this.writeString(this.behaviorTreeJson);
    }

    handle(session) {
        return session.handleAddBehaviorTree(this);
    }
}
module.exports = AddBehaviorTreePacket;