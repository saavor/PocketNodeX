
class SkinAnimation {

    initVars() {
        this._image = null;
        this._type = -1;
        this._frames = 0.0;
    }

    constructor(image, type, frames) {
        this._image = image;
        this._type = type;
        this._frames = frames;
    }

    getImage() {
        return this._image;
    }

    getType() {
        return this._type;
    }

    getFrames() {
        return this._frames;
    }
}

module.exports = SkinAnimation;