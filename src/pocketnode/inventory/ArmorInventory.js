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

    getHolder() : Living{
        return this._holder;
    }

    getName() : String{
        return "Armor";
    }

    getDefaultSize() : Number{
        return 4;
    }

    getHelmet() : Item{
        return this.getItem()
    }


}

module.exports = ArmorInventory;