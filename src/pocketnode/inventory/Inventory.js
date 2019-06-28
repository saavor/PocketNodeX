const Item = pocketnode("item/Item");
const InventoryEventProcessor = pocketnode("inventory/InventoryPlayerProcessor");

class Inventory {
    static get MAX_STACK() {
        return 64
    };

    getSize(): number;

    getMaxStackSize(): number;

    setMaxStackSize(size): void;

    getName(): string;

    getTitle(): string;

    getItem(index): Item;

    setItem(item, index, send = true): boolean;

    addItem(...slots): [];

    canAddItem(item): boolean;

    removeItem(...slots): [];

    getContents(includeEmpty): [];

    setContents(items, send = true): void;

    dropContents(level, position): void;

    sendContents(target): void;

    sendSlot(index, target): void;

    contains(item): boolean;

    all(item): [];

    first(): number;

    firstEmpty(): number;

    isSlotEmpty(index): boolean;

    remove(item): void;

    clear(index, send = true): boolean;

    clearAll(send = true): void;

    getViewers(): [];

    onOpen(who): void;

    open(who): boolean;

    close(who): void;

    onClose(who): void;

    onSlotChange(index, before, send): void;

    slotExists(slot): boolean;

    getEventProcessor(): ?InventoryEventProcessor;

    setEventProcessor(eventProcessor): void;
}

module.exports = Inventory;
