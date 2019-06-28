const BlockEvent = pocketnode("event/block/BlockEvent");
const Player = pocketnode("player/Player");

/**
 * Called when a player joins the server, after sending all the spawn packets
 */
class BlockBreakEvent extends BlockEvent {

    initVars() {
        this.player = null;
        this.item = null;
        this.instaBreak = false;
        this.blockDrops = [];
        this.xpDrops = null;
    }

    constructor(player, block, item, instaBreak, blockDrops, xpDrops){
        super();
        this.initVars();
        this.player = player;
        this.block = block;
        this.item = item;
        this.instaBreak = instaBreak;
        this.blockDrops = blockDrops;
        this.xpDrops = xpDrops;
    }

    getPlayer(){
        return this.player;
    }

    getItem(){
        return this.item;
    }

    getInstaBreak(){
        return this.instaBreak;
    }

    setInstaBreak(instBreak){
        this.instaBreak = instBreak;
    }

    getDrops(){
        return this.blockDrops;
    }

    //todo: set drops and other stuff
}