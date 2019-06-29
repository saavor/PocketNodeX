const BaseInventory = pocketnode("inventory/BaseInventory");
const Item = pocketnode("item/Item");

class ArmorInventory extends BaseInventory{
    static get SLOT_HEAD() {return 0};
    static get SLOT_CHEST() {return 1};
    static get SLOT_LEGS() {return 2};
    static get SLOT_FEET() {return 3};

    initVars(){

        //instance of living
        this._holder = null;
    }

    constructor(holder) {
        super();
        this.initVars();

        CheckTypes([Living, holder]);
        this._holder = holder;

        this.constructor.call(); // should be parent
    }

    /**
     *
     * @return {Living}
     */
    getHolder(){
        return this._holder;
    }

    /**
     *
     * @return {string}
     */
    getName(){
        return "Armor";
    }

    /**
     *
     * @return {number}
     */
    getDefaultSize(){
        return 4;
    }

    /**
     *
     * @return {Item}
     */
    getHelmet(){
        return this.getItem();
    }


}

module.exports = ArmorInventory;