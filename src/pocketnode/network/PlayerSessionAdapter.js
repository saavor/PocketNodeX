const DataPacket = require("./minecraft/protocol/DataPacket");
const Player = require("../player/Player");
const LoginPacket = require("./minecraft/protocol/LoginPacket");
const BatchPacket = require("./minecraft/protocol/BatchPacket");
const ResourcePackChunkDataPacket = require("./minecraft/protocol/ResourcePackChunkDataPacket");
const RequestChunkRadiusPacket = require("./minecraft/protocol/RequestChunkRadiusPacket");
const PlayStatusPacket = require("./minecraft/protocol/PlayStatusPacket");
const Vector3 = require("../math/Vector3");

const DataPacketReceiveEvent = require("../event/server/DataPacketReceiveEvent");

const Chunk = require("../level/format/Chunk");

const TextPacket = require("./minecraft/protocol/TextPacket");

const ResourcePack = require("../resourcepacks/ResourcePack");

const Async = require("../utils/Async");

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
            console.log("Still "+ remains.length + " bytes unread in " + packet.getName() + ": 0x" + remains.toString("hex"));
        }

        console.log("Got "+packet.getName()+" from "+this);

        let ev = new DataPacketReceiveEvent(this.player, packet);
        this.server.getPluginManager().callEvent(ev);
        if(!ev.isCancelled() && !packet.handle(this)){
            console.log("Unhandled " + packet.getName() + " received from " + this.player.getName() + ": 0x" + packet.buffer.toString("hex"));
        }
    }

    handleLogin(packet){
        return this.player.handleLogin(packet);
    }

    handleSetLocalPlayerAsInitialized(packet){
        console.log("PlayerInitialized handled!");
        this.player.doFirstSpawn();
        return true;
    }

    handlePlayerSkin(packet){
        return this.player.changeSkin(packet.skin, packet.newSkinName, packet.oldSkinName);
    }

    handleResourcePackClientResponse(packet){
        this.player.handleResourcePackClientResponse(packet);
    }

    handleResourcePackChunkRequest(packet){
        let manager = this.server.getResourcePackManager();
        let pack = manager.getPackById(packet.packId);
        //let pack = manager.getPackById(uuid.substr(0), (uuid + "").indexOf("_"));

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

        console.log("new chunk radius request");

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
                //this.player.sendPlayStatus(PlayStatusPacket.PLAYER_SPAWN);
            }.bind(this));
        return true;
    }

    handleLevelSoundEvent(packet){
        return this.player.handleLevelSoundEvent(packet);
    }

    handleSetTime(packet){
        return false;
    }

    handleAddPlayer(packet){
        return false;
    }

    handleMovePlayer(packet){
        return this.player.handleMovePlayer(packet);
    }

    handlePlayerAction(packet){
        return this.player.handlePlayerAction(packet);
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

    handleAnimate(packet){
        return this.player.handleAnimate(packet);
    }

    handleSetEntityData(packet){
        return false;
    }

    handleUpdateAttributes(packet){
        return false;
    }

    handleSetDefaultGameType(){
        return this.player.handleSetDefaultGameType(packet);
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