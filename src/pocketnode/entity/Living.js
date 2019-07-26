//const Damageable = pocketnode("entity/Damageable");
const ArmorInventory = require("../inventory/ArmorInventory");
const ArmorInventoryEventProcessor = require("../inventory/ArmorInventoryEventProcessor");
const Entity = require("./Entity");

class Living extends Entity /*implements Damageable*/{

    initVars() {
        this._gravity = 0.08;
        this._drag = 0.02;

        this._attackTime = 0;

        this._deadTicks = 0;
        this._maxDeadTicks = 25;

        this._jumpVelocity = 0.42;

        this._effects = [];

        this._armorInventory = null; //TODO: new ArmorInventory
    }

    getName(){}

    initEntity(){
        super.initEntity();
        //this.initEntity().call(); //should be parent

        this._armorInventory = new ArmorInventory(this);
        this._armorInventory.setEventProcessor(new ArmorInventoryEventProcessor(this));

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