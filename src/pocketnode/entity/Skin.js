class Skin {

    initVars(){
        this._skinId = "";
        this._skinResourcePatch = "";
        this._skinData = "";
        this._animations = [];
        this._capeData = "";
        this._geometryData = "";
        this._animationData = "";
        this._premium = false;
        this._persona = false;
        this._capeOnClassic = false;
        this._capeId = "";


        this.ACCEPTED_SKIN_SIZES = [
            64 * 32 * 4,
            64 * 64 * 4,
            128 * 128 * 4
        ]
    }

    constructor(skinId, skinResourcePatch, skinData, animations = [], capeData, geometryName = "", geometryData = "", animationData = "", premium = false, persona = false, capeOnClassic = false, capeId = "") {
        this.initVars();
        this._skinId = skinId;
        this._skinData = skinData;
        this._animations = animations;
        this._capeData = capeData;
        this._geometryData = geometryData;
        this._animationData = animationData;
        this._premium = premium;
        this._persona = persona;
        this._capeOnClassic = capeOnClassic;
        this._capeId = capeId;
    }

    isValid(){
        try {
            this.validate();
            return true;
        }catch (e) {
            return false;
        }
    }

    static getAcceptedSkinSizes(){
        return self.ACCEPTED_SKIN_SIZES;
    }

    //todo: broadcast errors
    validate(){
        if (this._skinId === ""){
            // skin id must not be empty
        }
        //TODO
        /*let len = this._skinData.length;
        if (!this.ACCEPTED_SKIN_SIZES.includes(len)){
            console.log("Invalid skin data size len bytes");
        }
        if (this._capeData !== null && this._capeData.length !== 8192) {
            console.log("Invalid cape data size");
        }*/
        //TODO: validate geometry
    }

    getSkinId(){
        return this._skinId;
    }

    getSkinData(){
        return this._skinData;
    }

    getCapeData(){
        return this._capeData;
    }

    getSkinResourcePatch() {
        return this._skinResourcePatch;
    }

    getAnimations() {
        return this._animations;
    }

    getAnimationData() {
        return this._animationData;
    }

    getPremium() {
        return this._premium;
    }

    getCapeOnClassic() {
        return this._capeOnClassic;
    }

    getCapeId() {
        return this._capeId;
    }

    getFullSkinId() {
        return this._skinId + "_" + this._capeId;
    }

    getGeometryData(){
        return this._geometryData;
    }

    debloatGeometryData(){
        if (this._geometryData !== ""){
            this._geometryData = JSON.parse(JSON.stringify(this._geometryData));
        }
    }
}

module.exports = Skin;