const UnconnectedPing = require("../protocol/UnconnectedPing");
const UnconnectedPingOpenConnections = require("../protocol/UnconnectedPingOpenConnections");
const OpenConnectionRequest1 = require("../protocol/OpenConnectionRequest1");
const OpenConnectionReply1 = require("../protocol/OpenConnectionReply1");
const OpenConnectionRequest2 = require("../protocol/OpenConnectionRequest2");
const OpenConnectionReply2 = require("../protocol/OpenConnectionReply2");
const UnconnectedPong = require("../protocol/UnconnectedPong");
//const NACK = require("../protocol/NACK");
//const ACK = require("../protocol/ACK");

class PacketPool extends Map {
    constructor(){
        super();
        this.registerPackets();
    }

    registerPacket(packet){
        this.set(packet.getId(), packet);
    }

    getPacket(id){
        return this.has(id) ? this.get(id) : null;
    }

    registerPackets(){
        this.registerPacket(UnconnectedPing);
        this.registerPacket(UnconnectedPingOpenConnections);
        this.registerPacket(OpenConnectionRequest1);
        //this.registerPacket(OpenConnectionReply1);
        this.registerPacket(OpenConnectionRequest2);
        //this.registerPacket(OpenConnectionReply2);
        //this.registerPacket(UnconnectedPong);
        //this.registerPacket(NACK);
        //this.registerPacket(ACK);
    }
}

module.exports = PacketPool;