const NamedTag = pocketnode("nbt/tag/NamedTag");
const ListTag = pocketnode("nbt/tag/ListTag");

class CompoundTag extends NamedTag {

    initVars() {
        this._value = [];
    }

    constructor(name = "", value = []){
        super();
        this.initVars();

        this.constructor.call(); //should be parent

        value.forEach(tag => {
            this.setTag(tag);
        });
    }

    count() : number{
        return this._value.length;
    }

    getCount(){
        return this._value.length;
    }

    getValue() {
        return this._value;
    }

    getTag(name, expectedClass = NamedTag) : ?NamedTag{
        CheckTypes([NamedTag, expectedClass]);
        let tag = this._value[name];
        if (tag !== null && !(tag instanceof expectedClass)){
            //TODO: finish debug.. test purpose atm
            console.log(`Expected a tag of type ${expectedClass}, got " . get_class($tag) TO FINISH DEBUG TEXT, UNCOMPLETED`);
        }
        return tag;
    }

    setTag(tag, force = false) : void{
        if (!force){
            let existing = this._value[tag.__name];
            if (existing !== null && !(tag instanceof existing)){
                console.log(`Cannot set tag at \\"${tag.__name}\\": tried to overwrite " . get_class($existing) . " with " . get_class($tag) NOT COMPLETED DEBUG...`);
            }
        }
        this._value[tag.__name] = tag;
    }

    getListTag(name) : ?ListTag{
        return this.getTag(name, ListTag);
    }

    getCompoundTag(name) : ?CompoundTag{
        return this.getTag(name, CompoundTag);
    }
}

module.exports = CompoundTag;