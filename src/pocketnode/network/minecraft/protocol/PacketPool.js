const LoginPacket = pocketnode("network/minecraft/protocol/LoginPacket");
const AnimatePacket = pocketnode("network/minecraft/protocol/AnimatePacket");
const SetEntityDataPacket = pocketnode("network/minecraft/protocol/SetEntityDataPacket");
const PlayStatusPacket = pocketnode("network/minecraft/protocol/PlayStatusPacket");
const DisconnectPacket = pocketnode("network/minecraft/protocol/DisconnectPacket");
const ResourcePacksInfoPacket = pocketnode("network/minecraft/protocol/ResourcePacksInfoPacket");
const MovePlayerPacket = pocketnode("network/minecraft/protocol/MovePlayerPacket");
const PlayerActionPacket = pocketnode("network/minecraft/protocol/PlayerActionPacket");
const InteractPacket = pocketnode("network/minecraft/protocol/InteractPacket");
const LevelSoundEventPacket = pocketnode("network/minecraft/protocol/LevelSoundEventPacket");
const SubClientLoginPacket = pocketnode("network/minecraft/protocol/SubClientLoginPacket");
const PlayerSkinPacket = pocketnode("network/minecraft/protocol/PlayerSkinPacket");
const BlockEventPacket = pocketnode("network/minecraft/protocol/BlockEventPacket");
const UpdateAttributesPacket = pocketnode("network/minecraft/protocol/UpdateAttributesPacket");
const StructureBlockUpdatePacket = pocketnode("network/minecraft/protocol/StructureBlockUpdatePacket");
const ResourcePackClientResponsePacket = pocketnode("network/minecraft/protocol/ResourcePackClientResponsePacket");
const ResourcePackChunkRequestPacket = pocketnode("network/minecraft/protocol/ResourcePackChunkRequestPacket");
const ServerToClientHandshakePacket = pocketnode("network/minecraft/protocol/ServerToClientHandshakePacket");
const ClientToServerHandshakePacket = pocketnode("network/minecraft/protocol/ClientToServerHandshakePacket");
const RequestChunkRadiusPacket = pocketnode("network/minecraft/protocol/RequestChunkRadiusPacket");
const SetLocalPlayerAsInitializedPacket = pocketnode("network/minecraft/protocol/SetLocalPlayerAsInitializedPacket");
const TextPacket = pocketnode("network/minecraft/protocol/TextPacket");
const SetDefaultGameTypePacket = pocketnode("network/minecraft/protocol/SetDefaultGameTypePacket");
const SetPlayerGameTypePacket = pocketnode("network/minecraft/protocol/SetPlayerGameTypePacket");
const AddPlayerPacket = pocketnode("network/minecraft/protocol/AddPlayerPacket");

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
        this.registerPacket(SetEntityDataPacket);
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
        this.registerPacket(TextPacket);
    }
}

module.exports = PacketPool;