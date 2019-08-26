const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");
const RuntimeBlockMapping = require("./types/RuntimeBlockMapping");
const NetworkBinaryStream = require("../NetworkBinaryStream");

class StartGamePacket extends DataPacket {
    static getId(){
        return ProtocolInfo.START_GAME_PACKET;
    }

    ITEM_DATA_PALETTE() {
        let item_ids = require("../../../resources/runtime_item_ids");

        this.writeUnsignedVarInt(Object.values(item_ids).length);
        Object.values(item_ids).forEach(entry => {
            this.writeString(entry.name);
            this.writeLShort(entry.id);
        });
        console.log("item palette sent!");

        let stream = new NetworkBinaryStream();

        return stream.getBuffer();
    }

    BLOCK_DATA_PALETTE() {
        let block_ids = require("../../../resources/runtimeid_table");

        this.writeUnsignedVarInt(Object.values(block_ids).length);
        Object.values(block_ids).forEach(entry => {
            if (entry.name !== null && entry.data !== null && entry.id !== null) {
                this.writeString(entry.name);
                this.writeLShort(entry.data);
                this.writeLShort(entry.id);
            }
        });
        console.log("block palette sent!");

        let stream = new NetworkBinaryStream();

        return stream.getBuffer();
    }

    initVars(){
        this._runtimeIdTableCache = null;

        this.entityUniqueId = -1;
        this.entityRuntimeId = -1;
        this.playerGamemode = 0;

        this.playerPosition = [0, 5, 0];

        this.pitch = 0.0;
        this.yaw = 0.0;

        this.seed = 0;
        this.dimension = 0;
        this.generator = 2; //default infinite - 0 old, 1 infinite, 2 flat
        this.levelGamemode = 0;
        this.difficulty = 0;
        this.spawnX = 0;
        this.spawnY = 0;
        this.spawnZ = 0;
        this.hasAchievementsDisabled = true;
        this.time = 0;
        this.eduMode = false;
        this.hasEduFeatureEnabled = false;

        this.rainLevel = 0.0;
        this.lightningLevel = 0.0;
        this.hasConfirmedPlatformLockedContent = false;
        this.isMultiplayerGame = true;
        this.hasLANBroadcast = true;
        this.xboxLiveBroadcastMode = 0;
        this.platformBroadcastMode = 0;
       // this.hasXboxLiveBroadcast = false;
        this.commandsEnabled = true;
        this.isTexturePacksRequired = true;

        this.gameRules = { //TODO: implement this
            "naturalregeneration": [1, false]
        };

        this.hasBonusChestEnabled = false;
        this.hasStartWithMapEnabled = false;
        this.defaultPlayerPermission = 1;//PlayerPermissions::MEMBER; //TODO

        this.serverChunkTickRadius = 4;

        this.hasLockedBehaviorPack = false;
        this.hasLockedResourcePack = false;
        this.isFromLockedWorldTemplate = false;
        this.useMsaGamertagsOnly = false;
        this.isFromWorldTemplate = false;
        this.isWorldTemplateOptionLocked = false;

        this.levelId = ""; //base64 string, usually the same as world folder name in vanilla

        this.levelName = "";

        this.premiumWorldTemplateId = "";
        this.isTrial = false;
        this.currentTick = 0;
        this.enchantmentSeed = 0;
        this.multiplayerCorrelationId = "";

        this.blockTable = null;
        this.itemTable = null;

        this._blockTableCache = null;
        this._itemTableCache = null;
        //this.onlySpawnV1Villagers = false;
        //this.runtimeIdTable = null;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        this.entityUniqueId = this.readEntityUniqueId();
        this.entityRuntimeId = this.readEntityRuntimeId();
        this.playerGamemode = this.readVarInt();

        this.playerPosition = this.readVector3();

        this.pitch = this.readLFloat();
        this.yaw = this.readLFloat();

        //Level settings
        this.seed = this.readVarInt();
        this.dimension = this.readVarInt();
        this.generator = this.readVarInt();
        this.levelGamemode = this.readVarInt();
        this.difficulty = this.readVarInt();
        [this.spawnX, this.spawnY, this.spawnZ] = this.readBlockPosition();
        this.hasAchievementsDisabled = this.readBool();
        this.time = this.readVarInt();
        this.eduMode = this.readBool();
        this.hasEduFeatureEnabled = this.readBool();
        this.rainLevel = this.readLFloat();
        this.lightningLevel = this.readLFloat();
        this.hasConfirmedPlatformLockedContent = this.readBool();
        this.isMultiplayerGame = this.readBool();
        this.hasLANBroadcast = this.readBool();
        this.xboxLiveBroadcastMode = this.readVarInt();
        this.platformBroadcastMode = this.readVarInt();
        this.commandsEnabled = this.readBool();
        this.isTexturePacksRequired = this.readBool();
        this.gameRules = this.readGameRules();
        this.hasBonusChestEnabled = this.readBool();
        this.hasStartWithMapEnabled = this.readBool();
        this.defaultPlayerPermission = this.readVarInt();
        this.serverChunkTickRadius = this.readLInt();
        this.hasLockedBehaviorPack = this.readBool();
        this.hasLockedResourcePack = this.readBool();
        this.isFromLockedWorldTemplate = this.readBool();
        this.useMsaGamertagsOnly = this.readBool();
        this.isFromWorldTemplate = this.readBool();
        this.isWorldTemplateOptionLocked = this.readBool();

        this.levelId = this.readString();
        this.levelName = this.readString();
        this.premiumWorldTemplateId = this.readString();
        this.isTrial = this.readBool();
        this.currentTick = this.readLLong();

        this.enchantmentSeed = this.readVarInt();

        this.blockTable = [];
        for (let i = 0, count = this.readUnsignedVarInt(); i < count; ++i){
            let id = this.readString();
            let data = this.readSignedLShort();
            let unknown = this.readSignedLShort();

            this.blockTable[i] = {"name": id, "data": data, "legacy_id": unknown};
        }
        /*this.itemTable = [];
        for (let i = 0, count = this.readUnsignedVarInt(); i < count; ++i){
            let id = this.readString();
            let legacyId = this.readSignedLShort();

            this.itemTable[id] = legacyId;
        }*/

        this.multiplayerCorrelationId = this.readString();
    }

