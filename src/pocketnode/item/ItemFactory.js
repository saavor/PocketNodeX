const Item = require("../item/Item");
const CompoundTag = require("../nbt/tag/CompoundTag");

class ItemFactory{

    initVars(){
        this.list = null;
    }

    static init(){
        self.list = new Array(65536);

        //self.registerItem(new Showel())
    }

    constructor(){
        this.initVars();
    }

    static registerItem(item, override = false){
        CheckTypes([Item,  item]);
        let id = item.getId();
        if (!override && self.isRegistered(id)) {
            console.log("Trying to overwrite an already registered item");
        }

        self.list[self.getListOffset(id)] = Object.assign( Object.create( Object.getPrototypeOf(item)), item);
    }

    static isRegistered(id) : boolean{
        if (id < 256){
            //return BlockFactory.isRegistered(id); TODO
        }
        return self.list[self.getListOffset(id)] !== null;
    }

    static getListOffset(id) : number{
        if (id < -0x8000 || id > 0x7fff){
            console.log("ID must be in range " + -0x8000 + " - " + 0x7fff);
        }
        return id & 0xffff;
    }

    get(id, meta = 0, count = 1, tags = null) : Item{
        if (!tags.isString() && !(tags instanceof CompoundTag) && tags !== null){
            //TODO: better debug :)
            console.log("`tags` argument must be a string or CompoundTag instance, . (is_object($tags) ? instance of  get_class($tags) : gettype($tags)) . given DEBUG NOT COMPLETE... TEST PURPOSE");
        }

        try {
            let listed = self.list[self.getListOffset(id)];
            if (listed !== null){
                let item = Object.assign( Object.create( Object.getPrototypeOf(listed)), listed); //might not work
            }else if (id >= 0 && id < 256){
                //TODO: let item = new ItemBlock(id, meta);
            } else {
                let item = new Item(id, meta);
            }
        }catch (e) {
            console.log(`Item ID ${id} is invalid or out of bounds`);
        }

        //TODO: find a hack to fix that trash dude, maybe declaring just let item? naah
        item.setDamage();
        item.setCount();
        item.setCompoundTag(tags);
        return item;
    }


}