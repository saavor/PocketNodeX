const Event = require("../../event/Event");

/**
 * Called when a player joins the server, after sending all the spawn packets
 */
class BlockEvent extends Event {

    initVars(){
        this.block = null;
    }

    constructor(block){
        super();
        this.initVars();
        this.block = block;
    }

    getBlock(){
        return this.block;
    }

}

module.exports = BlockEvent;