const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const Player = pocketnode("player/Player");
const LoginPacket = pocketnode("network/minecraft/protocol/LoginPacket");
const BatchPacket = pocketnode("network/minecraft/protocol/BatchPacket");
const ResourcePackClientResponsePacket = pocketnode("network/minecraft/protocol/ResourcePackClientResponsePacket");
const ResourcePackDataInfoPacket = pocketnode("network/minecraft/protocol/ResourcePackDataInfoPacket");
const PlayerActionPacket = pocketnode("network/minecraft/protocol/PlayerActionPacket");
const ResourcePackStackPacket = pocketnode("network/minecraft/protocol/ResourcePackStackPacket");
const ResourcePackChunkRequestPacket = pocketnode("network/minecraft/protocol/ResourcePackChunkRequestPacket");
const ResourcePackChunkDataPacket = pocketnode("network/minecraft/protocol/ResourcePackChunkDataPacket");
const RequestChunkRadiusPacket = pocketnode("network/minecraft/protocol/RequestChunkRadiusPacket");
const PlayStatusPacket = pocketnode("network/minecraft/protocol/PlayStatusPacket");
const Vector3 = pocketnode("math/Vector3");

const DataPacketReceiveEvent = pocketnode("event/server/DataPacketReceiveEvent");

const Chunk = pocketnode("level/chunk/Chunk");

const TextPacket = pocketnode("network/minecraft/protocol/TextPacket");

const ResourcePack = pocketnode("resourcepacks/ResourcePack");

const Async = pocketnode("utils/Async");

class PlayerSessionAdapter{
    constructor(player){
        /** @type {Server} */
        this.server = player.server;
        /** @type {RakNetAdapter} */
        this.raknetAdapter = this.server.getRakNetAdapter();
        /** @type {Player} */
        this.player = player;
    }

    sendPacket(packet, needACK = false, immediate = true){
        return this.raknetAdapter.sendPacket(this.player, packet, needACK, immediate);
    }

    handleDataPacket(packet){
        CheckTypes([DataPacket, packet]);

        packet.decode();

        if(!packet.feof() && !packet.mayHaveUnreadBytes()){
            let remains = packet.buffer.slice(packet.offset);
            this.server.getLogger().debugExtensive("Still "+ remains.length + " bytes unread in " + packet.getName() + ": 0x" + remains.toString("hex"));
        }

        this.server.getLogger().debugExtensive("Got "+packet.getName()+" from "+this);

        let ev = new DataPacketReceiveEvent(this.player, packet);
        this.server.getPluginManager().callEvent(ev);
        if(!ev.isCancelled() && !packet.handle(this)){
            this.server.getLogger().debugExtensive("Unhandled " + packet.getName() + " received from " + this.player.getName() + ": 0x" + packet.buffer.toString("hex"));
        }
    }

    handleLogin(packet){
        return this.player.handleLogin(packet);
    }

    handlePlayerSkin(packet){
        return this.player.changeSkin(packet.skin, packet.newSkinName, packet.oldSkinName);
    }

    handleResourcePackClientResponse(packet){

        this.server.getLogger().debugExtensive("Got a new resource pack response");

        let pk, manager;
        this.server.getLogger().debugExtensive("Status:", ResourcePackClientResponsePacket.STATUS(packet.status));
        switch(packet.status){
            case ResourcePackClientResponsePacket.STATUS_REFUSED:
                this.player.close("", "You must accept resource packs to join this server.", true);
                break;

            case ResourcePackClientResponsePacket.STATUS_SEND_PACKS:
                manager = this.server.getResourcePackManager();
                packet.packIds.shift();//todo figure out why the first id is 00000000-0000-0000-0000-000000000000
                for(let i in packet.packIds){
                    let uuid = packet.packIds[i];
                    let pack = manager.getPackById(uuid);
                    if(!(pack instanceof ResourcePack)){
                        this.player.close("", "Resource Pack is not on this server", true);
                        this.server.getLogger().debug("Got a resource pack request for unknown pack with UUID " + uuid + ", available packs: " + manager.getPackIdList().join(", "));
                        return false;
                    }

                    let pk = new ResourcePackDataInfoPacket();
                    pk.packId = pack.getPackId();
                    pk.maxChunkSize = 1048576;
                    pk.chunkCount = Math.ceil(pack.getPackSize() / pk.maxChunkSize);
                    pk.compressedPackSize = pack.getPackSize();
                    pk.sha256 = pack.getSha256();
                    this.player.dataPacket(pk);
                }
                break;

            case ResourcePackClientResponsePacket.STATUS_HAVE_ALL_PACKS:
                pk = new ResourcePackStackPacket();
                manager = this.server.getResourcePackManager();
                pk.resourcePackStack = manager.getResourcePacks();
                pk.mustAccept = manager.resourcePacksRequired();
                this.player.dataPacket(pk);
                break;

            case ResourcePackClientResponsePacket.STATUS_COMPLETED:
                this.player.completeLoginSequence();
                break;

            default:
                return false;
        }
        return true;
    }

