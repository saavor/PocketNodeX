/*
 *   _____           _        _   _   _           _
 *  |  __ \         | |      | | | \ | |         | |
 *  | |__) |__   ___| | _____| |_|  \| | ___   __| | ___
 *  |  ___/ _ \ / __| |/ / _ \ __| . ` |/ _ \ / _` |/ _ \
 *  | |  | (_) | (__|   <  __/ |_| |\  | (_) | (_| |  __/
 *  |_|   \___/ \___|_|\_\___|\__|_| \_|\___/ \__,_|\___|
 *
 *  @author PocketNode Team
 *  @link https://pocketnode.me
*/

const NBT = require("../NBT");
const NamedTag = require("./NamedTag");

class ListTag extends NamedTag{

    initVars() {
        this.tagType = -1;
        this.value = null;
    }

    constructor(name = "", value = [], tagType = NBT.TAG_End){
        super();
        this.initVars();

        this.tagType = tagType;
        this.value = [];
        value.forEach(tag => {
            this.push(tag);
        });
    }

    getType(){
        return NBT.TAG_List;
    }

    getValue(){
        let value = [];
        this.value.forEach(k => {
           for (let v in k){
               if (k.hasOwnProperty(v)){
                   value[k] = v;
               }
           }
        });

        return value;
    }

    //TODO: test if works xD
    getAllValues(){
        let result = [];
        this.value.forEach(tag => {
            if (tag instanceof Array){
                result.push(tag);
            } else {
                result.push(tag.getValue());
            }
        });

        return result;
    }

    offsetExists(offset){
        return Isset(this.value[offset]);
    }

    offsetGet(offset){
        let value = this.value[offset];

        if (value instanceof Array){
            return value;
        } else if (value !== null) {
            return value.getValue();
        }

        return null;
    }

    offsetSet(offset, value){
        if (value instanceof NamedTag){
            this.checkTagType(value);
            this.value[offset] = value;
        }else {
            //TODO: better log :) (again lol)
            console.log(`Value set by ArrayAccess must be an instance of " . NamedTag::class . ", got " . (isobject($value) ? " instance of " . getclass($value) : gettype($value))`);
        }
    }

    offsetUnset(offset){
        this.value.delete(offset);
    }

    count(){
        return this.value.size;
    }

    getCount() {
        return this.value.size;
    }

    push(tag){
        CheckTypes([NamedTag, tag]);
        this.checkTagType(tag);
        this.value.push(tag);
    }

    pop() {
        return this.value.pop();
    }

    unshift(tag){
        CheckTypes([NamedTag, tag]);
        this.checkTagType(tag);
        this.value.unshift(tag);
    }

    shift(){
        this.value.shift();
    }

    insert(offset, tag){
        CheckTypes([NamedTag, tag]);
        this.checkTagType(tag);
        this.value.splice(offset, 0, tag); //HACK
    }

    //TODO: test if works, offsetUnset too...
    remove(offset){
        for (let tag in this.value){
            if (this.value[offset]){
                this.value.splice(tag, 1);
            }
        }
    }

    //TODO: complete with all missing functions

    checkTagType(tag){
        CheckTypes([NamedTag, tag]);
        let type = tag.getType();
        if (type !== this.tagType){
            if (this.tagType === NBT.TAG_End){
                this.tagType = type;
            } else {
                //TODO: better debug :)
                console.log(`Invalid tag of type " . getclass($tag) . " assigned to ListTag, expected " . getclass(NBT::createTag($this->tagType))`);
            }
        }
    }
}

module.exports = ListTag;