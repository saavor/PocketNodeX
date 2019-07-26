const DataPacket = require("./DataPacket");
const ProtocolInfo = require("../Info");

const BinaryStream = require("../NetworkBinaryStream");

const Logger = require("../../../logger/Logger");

const Utils = require("../../../utils/Utils");
const Isset = require("../../../utils/methods/Isset");

class LoginPacket extends DataPacket {
    static getId(){
        return ProtocolInfo.LOGIN_PACKET;
    }

    initVars(){
        this.username = "";
        this.protocol = 0;
        this.clientUUID = "";
        this.clientId = 0;
        this.xuid = "";
        this.identityPublicKey = "";
        this.serverAddress = "";
        this.locale = "";
        this.skipVerification = false;

        this.chainData = [];
        this.clientDataJwt = "";
        this.clientData = [];
    }

    constructor(){
        super();
        this.initVars();
    }

    canBeSentBeforeLogin(){
        return true;
    }

    mayHaveUnreadBytes(){
        return this.protocol !== null && this.protocol !== MinecraftInfo.PROTOCOL;
    }

    _decodePayload(){

        this.protocol = this.readInt();

        console.log("LoginPacket => decode payload");
        console.log("Protocol => " + this.protocol);

        this.decodeConnectionRequest();

        /*try{
            this.decodeConnectionRequest();
            console.log("LoginPacket => decodeConnectionRequest()");
        }catch (e) {

            console.log("LoginPacket => catch exception");
            
            if (this.protocol === MinecraftInfo.PROTOCOL) {
                //throw e;
                console.log("LoginPacket => same protocol: [CLIENT: => " + this.protocol + " / SERVER => " + MinecraftInfo.PROTOCOL + " ]");
            }

            console.log(this.constructor.name + " was thrown while decoding connection request in login (protocol version " + (this.protocol) + "): "/*print stack trace);
        }*/

    }

    decodeConnectionRequest(){
        let buffer = new BinaryStream(this.read(this.readUnsignedVarInt()));
        this.chainData = JSON.parse(buffer.read(buffer.readLInt()).toString());

        console.log("LoginPacket => chain data found");

        let hasExtraData = false;
        this.chainData["chain"].forEach(chain => {
            let webtoken = Utils.decodeJWT(chain);

            if(Isset(webtoken["extraData"])){

                if (hasExtraData){
                    // error to handle
                    this.console.info("Found 'extraData' multiple times in key chain");
                }

                hasExtraData = true;

                if(Isset(webtoken["extraData"]["displayName"])){
                    this.username = webtoken["extraData"]["displayName"];
                }
                if(Isset(webtoken["extraData"]["identity"])){
                    this.clientUUID = webtoken["extraData"]["identity"];
                }
                if(Isset(webtoken["extraData"]["XUID"])){
                    this.xuid = webtoken["extraData"]["XUID"];
                }

                console.log(JSON.stringify(webtoken["extraData"]));
            }

            if(Isset(webtoken["identityPublicKey"])){
                this.identityPublicKey = webtoken["identityPublicKey"];
            }

        });

        this.clientDataJwt = buffer.read(buffer.readLInt()).toString();
        this.clientData = Utils.decodeJWT(this.clientDataJwt);

        this.clientId = Isset(this.clientData["ClientRandomId"]) ? this.clientData["ClientRandomId"] : null;
        this.serverAddress = Isset(this.clientData["ServerAddress"]) ? this.clientData["ServerAddress"] : null;

        this.locale = Isset(this.clientData["LanguageCode"] ? this.clientData["LanguageCode"] : null);
    }

    _encodePayload() {
        //TODO
    }

    handle(session){
        return session.handleLogin(this);
    }
}

module.exports = LoginPacket;