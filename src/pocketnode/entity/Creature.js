const Living = require("./Living");

class Creature extends Living{

    recalculateBoundingBox() {
        super.recalculateBoundingBox();
    }
}

module.exports = Creature;