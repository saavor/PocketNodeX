const DataPacket = pocketnode("network/minecraft/protocol/DataPacket");
const EntityIds = pocketnode("entity/EntityIds");
const MinecraftInfo = pocketnode("network/minecraft/Info");
const Vector3 = pocketnode("math/Vector3");
const Attribute = pocketnode("entity/Attribute");

const LEGACY_ID_MAP_BC = [

    EntityIds.NPC = "minecraft:npc",
    EntityIds.PLAYER = "minecraft:player",
    EntityIds.WITHER_SKELETON = "minecraft:wither_skeleton",
    EntityIds.HUSK = "minecraft:husk",
    EntityIds.STRAY = "minecraft:stray",
    EntityIds.WITCH = "minecraft:witch",
    EntityIds.ZOMBIE_VILLAGER = "minecraft:zombie_villager",
    EntityIds.BLAZE = "minecraft:blaze",
    EntityIds.MAGMA_CUBE = "minecraft:magma_cube",
    EntityIds.GHAST = "minecraft:ghast",
    EntityIds.CAVE_SPIDER = "minecraft:cave_spider",
    EntityIds.SILVERFISH = "minecraft:silverfish",
    EntityIds.ENDERMAN = "minecraft:enderman",
    EntityIds.SLIME = "minecraft:slime",
    EntityIds.ZOMBIE_PIGMAN = "minecraft:zombie_pigman",
    EntityIds.SPIDER = "minecraft:spider",
    EntityIds.SKELETON = "minecraft:skeleton",
    EntityIds.CREEPER = "minecraft:creeper",
    EntityIds.ZOMBIE = "minecraft:zombie",
    EntityIds.SKELETON_HORSE = "minecraft:skeleton_horse",
    EntityIds.MULE = "minecraft:mule",
    EntityIds.DONKEY = "minecraft:donkey",
    EntityIds.DOLPHIN = "minecraft:dolphin",
    EntityIds.TROPICALFISH = "minecraft:tropicalfish",
    EntityIds.WOLF = "minecraft:wolf",
    EntityIds.SQUID = "minecraft:squid",
    EntityIds.DROWNED = "minecraft:drowned",
    EntityIds.SHEEP = "minecraft:sheep",
    EntityIds.MOOSHROOM = "minecraft:mooshroom",
    EntityIds.PANDA = "minecraft:panda",
    EntityIds.SALMON = "minecraft:salmon",
    EntityIds.PIG = "minecraft:pig",
    EntityIds.VILLAGER = "minecraft:villager",
    EntityIds.COD = "minecraft:cod",
    EntityIds.PUFFERFISH = "minecraft:pufferfish",
    EntityIds.COW = "minecraft:cow",
    EntityIds.CHICKEN = "minecraft:chicken",
    EntityIds.BALLOON = "minecraft:balloon",
    EntityIds.LLAMA = "minecraft:llama",
    EntityIds.IRON_GOLEM = "minecraft:iron_golem",
    EntityIds.RABBIT = "minecraft:rabbit",
    EntityIds.SNOW_GOLEM = "minecraft:snow_golem",
    EntityIds.BAT = "minecraft:bat",
    EntityIds.OCELOT = "minecraft:ocelot",
    EntityIds.HORSE = "minecraft:horse",
    EntityIds.CAT = "minecraft:cat",
    EntityIds.POLAR_BEAR = "minecraft:polar_bear",
    EntityIds.ZOMBIE_HORSE = "minecraft:zombie_horse",
    EntityIds.TURTLE = "minecraft:turtle",
    EntityIds.PARROT = "minecraft:parrot",
    EntityIds.GUARDIAN = "minecraft:guardian",
    EntityIds.ELDER_GUARDIAN = "minecraft:elder_guardian",
    EntityIds.VINDICATOR = "minecraft:vindicator",
    EntityIds.WITHER = "minecraft:wither",
    EntityIds.ENDER_DRAGON = "minecraft:ender_dragon",
    EntityIds.SHULKER = "minecraft:shulker",
    EntityIds.ENDERMITE = "minecraft:endermite",
    EntityIds.MINECART = "minecraft:minecart",
    EntityIds.HOPPER_MINECART = "minecraft:hopper_minecart",
    EntityIds.TNT_MINECART = "minecraft:tnt_minecart",
    EntityIds.CHEST_MINECART = "minecraft:chest_minecart",
    EntityIds.COMMAND_BLOCK_MINECART = "minecraft:command_block_minecart",
    EntityIds.ARMOR_STAND = "minecraft:armor_stand",
    EntityIds.ITEM = "minecraft:item",
    EntityIds.TNT = "minecraft:tnt",
    EntityIds.FALLING_BLOCK = "minecraft:falling_block",
    EntityIds.XP_BOTTLE = "minecraft:xp_bottle",
    EntityIds.XP_ORB = "minecraft:xp_orb",
    EntityIds.EYE_OF_ENDER_SIGNAL = "minecraft:eye_of_ender_signal",
    EntityIds.ENDER_CRYSTAL = "minecraft:ender_crystal",
    EntityIds.SHULKER_BULLET = "minecraft:shulker_bullet",
    EntityIds.FISHING_HOOK = "minecraft:fishing_hook",
    EntityIds.DRAGON_FIREBALL = "minecraft:dragon_fireball",
    EntityIds.ARROW = "minecraft:arrow",
    EntityIds.SNOWBALL = "minecraft:snowball",
    EntityIds.EGG = "minecraft:egg",
    EntityIds.PAINTING = "minecraft:painting",
    EntityIds.THROWN_TRIDENT = "minecraft:thrown_trident",
    EntityIds.FIREBALL = "minecraft:fireball",
    EntityIds.SPLASH_POTION = "minecraft:splash_potion",
    EntityIds.ENDER_PEARL = "minecraft:ender_pearl",
    EntityIds.LEASH_KNOT = "minecraft:leash_knot",
    EntityIds.WITHER_SKULL = "minecraft:wither_skull",
    EntityIds.WITHER_SKULL_DANGEROUS = "minecraft:wither_skull_dangerous",
    EntityIds.BOAT = "minecraft:boat",
    EntityIds.LIGHTNING_BOLT = "minecraft:lightning_bolt",
    EntityIds.SMALL_FIREBALL = "minecraft:small_fireball",
    EntityIds.LLAMA_SPIT = "minecraft:llama_spit",
    EntityIds.AREA_EFFECT_CLOUD = "minecraft:area_effect_cloud",
    EntityIds.LINGERING_POTION = "minecraft:lingering_potion",
    EntityIds.FIREWORKS_ROCKET = "minecraft:fireworks_rocket",
    EntityIds.EVOCATION_FANG = "minecraft:evocation_fang",
    EntityIds.EVOCATION_ILLAGER = "minecraft:evocation_illager",
    EntityIds.VEX = "minecraft:vex",
    EntityIds.AGENT = "minecraft:agent",
    EntityIds.ICE_BOMB = "minecraft:ice_bomb",
    EntityIds.PHANTOM = "minecraft:phantom",
    EntityIds.TRIPOD_CAMERA = "minecraft:tripod_camera"
];

