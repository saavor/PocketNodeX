const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

const NetworkInventoryAction = require("./types/NetworkInventoryAction");

class InventoryTransactionPacket extends DataPacket {

    static getId() {
        return ProtocolInfo.INVENTORY_TRANSACTION_PACKET;
    }

    static get TYPE_NORMAL() {return  0};
    static get TYPE_MISMATCH() {return 1};
    static get TYPE_USE_ITEM() {return 2};
    static get TYPE_USE_ITEM_ON_ENTITY() {return 3};
    static get TYPE_RELEASE_ITEM() {return 4};

    static get USE_ITEM_ACTION_CLICK_BLOCK() {return 0};
    static get USE_ITEM_ACTION_CLICK_AIR() {return 1};
    static get USE_ITEM_ACTION_BREAK_BLOCK() {return 2};

    static get RELEASE_ITEM_ACTION_RELEASE() {return 0}; //bow shoot
    static get RELEASE_ITEM_ACTION_CONSUME() {return 1}; //eat food, drink potion

    static get USE_ITEM_ON_ENTITY_ACTION_INTERACT() {return 0};
    static get USE_ITEM_ON_ENTITY_ACTION_ATTACK() {return 1};

    initVars(){
        this.transactionType = -1;

        /**
         * @type {boolean}
         * NOTE: THIS FIELD DOES NOT EXIST IN THE PROTOCOL, it's merely used for convenience for PocketMine-MP to easily
         * determine whether we're doing a crafting transaction.
         */
        this.isCraftingPart = false;
        /**
         * @type {boolean}
         * NOTE: THIS FIELD DOES NOT EXIST IN THE PROTOCOL, it's merely used for convenience for PocketMine-MP to easily
         * determine whether we're doing a crafting transaction.
         */
        this.isFinalCraftingPart = false;

        this.actions = [];

        this.trData = null;
    }

    constructor() {
        super();
        this.initVars();
    }

    _decodePayload() {
        this.transactionType = this.readUnsignedVarInt();

        for (let i = 0, count = this.readUnsignedVarInt(); i < count; ++i){
            this.actions.push(new NetworkInventoryAction().read(this));
        }

        this.trData = new this();
        
        switch (this.transactionType) {
            //TODO
        }
    }

    _encodePayload() {

    }
}
module.exports = InventoryTransactionPacket;
