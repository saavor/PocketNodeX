const PlayerEvent = pocketnode("event/player/PlayerEvent");
const Player = pocketnode("player/Player");

/**
 * Called when a player does an animation
 */
class PlayerAnimationEvent extends PlayerEvent {

    static get ARM_SWING() {return 1};

    /**
     * PlayerJumpEvent constructor.
     * @param {Player} player
     * @param {Number} animation
     */
    constructor(player, animation){
        super();
        console.log("PlayerAnimationEvent called!");
        this.player = player;
        this.animationType = animation;
    }

    getAnimationType(){
        return this.animationType;
    }

}

module.exports = PlayerAnimationEvent;