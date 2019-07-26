const DataPacket = require("../protocol/DataPacket");
const MinecraftInfo = require("../Info");

const Logger = pocketnode("logger/Logger");

const BinaryStream = pocketnode("network/minecraft/NetworkBinaryStream");
const Utils = pocketnode("utils/Utils");

const Isset = pocketnode("utils/methods/Isset");

class LoginPacket extends DataPacket {
    static getId(){
        return MinecraftInfo.LOGIN_PACKET;
    }

    initVars(){
        /** @type {string} */
        this.username = "";
        /** @type {number} */
        this.protocol = 0;
        /** @type {string} */
        this.clientUUID = "";
        /** @type {number} */
        this.clientId = 0;
        /** @type {string} */
        this.xuid = "";
        /** @type {string} */
        this.identityPublicKey = "";
        /** @type {string} */
        this.serverAddress = "";
        /** @type {string} */
        this.locale = "";

        /** @type {Array} (the "chain" index contains one or more JWTs) */
        this.chainData = [];
        /** @type {string} */
        this.clientDataJwt = "";
        /** @type {string} decoded payload of the clientData JWT */
        this.clientData = [];

        /**
         * This field may be used by plugins to bypass keychain verification. It should only be used for plugins such as
         * Specter where passing verification would take too much time and not be worth it.
         *
         * @type {boolean}
         */
        this.skipVerification = false;
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

        try{
            this.decodeConnectionRequest();
        }catch (e) {
            
            if (this.protocol === MinecraftInfo.PROTOCOL) {
                console.log("LoginPacket => same protocol: [CLIENT: => " + this.protocol + " / SERVER => " + MinecraftInfo.PROTOCOL + " ]");
                throw e;
            }

            console.log(this.constructor.name + " was thrown while decoding connection request in login (protocol version " + (this.protocol) + "): ");
        }
    }

    decodeConnectionRequest(){
        let buffer = new BinaryStream(this.read(this.readUnsignedVarInt()));
        this.chainData = JSON.parse(buffer.read(buffer.readLInt()).toString());

        let hasExtraData = false;
        this.chainData["chain"].forEach(chain => {
            let webtoken = Utils.decodeJWT(chain);

            if(Isset(webtoken["extraData"])){

                if (hasExtraData){
                    // error to handle
                    console.log("Found 'extraData' multiple times in key chain");
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
            }

            if(Isset(webtoken["identityPublicKey"])){
                this.identityPublicKey = webtoken["identityPublicKey"];
            }

        });

        this.clientDataJwt = buffer.read(buffer.readLInt()).toString();
        this.clientData = Utils.decodeJWT(this.clientDataJwt);

        this.clientId = Isset(this.clientData["ClientRandomId"]) || null;
        this.serverAddress = Isset(this.clientData["ServerAddress"]) || null;

        this.locale = Isset(this.clientData["LanguageCode"] | null);
    }

    _encodePayload() {
        //TODO
    }

    handle(session){
        return session.handleLogin(this);
    }
}

module.exports = LoginPacket;