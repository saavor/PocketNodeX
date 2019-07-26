const Isset = require("../utils/methods/Isset");

const Vector3 = require("../math/Vector3");

const Entity = require("../entity/Entity");

const Item = require("../item/Item");

class DataPropertyManager{

    initVars(){
        this._properties = [];
        this._dirtyProperties = [];
    }

    constructor(){
        this.initVars();
    }

    /**
     *
     * @param key {number}
     * @return {number|null}
     */
    getByte(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_BYTE);
        assert(Number.isInteger(value) || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setByte(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_BYTE, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {number|null}
     */
    getShort(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_SHORT);
        assert(Number.isInteger(value) || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setShort(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_SHORT, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {number|null}
     */
    getInt(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_INT);
        assert(Number.isInteger(value) || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setInt(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_INT, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {number|null}
     */
    getFloat(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_FLOAT);
        assert(Number.isInteger(value) || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setFloat(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_FLOAT, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {null|string}
     */
    getString(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_STRING);
        assert(typeof value === 'string' || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setString(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_STRING, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {null|Item}
     */
    getItem(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_SLOT);
        assert(value instanceof Item || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setItem(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_SLOT, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {null|Vector3}
     */
    getBlockPos(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_POS);
        assert(value instanceof Vector3 || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setBlockPos(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_POS, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {number|null}
     */
    getLong(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_LONG);
        assert(Number.isInteger(value) || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {number}
     * @param force {boolean}
     */
    setLong(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_LONG, value, force);
    }

    /**
     *
     * @param key {number}
     * @return {null|Vector3}
     */
    getVector3(key){
        let value = this.getPropertyValue(key, Entity.DATA_TYPE_VECTOR3F);
        assert(value instanceof Vector3 || value === null);
        return value;
    }

    /**
     *
     * @param key {number}
     * @param value {null|Vector3}
     * @param force {boolean}
     */
    setVector3(key, value, force = false){
        this.setPropertyValue(key, Entity.DATA_TYPE_VECTOR3F, value ? value.asVector3() : null, force);
    }

    /**
     *
     * @param key {number}
     */
    removeProperty(key){
        let index = this._properties.indexOf(key);
        this._properties.splice(index, 1);
    }

    /**
     *
     * @param key {number}
     * @return boolean
     */
    hasProperty(key){
        return Isset(this._properties[key]);
    }

    /**
     *
     * @param key {number}
     * @return {number|*}
     */
    getPropertyType(key){
        if (Isset(this._properties[key])){
            return this._properties[key][0];
        }

        return -1;
    }

    /**
     *
     * @param key {number}
     * @param type {number}
     */
    checkType(key, type){
        if (Isset(this._properties[key]) && this._properties[key][0] !== type){
            console.log(`Expected type ${type}, but have ${this._properties[key][0]}`);
        }
    }

    /**
     *
     * @param key {number}
     * @param type {number}
     */
    getPropertyValue(key, type){
        if (type !== -1){
            this.checkType(key, type);
        }
        return Isset(this._properties[key]) ? this._properties[key][1] : null;
    }

    /**
     *
     * @param key {number}
     * @param type {number}
     * @param value {*}
     * @param force {boolean}
     */
    setPropertyValue(key, type, value, force = false){
        if (!force){
            this.checkType(key, type);
        }
        this._properties[key] = this._dirtyProperties[key] = [type, value];
    }

    /**
     * Returns all properties.
     *
     * @return {Array}
     */
    getAll(){
        return this._properties;
    }

    /**
     * Returns properties that have changed and need to be broadcasted.
     *
     * @return {Array}
     */
    getDirty(){
        return this._dirtyProperties;
    }

    /**
     * Clears records of dirty properties.
     */
    clearDirtyProperties(){
        this._dirtyProperties = [];
    }
}
module.exports = DataPropertyManager;