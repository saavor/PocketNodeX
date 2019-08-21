//const Damageable = pocketnode("entity/Damageable");
const ArmorInventory = require("../inventory/ArmorInventory");
const ArmorInventoryEventProcessor = require("../inventory/ArmorInventoryEventProcessor");
const Entity = require("./Entity");
const CompoundTag = require("../nbt/tag/CompoundTag");
const ListTag = require("../nbt/tag/ListTag");

class Living extends Entity /*implements Damageable*/{

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

    initEntity(){
        super.initEntity();

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