const Item = require("../item/Item");
const InventoryEventProcessor = require("../inventory/InventoryEventProcessor");

class Inventory {

    static get MAX_STACK() {
        return 64
    };

    /**
     * @return {number}
     */
    getSize(){};

    /**
     * @return {number}
     */
    getMaxStackSize(){};

    setMaxStackSize(size){};

    getName(){};

    getTitle(){};

    /**
     * 
     * @param index {number}
     * @return {Item}
     */
    getItem(index){};

    setItem(item, index, send = true){};

    addItem(...slots){};

    canAddItem(item){};

    removeItem(...slots){};

    getContents(includeEmpty){};

    setContents(items, send = true){};

    dropContents(level, position){};

    sendContents(target){};

    sendSlot(index, target){};

    contains(item){};

    all(item){};

    first(){};

    firstEmpty(){};

    isSlotEmpty(index){};

    remove(item){};

    clear(index, send = true){};

    clearAll(send = true){};

    getViewers(){};

    onOpen(who){};

    open(who){};

    close(who){};

    onClose(who){};

    onSlotChange(index, before, send){};

    slotExists(slot){};

    /**
     * @return {InventoryEventProcessor|null}
     */
    getEventProcessor(){};

    setEventProcessor(eventProcessor){};
}

module.exports = Inventory;
