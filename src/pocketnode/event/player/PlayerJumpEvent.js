const PlayerEvent = require("../../event/player/PlayerEvent");
const Player = require("../../player/Player");

/**
 * Called when a player joins the server, after sending all the spawn packets
 */
class PlayerJumpEvent extends PlayerEvent {

    static get handlerList() {return null};

    /**
     * PlayerJumpEvent constructor.
     * @param {Player} player
     */
    constructor(player){
        console.log("PlayerJumpEvent called!");

        super(player);
        this.player = player;
    }

}

module.exports = PlayerJumpEvent;