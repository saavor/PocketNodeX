const Isset = require("../utils/methods/Isset");
const Entity = require("./Entity");

class DataPropertyManager{

    initVars(){
        this._properties = [];
        this._dirtyProperties = []
    }

    constructor(){
        this.initVars();
    }

    /**
     *
     * @param key
     * @return {boolean}
     */
    getByte(key) {
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_BYTE);
        assert(value.isNumber() || value === null);
        return value;
    }

    /**
     *
     * @param key
     * @param value
     * @param force
     */
    setByte(key, value, force = false) {
        this.setPropertyValue(key, Entity.DATA_TYPE_BYTE, value, force);
    }

    /**
     *
     * @param key
     * @return {boolean}
     */
    getShort(key) {
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_SHORT);
        assert(value.isNumber() || value === null);
        return value;
    }

    /**
     *
     * @param key
     * @param value
     * @param force
     */
    setShort(key, value, force = false) {
        this.setPropertyValue(key, Entity.DATA_TYPE_SHORT, value, force);
    }

    /**
     *
     * @param key
     * @return {boolean}
     */
    getInt(key) {
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_INT);
        assert(value.isNumber() || value === null);
        return value;
    }

    /**
     *
     * @param key
     * @param value
     * @param force
     */
    setInt(key, value, force = false) {
        this.setPropertyValue(key, Entity.DATA_TYPE_INT, value, force);
    }

    /**
     *
     * @param key
     * @return {boolean}
     */
    getFloat(key) {
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_FLOAT);
        assert(value.isNumber() || value === null);
        return value;
    }

    // setFloat()







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