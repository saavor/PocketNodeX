const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class SetEntityDataPacket extends DataPacket {
    static getId() {
        return MinecraftInfo.SET_ENTITY_DATA_PACKET;
    }

    _decodePayload() {
        this.entityRuntimeId = this.getEntityRuntimeId();
        this.metadata = this.readEntityMetadata();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeEntityMetadata(this.metadata);
    }

    handle(session){
        return session.handleSetEntityData(this);
    }
}
module.exports = SetEntityDataPacket;