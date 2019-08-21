const Damageable = require("./Damageable");
const ArmorInventory = require("../inventory/ArmorInventory");
const ArmorInventoryEventProcessor = require("../inventory/ArmorInventoryEventProcessor");
const Entity = require("./Entity");
const CompoundTag = require("../nbt/tag/CompoundTag");
const ListTag = require("../nbt/tag/ListTag");
const MobEffectPacket = require("../network/mcpe/protocol/MobEffectPacket");

class Living extends multiple(Entity, Damageable) {

    initVars() {

        this._gravity = 0.08;
        this._drag = 0.02;

        this._attackTime = 0;

        this.deadTicks = 0;
        this._maxDeadTicks = 25;

        this._jumpVelocity = 0.42;
        this._effects = [];

        this._armorInventory = null;
    }

    constructor(server, nbt){
        super(server, nbt);
        this.initVars();
    }

    /**
     * @return {string}
     */
    getName(){}

    _initEntity(){
        super._initEntity();

        this._armorInventory = new ArmorInventory(this);
        this._armorInventory.setEventProcessor(new ArmorInventoryEventProcessor(this));

        //TODO: health = this.getMaxHealth();
        //TODO: FloatTag
        // if (this.namedtag.hasTag("HalF", FloatTag))
        //TODO; this.setHealth(health);

        /** @type {CompoundTag[]|ListTag} */
        let activeEffectsTag = this.namedtag.getListTag("ActiveEffects");
        if (activeEffectsTag !== null){
            //TODO
        } 

    }

    /**
     * Sends the mob's potion effects to the specified player.
     *
     * @param player
     */
    sendPotionEffects(player){

        //TODO: fix
        if (!this._effects){
            this._effects = [];
        }

        this._effects.forEach(effect => {
            let pk = new MobEffectPacket();
            pk.entityRuntimeId = this._id;
            pk.effectId = effect.getId();
            pk.amplifier = effect.getAmplifier();
            pk.particles = effect.isVisible();
            pk.duration = effect.getDuration();
            pk.eventId = MobEffectPacket.EVENT_ADD;

            player.dataPacket(pk);
        });
    }

    jump(){
        if (this.onGround){
            this.motionY = this.getJumpVelocity();
        }
    }

    getJumpVelocity(){
        return this._jumpVelocity; //TODO: finish with effects
    }
}

module.exports = Living;