const Inventory = pocketnode("inventory/Inventory");
const InventoryEventProcessor = pocketnode("inventory/InventoryEventProcessor");

class BaseInventory extends Inventory{

    static get maxStackSize() {return Inventory.MAX_STACK};

    initVars(){
        this._name = "";
        this._title = "";
        this._slots = [];
        this._viewers = [];
        this._eventProcessor = new InventoryEventProcessor();
    }

    constructor(items = [], size = null, title = null) {

        super();

        let sizeVal;
        if (size){
            sizeVal = size;
        } else {
            sizeVal = this.getDefaultSize();
        }

       this._slots = new Array(sizeVal);

        if (title !== null){
            this._title = title;
        } else {
            this._title = this.getName();
        }

        this.setContents(items, false);
    }

    getName(){};

    getTitle(){
        return this._title;
    }

    getSize(){
        return this._slots.getSize();
    }

    getDefaultSize(){};

    setContents(items, send = true){
        if (items.length > this.getSize()){
            let items = items.slice(0, this.getSize()); //might not work... need to be tested
        }
        
        for (let i = 0, size = this.getSize(); i < size; ++i){
            if (Isset(items[i])){
                if (this._slots[i] !== null) {
                    this.clear(i, false);
                }
            } else {
                if (!this.setItem(i, items[i], false)){
                    this.clear(i, false);
                }
            }
        }

        if (send){
            this.setContents(this.getViewers());
        }
    }

    getViewers() /*: Player[] mhh.. this might crash server xD*/{
        return this._viewers;
    }

    setItem(index, item, send = true){
        CheckTypes([Item, item]);
        if (item.isNull()){

        }
    }

}

module.exports = BaseInventory;