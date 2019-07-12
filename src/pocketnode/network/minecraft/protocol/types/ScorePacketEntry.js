class ScorePacketEntry {

	constructor(){
		this.initVars();
	}

	static TYPE_PLAYER(){
		return 1;
	}

	static TYPE_ENTITY(){
		return 2;
	}

	static TYPE_FAKE_PLAYER(){
		return 3;
	}

	initVars(){
		this.scoreboardId = 0;
		this.objectiveName = "";
		this.score = 0;

		this.type = 0;

		this.entityUniqueId = null;
		this.customName = null;
	}
}

module.exports = ScorePacketEntry;