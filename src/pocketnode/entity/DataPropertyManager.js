const Isset = require("../utils/methods/Isset");

class DataPropertyManager{

    initVars(){
        this._properties = [];
        this._dirtyProperties = []
    }

    constructor(){
        this.initVars();
    }

    getByte(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_BYTE);
        assert(value.isNumber() || value === null);
        return value;
    }

    getPropertyValue(key, type){
        if (type !== -1){
            this._checkType(key, type);
        }
        return Isset(this._properties[key] ? this._properties[key][1] : null);
    }

    setPropertyValue(key, type, value, force = false){
        if (!force){
            this._checkType(key, type);
        }

        this._properties[key] = this._dirtyProperties[key] = [type, value];
    }
    
    _checkType(key, type){
        if (Isset(this._properties[key]) && this._properties[key][0] !== type) {
            console.log(`Expected type ${type}, but have " . ${this._properties[key][0]}`)
        }
    }

    getAll(){
        return this._properties;
    }
}

module.exports = DataPropertyManager;