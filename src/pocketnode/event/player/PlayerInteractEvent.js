const PlayerEvent = require("./PlayerEvent");
const Vector3 = require("../../math/Vector3");
const Item = require("../../item/Item");

class PlayerInteractEvent extends PlayerEvent{

    static get LEFT_CLICK_BLOCK() {return 0};
    static get RIGHT_CLICK_BLOCK() {return 1};
    static get LEFT_CLICK_AIR() {return 2};
    static get RIGHT_CLICK_AIR() {return 3};
    static get PHYSICAL() {return 4};

    initVars(){
        this._blockTouched = null;
        this._touchVector = new Vector3();
        this._blockFace = -1;
        this._item = new Item();
        this._action = -1;
    }

    constructor(player, item, block, touchVector, face, action = PlayerInteractEvent.RIGHT_CLICK_BLOCK){
        super();
        this.initVars();
        console.log("PlayerInteractEvent called...");
        assert(block !== null || touchVector !== null);
        this._player = player;
        this._item = item;
        //TODO: this._blockTouched = block ?? BlockFactory.get()
        this._blockTouched = block;
        this._touchVector = touchVector ? new Vector3(0, 0, 0) : new Vector3(0, 0, 0);
        this._blockFace = face;
        this._action = action;
    }

    getAction(){
        return this._action;
    }

    getItem(){
        return this._item;
    }

    getBlock(){
        return this._blockTouched;
    }

    getTouchVector(){
        return this._touchVector;
    }

    getFace(){
        return this._blockFace;
    }
}

module.exports = PlayerInteractEvent;