class AddEntityPacket extends DataPacket{

    getId() {
        return MinecraftInfo.ADD_ENTITY_PACKET;
    }

    initVars(){
        this.entityUniqueId = null; //TODO
        this.entityRuntimeId = null;
        this.type = null;
        this.position = new Vector3();
        this.motion = null;
        this.pitch = 0.0;
        this.yaw = 0.0;
        this.headYaw = 0.0;

        this.attributes = [];
        this.metadata = [];
        this.links = [];
    }

    constructor(){
        super();
        this.initVars();
    }

    _decodePayload() {
        this.entityRuntimeId = this.getEntityUniqueId();
        this.entityRuntimeId = this.getEntityRuntimeId();
        let t;
        this.type = self.LEGACY_ID_MAP_BC.includes(t = this.getString());
        if (this.type){
            console.log(`Can't map ID ${t} to legacy ID`);
        }
        this.position = this.getVector3Obj();
        this.motion = this.getVector3Obj();
        this.pitch = this.readLFloat();
        this.yaw = this.readLFloat();
        this.headYaw = this.readLFloat();

        let attrCount = this.readUnsignedVarInt();
        for (let i = 0; i < attrCount; ++i ){
            let name = this.readString();
            let min = this.readLFloat();
            let current = this.readLFloat();
            let max = this.readLFloat();
            let attr = Attribute.getAttributeByName(name);

            if (attr !== null){
                attr.setMinValue(min);
                attr.setMaxValue(max);
                attr.setValue(current);
                this.attributes.push(attr);
            }else{
                console.log(`Unknown attribute type "${name}"`);
            }

            this.metadata = this.readEntityMetadata();
            let linkCount = this.readUnsignedVarInt();
            for (let i = 0; i < linkCount; ++i){
                this.links.push(this.readEntityLink());
            }
        }
    }
}