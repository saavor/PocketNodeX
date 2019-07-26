const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class ResourcePackStackPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.RESOURCE_PACK_STACK_PACKET;
    }

    initVars(){
        this.mustAccept = false;

        this.behaviorPackStack = [];
        this.resourcePackStack = [];
    }

    constructor(){
        super();
        this.initVars();
    }

    _encodePayload(){
        this.writeBool(this.mustAccept);

        this.writeUnsignedVarInt(this.behaviorPackStack.length);
        this.behaviorPackStack.forEach(entry => {
            this.writeString(entry.getPackId())
                .writeString(entry.getPackVersion())
                .writeString("");
        });

        this.writeUnsignedVarInt(this.resourcePackStack.length);
        this.resourcePackStack.forEach(entry => {
            this.writeString(entry.getPackId())
                .writeString(entry.getPackVersion())
                .writeString("");
        });
    }
}

module.exports = ResourcePackStackPacket;