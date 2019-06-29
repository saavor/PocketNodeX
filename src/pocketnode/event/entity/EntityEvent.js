const Event = pocketnode("event/Event");
const Entity = pocketnode("entity/Entity");

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