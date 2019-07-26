const LoginPacket = require("../protocol/LoginPacket");
const AnimatePacket = require("../protocol/AnimatePacket");
// const SetEntityDataPacket = require("../protocol/SetEntityDataPacket");
const PlayStatusPacket = require("../protocol/PlayStatusPacket");
const DisconnectPacket = require("../protocol/DisconnectPacket");
const ResourcePacksInfoPacket = require("../protocol/ResourcePackDataInfoPacket");
const MovePlayerPacket = require("../protocol/MovePlayerPacket");
const PlayerActionPacket = require("../protocol/PlayerActionPacket");
const InteractPacket = require("../protocol/InteractPacket");
const LevelSoundEventPacket = require("../protocol/LevelSoundEventPacket");
const SubClientLoginPacket = require("../protocol/SubClientLoginPacket");
const PlayerSkinPacket = require("../protocol/PlayerSkinPacket");
const BlockEventPacket = require("../protocol/BlockEventPacket");
const UpdateAttributesPacket = require("../protocol/UpdateAttributesPacket");
const StructureBlockUpdatePacket = require("../protocol/StructureBlockUpdatePacket");
const ResourcePackClientResponsePacket = require("../protocol/ResourcePackClientResponsePacket");
const ResourcePackChunkRequestPacket = require("../protocol/ResourcePackChunkRequestPacket");
const ServerToClientHandshakePacket = require("../protocol/ServerToClientHandshakePacket");
const ClientToServerHandshakePacket = require("../protocol/ClientToServerHandshakePacket");
const RequestChunkRadiusPacket = require("../protocol/RequestChunkRadiusPacket");
const SetLocalPlayerAsInitializedPacket = require("../protocol/SetLocalPlayerAsInitializedPacket");
const TextPacket = require("../protocol/TextPacket");
const SetDefaultGameTypePacket = require("../protocol/SetDefaultGameTypePacket");
const SetPlayerGameTypePacket = require("../protocol/SetPlayerGameTypePacket");
const AddPlayerPacket = require("../protocol/AddPlayerPacket");
const AddEntityPacket = require("../protocol/AddEntityPacket");
const AdventureSettingsPacket = require("../protocol/AdventureSettingsPacket");

class PacketPool {

    constructor(){
        this.packetPool = new Map();
        this.registerPackets();
    }

    registerPacket(packet){
        this.packetPool.set(packet.getId(), packet);
    }

    getPacket(id){
        return this.packetPool.has(id) ? new (this.packetPool.get(id))() : null;
    }

    isRegistered(id){
        return this.packetPool.has(id);
    }

    registerPackets(){
        this.registerPacket(LoginPacket);
        this.registerPacket(PlayStatusPacket);
        this.registerPacket(ServerToClientHandshakePacket);
        this.registerPacket(ClientToServerHandshakePacket);
        this.registerPacket(DisconnectPacket);
        this.registerPacket(MovePlayerPacket);
        this.registerPacket(PlayerActionPacket);
        this.registerPacket(UpdateAttributesPacket);
        this.registerPacket(InteractPacket);
        this.registerPacket(AnimatePacket);
        this.registerPacket(PlayerSkinPacket);
        this.registerPacket(AddPlayerPacket);
        this.registerPacket(AddEntityPacket);
        //this.registerPacket(SetEntityDataPacket);
        this.registerPacket(BlockEventPacket);
        this.registerPacket(LevelSoundEventPacket);
        this.registerPacket(SetLocalPlayerAsInitializedPacket);
        this.registerPacket(SetDefaultGameTypePacket);
        this.registerPacket(SetPlayerGameTypePacket);
        this.registerPacket(StructureBlockUpdatePacket);
        this.registerPacket(ResourcePacksInfoPacket);
        this.registerPacket(SubClientLoginPacket);
        this.registerPacket(ResourcePackClientResponsePacket);
        this.registerPacket(ResourcePackChunkRequestPacket);
        this.registerPacket(RequestChunkRadiusPacket);
        this.registerPacket(AdventureSettingsPacket);
        this.registerPacket(TextPacket);
    }
}

module.exports = PacketPool;