const PlayerEvent = require("./PlayerEvent");
const Player = require("../../player/Player");

/**
 * Called when a player connects to the server, prior to authentication taking place.
 * Cancelling this event will cause the player to be disconnected with the kick message set.
 *
 * This event should be used to decide if the player may continue to login to the server. Do things like checking
 * bans, whitelisting, server-full etc here.
 *
 * WARNING: Any information about the player CANNOT be trusted at this stage, because they are not authenticated and
 * could be a hacker posing as another player.
 *
 * WARNING: Due to internal bad architecture, the player is not fully constructed at this stage, and errors might occur
 * when calling API methods on the player. Tread with caution.
 */
class PlayerPreLoginEvent extends PlayerEvent {
    /**
     * PlayerPreLoginEvent constructor.
     * @param {Player} player
     * @param {String} kickMessage
     */
    constructor(player, kickMessage){
        super(player);

        this._player = player;
        this._kickMessage = "";
    }

    /**
     * @param {String} kickMessage
     */
    setKickMessage(kickMessage){
        this._kickMessage = kickMessage;
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
}

module.exports = PlayerPreLoginEvent;