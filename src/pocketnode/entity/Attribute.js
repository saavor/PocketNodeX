const Isset = pocketnode("utils/methods/Isset");

class Attribute{

    static get ABSORPTION() {return 0};
    static get SATURATION() {return 1};
    static get EXHAUSTION() {return 2};
    static get KNOCKBACK_RESISTANCE() {return 3};
    static get HEALTH() {return 4};
    static get MOVEMENT_SPEED() {return 5};
    static get FOLLOW_RANGE() {return 6};
    static get HUNGER() {return 7};
    static get FOOD() {return 7};
    static get ATTACK_DAMAGE() {return 8};
    static get EXPERIENCE_LEVEL() {return 9};
    static get EXPERIENCE() {return 10};
    static get UNDERWATER_MOVEMENT() {return 11};
    static get LUCK() {return 12};
    static get FALL_DAMAGE() {return 13};
    static get HORSE_JUMP_STRENGTH() {return 14};
    static get ZOMBIE_SPAWN_REINFORCEMENTS() {return 15};

    initVars(){
        this.id = -1;
        this.minValue = -1;
        this.maxValue = -1;
        this.defaultValue = -1;
        this.currentValue = -1;
        this.name = "";
        this.shouldSend = false;
        this.desynchronized = true;

        this.attributes = [];
    }

    static init(){
        self.addAttribute(self.ABSORPTION, "minecraft:absorption", 0.00, 340282346638528859811704183484516925440.00, 0.00);
        self.addAttribute(self.SATURATION, "minecraft:player.saturation", 0.00, 20.00, 20.00);
        self.addAttribute(self.EXHAUSTION, "minecraft:player.exhaustion", 0.00, 5.00, 0.0, false);
        self.addAttribute(self.KNOCKBACK_RESISTANCE, "minecraft:knockback_resistance", 0.00, 1.00, 0.00);
        self.addAttribute(self.HEALTH, "minecraft:health", 0.00, 20.00, 20.00);
        self.addAttribute(self.MOVEMENT_SPEED, "minecraft:movement", 0.00, 340282346638528859811704183484516925440.00, 0.10);
        self.addAttribute(self.FOLLOW_RANGE, "minecraft:follow_range", 0.00, 2048.00, 16.00, false);
        self.addAttribute(self.HUNGER, "minecraft:player.hunger", 0.00, 20.00, 20.00);
        self.addAttribute(self.ATTACK_DAMAGE, "minecraft:attack_damage", 0.00, 340282346638528859811704183484516925440.00, 1.00, false);
        self.addAttribute(self.EXPERIENCE_LEVEL, "minecraft:player.level", 0.00, 24791.00, 0.00);
        self.addAttribute(self.EXPERIENCE, "minecraft:player.experience", 0.00, 1.00, 0.00);
        self.addAttribute(self.UNDERWATER_MOVEMENT, "minecraft:underwater_movement", 0.0, 340282346638528859811704183484516925440.0, 0.02);
        self.addAttribute(self.LUCK, "minecraft:luck", -1024.0, 1024.0, 0.0);
        self.addAttribute(self.FALL_DAMAGE, "minecraft:fall_damage", 0.0, 340282346638528859811704183484516925440.0, 1.0);
        self.addAttribute(self.HORSE_JUMP_STRENGTH, "minecraft:horse.jump_strength", 0.0, 2.0, 0.7);
        self.addAttribute(self.ZOMBIE_SPAWN_REINFORCEMENTS, "minecraft:zombie.spawn_reinforcements", 0.0, 1.0, 0.0);
    }

    addAttribute(id, name, minValue, maxValue, defaultValue, currentValue, shouldSend = true){
        if (minValue > maxValue || defaultValue > maxValue || defaultValue < minValue) {
            console.log(`Invalid ranges: min value: ${minValue}, max value: ${maxValue}, defaultValue: ${defaultValue}`);
        }

        return this.attributes[id] = new Attribute(id, name, minValue, maxValue, defaultValue, currentValue, shouldSend);
    }

    getAttribute(id){
        return Isset(this.attributes[id] ? this.attributes[id].clone() : null);
    }

    static getAttributeByName(){
        self.attributes.forEach(attribute => {
            if (attribute.getName() === name){
                return attribute.clone();
            }
        });

        return null;
    }

    constructor(id, name, minValue, maxValue, defaultValue, shouldSend = true){
        this.initVars();
        this.id = id;
        this.name = name;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.defaultValue = defaultValue;
        this.shouldSend = shouldSend;

        this.currentValue = this.defaultValue;
        // this.init();
    }

    getMinValue(){
        return this.minValue;
    }

    setMinValue(minValue){

        let max;
        if (minValue > (max = this.getMaxValue())){
            console.log(`Minimum ${minValue} is greater than the maximum ${max}`);
        }

        if (this.minValue !== minValue){
            this.desynchronized = true;
            this.minValue = minValue;
        }

        return this;
    }

    getMaxValue(){
        return this.maxValue;
    }

    setMaxValue(maxValue){

        let min;
        if (maxValue < (min = this.getMinValue())){
            console.log(`Maximum ${maxValue} is less than the minimum ${min}`);
        }

        if (this.maxValue !== maxValue){
            this.desynchronized = true;
            this.maxValue = maxValue;
        }
        return this;
    }

    getDefaultValue(){
        return this.defaultValue;
    }

    setDefaultValue(defaultValue){

        if (defaultValue > (this.getMaxValue() || defaultValue < this.getMinValue())){
            console.log(`Default ${defaultValue} is outside the range " . ${this.getMinValue()} . " - " . ${this.getMaxValue()}`);
        }

        if (this.defaultValue !== defaultValue){
            this.desynchronized = true;
            this.defaultValue = defaultValue;
        }
        return this;
    }

    resetToDefault(){
        this.setValue(this.getDefaultValue(), true);
    }

    getValue(){
        return this.currentValue;
    }

    setValue(value, fit = false, forceSend = false){
        if (value > this.getMaxValue() || value < this.getMinValue()) {
            if (!fit){
                console.log(`Value ${value} is outside the range " . ${this.getMinValue()} . " - " . ${this.getMaxValue()}`);
            }

            value = Math.min(Math.max(value, this.getMinValue(), this.getMaxValue()));
        }

        if (this.currentValue !== value){
            this.desynchronized = true;
            this.currentValue = value;
        }else if (forceSend) {
            this.desynchronized = true;
        }

        return this;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    isSyncable(){
        return this.shouldSend;
    }

    isDesynchronized(){
        return this.shouldSend && this.desynchronized;
    }

    markSynchronized(synced = true) {
        this.desynchronized = !synced;
    }
}

module.exports = Attribute;