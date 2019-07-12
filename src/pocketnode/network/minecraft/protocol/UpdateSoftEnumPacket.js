const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class UpdateSoftEnumPacket extends DataPacket {

	constructor(){
		super();
		this.initVars();
	}

	static getId(){
		return MinecraftInfo.UPDATE_SOFT_ENUM_PACKET;
	}

	initVars(){
		this.enumName = "";
		this.values = [];
		this.type = 0;
	}

	_decodePayload(){
		this.enumName = this.readString();
		let count = this.readUnsignedVarInt();
		for(let i = 0; i < count; i++){
			this.values.push(this.readString());
		}
		this.type = this.readByte();
	}

	_encodePayload(){
		this.writeString(this.enumName);
		this.writeUnsignedVarInt(this.values.length);
		this.values.forEach(value => {
			this.writeString(value);
		});
		this.writeByte(this.type);
	}

	handle(session){
		return false;
	}
}

module.exports = UpdateSoftEnumPacket;