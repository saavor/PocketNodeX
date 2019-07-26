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

const Listener = require("./Listener");

const Plugin = require("../plugin/Plugin");
const RegisteredListener = require("../plugin/RegisteredListener");

class EventManager {
    initVars(){
        this._listeners = [];
    }

    constructor(){
        this.initVars();
    }

    registerListener(listener, plugin){
        if(listener instanceof Listener && plugin instanceof Plugin){
            this._listeners.push(new RegisteredListener(listener, plugin));
            return true;
        }else{
            throw new Error("Must provide instances of a listener and plugin.");
        }
    }

    callEvent(name, event){
        this._listeners.forEach(listener => listener.callEvent(name, event));
    }
}

module.exports = EventManager;