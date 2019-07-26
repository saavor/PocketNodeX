const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class AnimatePacket extends DataPacket {

    getId() {
        return MinecraftInfo.ANIMATE_PACKET;
    }

    static get ACTION_SWING_ARM() {return 1};

    static get ACTION_STOP_SLEEP() {return 3};
    static get ACTION_CRITICAL_HIT() {return 4};

    initVars(){
        this.action = -1;
        this.entityRuntimeId = -1;
        this.float = 0.0;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        console.log("AnimatePacket called!");

        this.action = this.readVarInt();
        this.entityRuntimeId = this.getEntityRuntimeId();
        if (this.action & 0x80){
            this.float = this.readLFloat();
        }
    }

    _encodePayload() {
        this.writeVarInt(this.action);
        this.writeEntityRuntimeId(this.entityRuntimeId);
        if (this.action & 0x80){
            this.writeLFloat(this.float);
        }
    }

    handle(session){
        return session.handleAnimate(this);
    }
}
module.exports = AnimatePacket;