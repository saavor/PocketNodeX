const Inventory = pocketnode("inventory/Inventory");
const InventoryEventProcessor = pocketnode("inventory/InventoryEventProcessor");

class BaseInventory implements Inventory{

    static get maxStackSize() {return Inventory.MAX_STACK};

    initVars(){
        this._name = "";
        this._title = "";
        this._slots = [];
        this._viewers = [];
        this._eventProcessor = new InventoryEventProcessor();
    }

    constructor(item = [], size = null, title = null) {

        let sizeVal;
        if (size){
            sizeVal = size;
        } else {
            sizeVal = this.getDefaultSize();
        }

       this._slots = new Array(sizeVal);
    }

}

module.exports = BaseInventory;