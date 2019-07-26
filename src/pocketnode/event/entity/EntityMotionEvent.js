const Cancellable = require("../../event/Cancellable");
const Vector3 = require("../../math/Vector3");
const EntityEvent = require("./EntityEvent");

class EntityMotionEvent extends EntityEvent implements Cancellable{

    /** @var {Vector3} */
    _mot;

    constructor(entity, mot){
        super();
        if (CheckTypes([Entity, entity], [Vector3, mot])){

            this._entity = entity;
            this._mot = mot;
        }
    }

    /**
     * @return {Vector3}
     */
    getVector(){
        return this._mot;
    }
}