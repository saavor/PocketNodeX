class NamedTag{

    initVars(){
        this.__name = "";
        this.cloning = false;
    }

    constructor(name = ""){
        this.initVars();

        if (name.length > 32767){
            console.log(`Tag name cannot be more than 32767 bytes, got length " . ${name.length}`);
        }
        this.__name = name;
    }

    getName() {
        return this.__name;
    }

    setName(name) {
        this.__name = name;
    }

    getValue(){}

    getType() {};

    write(nbt) {};

    read(nbt) {};

    /**
     *
     * @param identation
     * @return {string}
     */
    toString(identation = 0){
        return "  ".repeat(identation) + this.constructor.name + ": " + (this.__name !== "" ? `name=${this.__name}, ` : "") + `value="${String(this.getValue())}"`;
    }

    /**
     *
     * @return {NamedTag}
     */
    safeClone(){
        if (this.cloning) {
            console.log("Recursive NBT tag dependency detected");
        }
        this.cloning = true;

        let retval = Object.assign( Object.create( Object.getPrototypeOf(this)), this);

        this.cloning = false;
        retval.cloning = false;

        return retval;
    }

    /**
     *
     * @param that
     * @return {boolean|*}
     */
    equals(that){
        CheckTypes([NamedTag, that]);
        return this.__name === that.__name && this.equalsValue(that);
    }

    equalsValue(that){
        CheckTypes([NamedTag, that]);
        return that instanceof this && this.getValue() === that.getValue();
    }
}

module.exports = NamedTag;