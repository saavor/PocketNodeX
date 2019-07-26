const Path = require("path");

require("./utils/methods/Globals");

const Logger = pocketnode("logger/Logger");
const Server = pocketnode("Server");
const INT32_MIN = -0x80000000;
const INT32_MAX = 0x7fffffff;

function PocketNode(paths){
    this.START_TIME = Date.now();
    this.NAME = "PocketNodeX";
    this.CODENAME = "[ALPHA]";
    this.VERSION = "0.0.1";
    this.API_VERSION = "1.0.0";

    let logger = new Logger("Server");
    let path = {
        file: Path.normalize(__dirname + "/../"),
        data: Path.normalize(__dirname + "/../../"),
        plugins: Path.normalize(__dirname + "/../../plugins/")
    };

    for(let i in paths) if(typeof path[i] !== "undefined") path[i] = paths[i];

    /*for (let i in path){
        if (path.hasOwnProperty(i)) {
            if (typeof path[i] !== "undefined"){
                path[i] = paths[i];
            }
        }
    }*/

    logger.info("Loading PocketNodeX...");

    let server = new Server(this, logger, path);

    if(TRAVIS_BUILD === true){
        server.shutdown();
    }

    return server;
}

module.exports = PocketNode;
