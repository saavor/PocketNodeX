const NBT = pocketnode("nbt/NBT");

class ListTag extends NamedTag{

    initVars() {
        this._tagType = -1;
        this._value = null;
    }

    constructor(name = "", value = [], tagType = NBT.TAG_End){
        super();
        this.initVars();

        this.constructor.call();

        this._tagType = tagType;
        this._value = [];
        value.forEach(tag => {
            this.push(tag);
        });
    }

    //TODO: test if works xD
    getValue() : NamedTag{
        let value = [];
        this._value.forEach(k => v => {
            value[k] = v;
        });

        return value;
    }

    //TODO: test if works xD
    getAllValues() : []{
        let result = [];
        this._value.forEach(tag => {
            if (tag instanceof Array){
                result.push(tag);
            } else {
                result.push(tag.getValue());
            }
        });

        return result;
    }

    offsetExists(offset) : boolean{
        return Isset(this._value[offset]);
    }

    offsetGet(offset){
        let value = this._value[offset];

        if (value instanceof Array){
            return value;
        } else if (value !== null) {
            return value.getValue();
        }

        return null;
    }

    offsetSet(offset, value) : void{
        if (value instanceof NamedTag){
            this.checkTagType(value);
            this._value[offset] = value;
        }else {
            //TODO: better log :) (again lol)
            console.log(`Value set by ArrayAccess must be an instance of " . NamedTag::class . ", got " . (is_object($value) ? " instance of " . get_class($value) : gettype($value))`);
        }
    }

    offsetUnset(offset) : void{
        this._value.delete(offset);
    }

    count() : number{
        return this._value.size;
    }

    getCount() : number{
        return this._value.size;
    }

    push(tag){
        CheckTypes([NamedTag, tag]);
        this.checkTagType(tag);
        this._value.push(tag);
    }

    pop() : NamedTag{
        return this._value.pop();
    }

    unshift(tag) : void{
        CheckTypes([NamedTag, tag]);
        this.checkTagType(tag);
        this._value.unshift(tag);
    }

    shift() : NamedTag{
        this._value.shift();
    }

    insert(offset, tag){
        CheckTypes([NamedTag, tag]);
        this.checkTagType(tag);
        this._value.splice(offset, 0, tag); //HACK
    }

    //TODO: test if works, offsetUnset too...
    remove(offset) : void{
        for (let tag in this._value){
            if (this._value[offset]){
                this._value.splice(tag, 1);
            }
        }
    }

    //TODO: complete with all missing functions

    checkTagType(tag) : void{
        CheckTypes([NamedTag, tag]);
        let type = tag.getType();
        if (type !== this._tagType){
            if (this._tagType === NBT.TAG_End){
                this._tagType = type;
            } else {
                //TODO: better debug :)
                console.log(`Invalid tag of type " . get_class($tag) . " assigned to ListTag, expected " . get_class(NBT::createTag($this->tagType))`);
            }
        }
    }
}

module.exports = ListTag;