    _encodePayload() {
        this.writeEntityUniqueId(this.entityUniqueId);
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeVarInt(this.playerGamemode);

        this.writeVector3(this.playerPosition);

        this.writeLFloat(this.pitch);
        this.writeLFloat(this.yaw);

        this.writeVarInt(this.seed);
        this.writeVarInt(this.dimension);
        this.writeVarInt(this.generator);
        this.writeVarInt(this.levelGamemode);
        this.writeVarInt(this.difficulty);
        this.writeBlockPosition(this.spawnX, this.spawnY, this.spawnZ);
        this.writeBool(this.hasAchievementsDisabled);
        this.writeVarInt(this.time);
        this.writeBool(this.eduMode);
        this.writeBool(this.hasEduFeatureEnabled);
        this.writeLFloat(this.rainLevel);
        this.writeLFloat(this.lightningLevel);
        this.writeBool(this.hasConfirmedPlatformLockedContent);
        this.writeBool(this.isMultiplayerGame);
        this.writeBool(this.hasLANBroadcast);
        this.writeVarInt(this.xboxLiveBroadcastMode);
        this.writeVarInt(this.platformBroadcastMode);
        this.writeBool(this.commandsEnabled);
        this.writeBool(this.isTexturePacksRequired);
        this.writeGameRules(this.gameRules);
        this.writeBool(this.hasBonusChestEnabled);
        this.writeBool(this.hasStartWithMapEnabled);
        this.writeVarInt(this.defaultPlayerPermission);
        this.writeLInt(this.serverChunkTickRadius);
        this.writeBool(this.hasLockedBehaviorPack);
        this.writeBool(this.hasLockedResourcePack);
        this.writeBool(this.isFromLockedWorldTemplate);
        this.writeBool(this.useMsaGamertagsOnly);
        this.writeBool(this.isFromWorldTemplate);
        this.writeBool(this.isWorldTemplateOptionLocked);

        this.writeString(this.levelId);
        this.writeString(this.levelName);
        this.writeString(this.premiumWorldTemplateId);
        this.writeBool(this.isTrial);
        this.writeLLong(this.currentTick);

        this.writeVarInt(this.enchantmentSeed);

        //TODO: see why it crashes server
        // this.append(this.BLOCK_DATA_PALETTE());
        // this.append(this.ITEM_DATA_PALETTE());

        this.writeString(this.multiplayerCorrelationId);
    }
}

module.exports = StartGamePacket;