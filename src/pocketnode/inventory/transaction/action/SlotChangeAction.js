const InventoryTransaction = require("./InventoryAction");

class SlotChangeAction extends InventoryTransaction{

    initVars(){
        this._inventory = null;
        this._inventorySlot = -1;
    }

    constructor(inventory, inventorySlot){
        super();
        this.initVars();
        this._inventory = inventory;
        this._inventorySlot = inventorySlot;
    }

    getInventory(){
        return this._inventory;
    }

    getSlot(){
        return this._inventorySlot;
    }

    //TODO
}
module.exports = SlotChangeAction;