const Event = require("../Event");

/**
 * Player-only events
 */
class PlayerEvent extends Event {
    constructor(player){
        super();
        this._player = player;
    }

    getPlayer(){
        return this._player;
    }
}

module.exports = PlayerEvent;