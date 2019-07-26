const DataPacket = require("./DataPacket");
const MinecraftInfo = require("../Info");

class PlayerSkinPacket extends DataPacket{
    static getId() {
        return MinecraftInfo.PLAYER_SKIN_PACKET;
    }

    initVars(){
        this.uuid = null;
        this.oldSkinName = "";
        this.newSkinName = "";
        this.skin = null;
        this.premiumSkin = false;
    }

    _decodePayload() {
        this.uuid = this.readUUID();

        let skinId = this.readString();
        this.newSkinName = this.readString();
        this.oldSkinName = this.readString();
        let skinData = this.readString();
        let capeData = this.readString();
        let geometryModel = this.readString();
        let geometryData = this.readString();

        this.skin = new Skin(skinId, skinData, capeData, geometryModel, geometryData);

        this.premiumSkin = this.readBool();
    }

    _encodePayload() {
        this.writeUUID(this.uuid);

        this.writeString(this.skin.getSkinId());
        this.writeString(this.newSkinName);
        this.writeString(this.oldSkinName);
        this.writeString(this.skin.getSkinData());
        this.writeString(this.skin.getCapeData());
        this.writeString(this.skin.getGeometryName());
        this.writeString(this.skin.getGeometryData());

        this.writeBool(this.premiumSkin);
    }

    handle(session) {
        return session.handlePlayerSkin(this);
    }
}

module.exports = PlayerSkinPacket;