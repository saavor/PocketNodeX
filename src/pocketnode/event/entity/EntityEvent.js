const Event = require("../Event");
const Entity = require("../../entity/Entity");

class EntityEvent extends Event{

    /** @var {Entity} */
    _entity;

    /**
     *
     * @return {Entity}
     */
    getEntity(){
        return this._entity;
    }

}