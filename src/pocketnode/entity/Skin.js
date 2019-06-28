class Skin {
    initVars(){
        this._skinId = "";
        this._skinData = "";
        this._capeData = "";
        this._geometryName = "";
        this._geometryData = "";

        this.ACCEPTED_SKIN_SIZES = [
            64 * 32 * 4,
            64 * 64 * 4,
            128 * 128 * 4
        ]
    }

    constructor(skinId, skinData, capeData = "", geometryName = "", geometryData = ""){
        this.initVars();
        this._skinId = skinId;
        this._skinData = skinData;
        this._capeData = capeData;
        this._geometryName = geometryName;
        this._geometryData = geometryData;
    }

    isValid(){
        try {
            this.validate();
            return true;
        }catch (e) {
            return false;
        }
    }

    //todo: broadcast errors
    validate(){
        if (this._skinId === ""){
            // skin id must not be empty
        }

        let len = this._skinData.length;
        if (!this.ACCEPTED_SKIN_SIZES.includes(len)){
            //Invalid skin data size len bytes
        }

        if (this._capeData !== null && this._capeData.length !== 8192) {
            //Invalid cape data size
        }

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

    getGeometryName(){
        return this._geometryName;
    }

    getGeometryData(){
        return this._geometryData;
    }
}

module.exports = Skin;