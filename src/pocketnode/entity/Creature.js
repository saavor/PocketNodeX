const Living = pocketnode("entity/Living");

class Creature extends Living{

    recalculateBoundingBox() {
        super.recalculateBoundingBox();
    }
}

module.exports = Creature;