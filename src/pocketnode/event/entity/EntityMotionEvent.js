const Cancellable = pocketnode("event/Cancellable");
const Vector3 = pocketnode("math/Vector3");

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