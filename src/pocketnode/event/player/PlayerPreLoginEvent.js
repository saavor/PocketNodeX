const PlayerEvent = require("../../event/player/PlayerEvent");
const Player = require("../../player/Player");

/**
 * Called when the player logs in, before things have been set up
 */
class PlayerPreLoginEvent extends PlayerEvent {

    /**
     * PlayerPreLoginEvent constructor.
     * @param {Player} player
     * @param {String} kickMessage
     */
    constructor(player, kickMessage){
        super(player);

        this._kickMessage = kickMessage;
    }

    /**
     * @param {String} kickMessage
     */
    setKickMessage(kickMessage){
        this._kcikMessage = kickMessage;
    }

    /**
     * @return {String}
     */
    getKickMessage(){
        return this._kickMessage;
    }

    isCancellable() {
        return true;
    }

    isCancelled() {
        return false;
    }
}
module.exports = PlayerPreLoginEvent;