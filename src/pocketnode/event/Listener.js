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

class Listener {
    constructor(){
        this._listeners = {};
    }

    on(event, callback, options = {}){
        CheckTypes([String, event], [Function, callback], [Object, options]);

        if(this._listeners[event]) throw new Error("Only one listener can be set for one event.");
        this._listeners[event] = {callback, options};
    }

    getListeners(){
        return this._listeners;
    }

    getListenerFor(event){
        if(!this._listeners[event]) return null;

        return this._listeners[event].callback;
    }

    getOptionsFor(event){
        if(!this._listeners[event]) return null;
        
        return this._listeners[event].options;
    }
}

module.exports = Listener;