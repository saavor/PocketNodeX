const Item = pocketnode("item/Item");

class InventoryEventProcessor {

    onSlotChange(inventory, slot, oldItem, newItem) : ?Item;
        //CheckTypes([Inventory, inventory], [Item, oldItem], [Item, newItem]);
}

module.exports = InventoryEventProcessor;