    handleResourcePackChunkRequest(packet){
        let manager = this.server.getResourcePackManager();
        let pack = manager.getPackById(packet.packId);
        if(!(pack instanceof ResourcePack)){
            this.player.close("", "Resource pack was not found on this server!", true);
            this.server.getLogger().debug("Got a resource pack chunk request for unknown pack with UUID " + packet.packId + ", available packs: " + manager.getPackIdList().join(", "));

            return false;
        }
        
        let pk = new ResourcePackChunkDataPacket();
        pk.packId = pack.getPackId();
        pk.chunkIndex = packet.chunkIndex;
        pk.data = pack.getPackChunk(1048576 * packet.chunkIndex, 1048576);
        pk.progress = (1048576 * packet.chunkIndex);

        this.player.dataPacket(pk);
        return true;
    }

    handleRequestChunkRadius(packet){
        this.player.setViewDistance(packet.radius);

        Async(function() {
            let distance = this.player.getViewDistance();
            for (let chunkX = -distance; chunkX <= distance; chunkX++) {
                for (let chunkZ = -distance; chunkZ <= distance; chunkZ++) {
                    let chunk = new Chunk(chunkX, chunkZ);

                    for (let x = 0; x < 16; x++) {
                        for (let z = 0; z < 16; z++) {
                            let y = 0;
                            chunk.setBlockId(x, y++, z, 7);
                            chunk.setBlockId(x, y++, z, 3);
                            chunk.setBlockId(x, y++, z, 3);
                            chunk.setBlockId(x, y, z, 2);

                            /*for (let i = y - 1; i >= 0; i--) {
                                chunk.setBlockSkyLight(x, y, z, 0);
                            }*/
                        }
                    }

                    chunk.recalculateHeightMap();

                    this.player.sendChunk(chunk);
                }
            }
        }.bind(this))
            .then(function(){
                console.log("done sending chunks");
                this.player.sendPlayStatus(PlayStatusPacket.PLAYER_SPAWN);
            }.bind(this));
        return true;
    }

    handleMovePlayer(packet){
        return this.player.handleMovePlayer(packet);
    }

    handlePlayerAction(packet){
        if (packet.action === PlayerActionPacket.ACTION_RESPAWN && packet.action === PlayerActionPacket.ACTION_DIMENSION_CHANGE_REQUEST){
            return true;
        }

        packet.entityRuntimeId = this.player.id;
        let pos = new Vector3(packet.x, packet.y, packet.z);

        switch(packet.action){
            case PlayerActionPacket.ACTION_START_BREAK:
                if (pos.distanceSquared(this) > 10000) {
                    break;
                }

               //TODO: get level instance and call playerinteractevent
               // let target =

            case PlayerActionPacket.ACTION_ABORT_BREAK:
            case PlayerActionPacket.ACTION_STOP_BREAK:
                //todo: broadcast level event
                break;

            case PlayerActionPacket.ACTION_CONTINUE_BREAK:
                break;

            case PlayerActionPacket.ACTION_START_SLEEPING:
                //unused
                break;
            case  PlayerActionPacket.ACTION_STOP_SLEEPING:
                // this.stopSleep();
                break;
            case PlayerActionPacket.ACTION_RESPAWN:
                // todo if ()
                //this.respawn()
                break;
            case PlayerActionPacket.ACTION_JUMP:
                // todo this.jump();
                break;
            case  PlayerActionPacket.ACTION_START_SPRINT:

                console.log("PlayerActionHandler sprint toggled");
                //todo this.toggleSprint(true);
                break;
            case PlayerActionPacket.ACTION_STOP_SPRINT:
                //todo this.toggleSprint(false);
                break;
            case PlayerActionPacket.ACTION_START_SNEAK:
                //todo this.toggleSneak(true)
                break;
            case PlayerActionPacket.ACTION_STOP_SNEAK:
                //todo this.toggleSneak(false)
                break;
            case PlayerActionPacket.ACTION_START_GLIDE:
            case PlayerActionPacket.ACTION_STOP_GLIDE:
                break; //TODO
            case PlayerActionPacket.ACTION_START_SWIMMING:
                break; //TODO
            case PlayerActionPacket.ACTION_STOP_SWIMMING:
                break;
            default:
                console.log("Unhandled/unknown player action type " + packet.action + " from " + this.player.getName());
                return false;
        }

        //todo setUsingItem(false);
    }

    handleSubClientLogin(packet){
        return false;
    }

    handleStructureBlockUpdate(){
        return false;
    }

    handleBlockEvent(packet){
        return false;
    }

    handleServerToClientHandshake(packet){
        return false;
    }

    handleClientToServerHandshake(packet){
        return false; //TODO
    }

    handleUpdateAttributes(packet){
        return false;
    }

    handlePlayStatus(packet){
        return false;
    }

    handleInteract(packet){
        this.player.handleInteract(packet);
    }

    handleText(packet){
        if(packet.type === TextPacket.TYPE_CHAT){
            return this.player.chat(packet.message);
        }

        return false;
    }

    toString(){
        return this.player.getName() !== "" ? this.player.getName() : this.player.getAddress() + ":" + this.player.getPort();
    }
}

module.exports = PlayerSessionAdapter;