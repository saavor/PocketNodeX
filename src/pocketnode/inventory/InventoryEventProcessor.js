const Item = require("../item/Item");

class InventoryEventProcessor {

    /**
     * @return {Item}
     * @param inventory
     * @param slot
     * @param oldItem
     * @param newItem
     */
    onSlotChange(inventory, slot, oldItem, newItem){};
        //CheckTypes([Inventory, inventory], [Item, oldItem], [Item, newItem]);
}

module.exports = InventoryEventProcessor;