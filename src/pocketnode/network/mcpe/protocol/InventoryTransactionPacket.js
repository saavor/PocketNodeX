const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class InventoryTransactionPacket extends DataPacket {
    static getId() {
        return ProtocolInfo.INTERACT_PACKET;
    }
}
