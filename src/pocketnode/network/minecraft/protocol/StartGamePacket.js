const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const RuntimeBlockMapping = pocketnode("network/minecraft/protocol/types/RuntimeBlockMapping");
const NetworkBinaryStream = pocketnode("network/minecraft/NetworkBinaryStream");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class StartGamePacket extends DataPacket {
    static getId(){
        return MinecraftInfo.START_GAME_PACKET;
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

        this.onlySpawnV1Villagers = false;
        this.runtimeIdTable = null;
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload(){
        this.entityUniqueId = this.getEntityUniqueId();
        this.entityRuntimeId = this.getEntityRuntimeId();
        this.playerGamemode = this.readVarInt();

        this.playerPosition = this.getVector3Obj();

        this.pitch = this.readLFloat();
        this.yaw = this.readLFloat();

        //Level settings
        this.seed = this.readVarInt();
        this.dimension = this.readVarInt();
        this.generator = this.readVarInt();
        this.levelGamemode = this.readVarInt();
        this.difficulty = this.readVarInt();
        [this.spawnX, this.spawnY, this.spawnZ] = this.getBlockPosition();
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
        this.gameRules = this.getGameRules();
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

        let count = this.readUnsignedVarInt();
        let table = [];
        let i;
        for (i = 0; i < count; ++i){
            let id = this.readString();
            let data = this.readLShort();
            table[i] = {"name": id, "data": data};
        }
        this.runtimeIdTable = table;
        
        this.multiplayerCorrelationId = this.readString();
        this.onlySpawnV1Villagers = this.readBool();
    }

    _encodePayload() {
        this.writeEntityUniqueId(this.entityUniqueId);
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeVarInt(this.playerGamemode);

        this.writeVector3Obj(this.playerPosition);

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

        /*if (this.runtimeIdTable === null) {

            if (this._runtimeIdTableCache === null){
                this._runtimeIdTableCache = this.serializeBlockTable(RuntimeBlockMapping.getBedrockKnownStates());
            }

            this.append(this._runtimeIdTableCache);
        }else {
            this.append(this.serializeBlockTable(this.runtimeIdTable));
        }*/
        this.append(RuntimeBlockMapping.getCompiledTable());

        this.writeString(this.multiplayerCorrelationId);
        this.writeBool(this.onlySpawnV1Villagers);
    }

    serializeBlockTable(...table){
        let stream = new NetworkBinaryStream();
        stream.writeUnsignedVarInt(table.length);
        table.forEach(v => {
            stream.writeString(v.name);
            stream.writeLShort(v.data);
        });
        console.log(1);
        return stream.getBuffer();
    }
}

module.exports = StartGamePacket;