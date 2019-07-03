const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const MinecraftInfo = pocketnode("network/minecraft/Info");

class AdventureSettingsPacket extends DataPacket {
    static getId() {
        return MinecraftInfo.ADVENTURE_SETTINGS_PACKET;
    }

    static get PERMISSION_NORMAL() {return 0};
    static get PERMISSION_OPERATOR() {return 1};
    static get PERMISSION_HOST() {return 2};
    static get PERMISSION_AUTOMATION() {return 3};
    static get PERMISSION_ADMIN() {return 4};

    /**
     * This constant is used to identify flags that should be set on the second field. In a sensible world, these
     * flags would all be set on the same packet field, but as of MCPE 1.2, the new abilities flags have for some
     * reason been assigned a separate field.
     */
    static get BITFLAG_SECOND_SET() {return 1 << 16};

    static get WORLD_IMMUTABLE() {return 0x01};
    static get NO_PVP() {return 0x02};

    static get AUTO_JUMP() {return 0x20};
    static get ALLOW_FLIGHT() {return 0x40};
    static get NO_CLIP() {return 0x80};
    static get WORLD_BUILDER() {return 0x100};
    static get FLYING() {return 0x200};
    static get MUTED() {return 0x400};

    static get BUILD_AND_MINE() {return 0x01 | this.BITFLAG_SECOND_SET};
    static get DOORS_AND_SWITCHES() {return 0x02 | this.BITFLAG_SECOND_SET};
    static get OPEN_CONTAINERS() {return 0x04 | this.BITFLAG_SECOND_SET};
    static get ATTACK_PLAYERS() {return 0x08 | this.BITFLAG_SECOND_SET};
    static get ATTACK_MOBS() {return 0x10 | this.BITFLAG_SECOND_SET};
    static get OPERATOR() {return 0x20 | this.BITFLAG_SECOND_SET};
    static get TELEPORT() {return 0x80 | this.BITFLAG_SECOND_SET};


    initVars(){
        this.flags = 0;
        this.commandPermission = AdventureSettingsPacket.PERMISSION_NORMAL;
        this.flags2 = -1;
        this.playerPermission = 0; //TODO: PlayerPermission class on /types/
        this.customFlags = 0;
        this.entityUniqueId = -1;
    }

    constructor() {
        super();
        this.initVars();
    }

    _decodePayload() {
        this.flags = this.readUnsignedVarInt();
        this.commandPermission = this.readUnsignedVarInt();
    }

}
module.exports = AdventureSettingsPacket;