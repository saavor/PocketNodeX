const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

class ModalFormRequestPacket extends DataPacket {

    static getId() {
        return ProtocolInfo.MODAL_FORM_REQUEST_PACKET;
    }

    initVars(){
        /** @type {number} */
        this.formId = -1;
        /** @type {string} */
        this.formData = ""; //json
    }

    _decodePayload() {
        this.formId = this.readUnsignedVarInt();
        this.formData = this.readString();
    }

    _encodePayload() {
        this.writeUnsignedVarInt(this.formId);
        this.writeString(this.formData);
    }

    handle(session) {
        return false;
    }
}
module.exports = ModalFormRequestPacket;