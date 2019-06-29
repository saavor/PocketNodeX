const Inventory = pocketnode("inventory/Inventory");

interface InventoryHolder{
    getInventory() : Inventory;
}