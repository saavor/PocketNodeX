const NamedTag = pocketnode("nbt/tag/NamedTag");
const ListTag = pocketnode("nbt/tag/ListTag");

class CompoundTag extends NamedTag {

    initVars() {
        this.value = [];
    }

    constructor(name = "", value = []){
        super();
        this.initVars();

        //new this.constructor.call(); //should be parent

        value.forEach(tag => {
            this.setTag(tag);
        });
    }

    /**
     *
     * @return {number}
     */
    count(){
        return this.value.length;
    }

    getCount(){
        return this.value.length;
    }

    getValue() {
        return this.value;
    }

    /**
     *
     * @param name
     * @param expectedClass
     * @return {NamedTag}
     */
    getTag(name, expectedClass = NamedTag){
        //CheckTypes([NamedTag, expectedClass]);
        let tag = this.value[name];
        if (tag !== null && !(tag instanceof expectedClass)){
            //TODO: finish debug.. test purpose atm
            console.log(`Expected a tag of type ${expectedClass}, got " . getclass($tag) TO FINISH DEBUG TEXT, UNCOMPLETED`);
        }
        return tag;
    }

    /**
     *
     * @param tag
     * @param force
     * @return {void}
     */
    setTag(tag, force = false){
        if (!force){
            let existing = this.value[tag.name];
            if (existing !== null && !(tag instanceof existing)){
                console.log(`Cannot set tag at \\"${tag.name}\\": tried to overwrite " . getclass($existing) . " with " . getclass($tag) NOT COMPLETED DEBUG...`);
            }
        }
        this.value[tag.name] = tag;
    }

    //def = default
    /**
     *
     * @param name
     * @param def
     * @param badTagDefault
     * @return {string}
     */
    getString(name, def = null, badTagDefault = false){
        return this.getTagValue(name, StringTag)
    }

    /**
     *
     * @param name
     * @return {NamedTag}
     */
    getListTag(name){
        return this.getTag(name, ListTag);
    }

    /**
     *
     * @param name
     * @return {CompoundTag}
     */
    getCompoundTag(name) {
        return this.getTag(name, CompoundTag);
    }

    //def = default
    getByteArray(name, def = null, badTagDefault = false){
        return this.getTagValue(name, ByteArrayTag, def, badTagDefault);
    }

    getTagValue(name, expectedClass, def = null, badTagDefault = false ){
        let tag = this.getTag(name, badTagDefault ? NamedTag : expectedClass);
        if (tag instanceof expectedClass){
            return tag.getValue();
        }

        if (def === null){
            console.log(`Tag with name "${name}"` +  (tag !== null ? "not of expected type" : "not found") + " and no valid default value given");
        }

        return def;
    }

    getByte(name, def = null, badTagDefault = false){
        //TODO byrtetag class
        //return this.getTagValue(name, ByteTag, def, badTagDefault);
    }

    /**
     *
     * @param name
     * @param expectedClass
     * @return {boolean}
     */
    hasTag(name, expectedClass = NamedTag){
        if (this.value[name] !== null){
            return this.value[name] instanceof expectedClass;
        }else {
            return false;
        }
    }

    /**
     * @return {ListTag}
     * @param name
     */
    getListTag(name){
        return this.getTag(name, ListTag);
    }
}

module.exports = CompoundTag;