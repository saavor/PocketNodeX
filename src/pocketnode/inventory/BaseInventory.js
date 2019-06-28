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

    constructor(items = [], size = null, title = null) {

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

    getName() : string;

    getTitle() : string{
        return this._title;
    }

    getSize() : number{
        return this._slots.getSize();
    }

    getDefaultSize() : number;

    setContents(items, send = true) : void{
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

    setItem(index, item, send = true) : boolean{
        if (item.isNull()){

        }
    }

}

module.exports = BaseInventory;