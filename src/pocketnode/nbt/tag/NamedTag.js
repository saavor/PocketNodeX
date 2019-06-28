class NamedTag{

    initVars(){
        this.__name = "";
        this._cloning = false;
    }

    constructor(name = ""){
        this.initVars();

        if (name.length > 32767){
            console.log(`Tag name cannot be more than 32767 bytes, got length " . ${name.length}`);
        }
        this.__name = name;
    }

    getName() : string{
        return this.__name;
    }

    setName(name) : void{
        this.__name = name;
    }

    getValue(){}

    getType() : number;

    write(nbt) : void;

    read(nbt) : void;

    __toString(){
        return this.toString();
    }

    toString(identation = 0) : string{
        return "  ".repeat(identation) + this.constructor.name + ": " + (this.__name !== "" ? `name=${this.__name}, ` : "") + `value="${String(this.getValue())}"`;
    }

    safeClone() : NamedTag{
        if (this._cloning) {
            console.log("Recursive NBT tag dependency detected");
        }
        this._cloning = true;

        let retval = Object.assign( Object.create( Object.getPrototypeOf(this)), this);

        this._cloning = false;
        retval._cloning = false;

        return retval;
    }

    equals(that) : boolean{
        CheckTypes([NamedTag, that]);
        return this.__name === that.__name && this.equalsValue(that);
    }

    equalsValue(that){
        CheckTypes([NamedTag, that]);
        return that instanceof this && this.getValue() === that.getValue();
    }
}

module.exports = NamedTag;