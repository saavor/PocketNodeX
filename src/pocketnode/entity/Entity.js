const assert = require('assert');

const Isset = pocketnode("utils/methods/Isset");

const AxisAlignedBB = pocketnode("math/AxisAlignedBB");
const Vector3 = pocketnode("math/Vector3");

const EventManager = pocketnode("event/EventManager");

const ListTag = pocketnode("nbt/tag/ListTag");
const CompoundTag = pocketnode("nbt/tag/CompoundTag");

const Level = pocketnode("level/Level");
const Location = pocketnode("level/Location");

const Attribute = pocketnode("entity/Attribute");

class Entity extends Location {

    static getId(){
        return -1;
    }

    static get MOTION_THRESHOLD() {return 0.00001};

    static get DATA_TYPE_BYTE() {return 0};
    static get DATA_TYPE_SHORT() {return 1};
    static get DATA_TYPE_INT() {return 2};
    static get DATA_TYPE_FLOAT() {return 3};
    static get DATA_TYPE_STRING() {return 4};
    static get DATA_TYPE_SLOT() {return 5};
    static get DATA_TYPE_POS() {return 6};
    static get DATA_TYPE_LONG() {return 7};
    static get DATA_TYPE_VECTOR3F() {return 8};

    /*
     * Readers beware: this isn't a nice list. Some of the properties have different types for different entities, and
    * are used for entirely different things.
    */
    static get DATA_FLAGS() {return 0};
    static get DATA_HEALTH() {return 1}; //int (minecart/boat)
    static get DATA_VARIANT() {return 2}; //int
    static get DATA_COLOR() {return 3};
    static get DATA_COLOUR() {return 3}; //byte
    static get DATA_NAMETAG() {return 4}; //string
    static get DATA_OWNER_EID() {return 5}; //long
    static get DATA_TARGET_EID() {return 6}; //long
    static get DATA_AIR() {return 7}; //short
    static get DATA_POTION_COLOR() {return 8}; //int (ARGB!)
    static get DATA_POTION_AMBIENT() {return 9}; //byte
    /* 10 (byte) */
    static get DATA_HURT_TIME() {return 11}; //int (minecart/boat)
    static get DATA_HURT_DIRECTION() {return 12}; //int (minecart/boat)
    static get DATA_PADDLE_TIME_LEFT() {return 13}; //float
    static get DATA_PADDLE_TIME_RIGHT() {return 14}; //float
    static get DATA_EXPERIENCE_VALUE() {return 15}; //int (xp orb)
    static get DATA_MINECART_DISPLAY_BLOCK() {return 16}; //int (id | (data << 16))
    static get DATA_HORSE_FLAGS() {return 16}; //int
    /* 16 (byte) used by wither skull */
    static get DATA_MINECART_DISPLAY_OFFSET() {return 17}; //int
    static get DATA_SHOOTER_ID() {return 17}; //long (used by arrows)
    static get DATA_MINECART_HAS_DISPLAY() {return 18}; //byte (must be 1 for minecart to show block inside)
    static get DATA_HORSE_TYPE() {return 19}; //byte
    /* 20 (unknown)
     * 21 (unknown) */
    static get DATA_CHARGE_AMOUNT() {return 22}; //int8, used for ghasts and also crossbow charging
    static get DATA_ENDERMAN_HELD_ITEM_ID() {return 23}; //short
    static get DATA_ENTITY_AGE() {return 24}; //short
    /* 25 (int) used by horse, (byte) used by witch */
    static get DATA_PLAYER_FLAGS() {return 26}; //byte
    static get DATA_PLAYER_INDEX() {return 27}; //int, used for marker colours and agent nametag colours
    static get DATA_PLAYER_BED_POSITION() {return 28}; //blockpos
    static get DATA_FIREBALL_POWER_X() {return 29}; //float
    static get DATA_FIREBALL_POWER_Y() {return 30};
    static get DATA_FIREBALL_POWER_Z() {return 31};
    /* 32 (unknown)
     * 33 (float) fishing bobber
     * 34 (float) fishing bobber
     * 35 (float) fishing bobber */
    static get DATA_POTION_AUX_VALUE() {return 36}; //short
    static get DATA_LEAD_HOLDER_EID() {return 37}; //long
    static get DATA_SCALE() {return 38}; //float
    static get DATA_HAS_NPC_COMPONENT() {return 39}; //byte (???)
    static get DATA_SKIN_ID() {return 40}; //string
    static get DATA_NPC_SKIN_ID() {return 41}; //string
    static get DATA_URL_TAG() {return 42}; //string
    static get DATA_MAX_AIR() {return 43}; //short
    static get DATA_MARK_VARIANT() {return 44}; //int
    static get DATA_CONTAINER_TYPE() {return 45}; //byte (ContainerComponent)
    static get DATA_CONTAINER_BASE_SIZE() {return 46}; //int (ContainerComponent)
    static get DATA_CONTAINER_EXTRA_SLOTS_PER_STRENGTH() {return 47}; //int (used for llamas, inventory size is baseSize + thisProp * strength)
    static get DATA_BLOCK_TARGET() {return 48}; //block coords (ender crystal)
    static get DATA_WITHER_INVULNERABLE_TICKS() {return 49}; //int
    static get DATA_WITHER_TARGET_1() {return 50}; //long
    static get DATA_WITHER_TARGET_2() {return 51}; //long
    static get DATA_WITHER_TARGET_3() {return 52}; //long
    /* 53 (short) */
    static get DATA_BOUNDING_BOX_WIDTH() {return 54}; //float
    static get DATA_BOUNDING_BOX_HEIGHT() {return 55}; //float
    static get DATA_FUSE_LENGTH() {return 56}; //int
    static get DATA_RIDER_SEAT_POSITION() {return 57}; //vector3f
    static get DATA_RIDER_ROTATION_LOCKED() {return 58}; //byte
    static get DATA_RIDER_MAX_ROTATION() {return 59}; //float
    static get DATA_RIDER_MIN_ROTATION() {return 60}; //float
    static get DATA_AREA_EFFECT_CLOUD_RADIUS() {return 61}; //float
    static get DATA_AREA_EFFECT_CLOUD_WAITING() {return 62}; //int
    static get DATA_AREA_EFFECT_CLOUD_PARTICLE_ID() {return 63}; //int
    /* 64 (int) shulker-related */
    static get DATA_SHULKER_ATTACH_FACE() {return 65}; //byte
    /* 66 (short) shulker-related */
    static get DATA_SHULKER_ATTACH_POS() {return 67}; //block coords
    static get DATA_TRADING_PLAYER_EID() {return 68}; //long

    /* 70 (byte) command-block */
    static get DATA_COMMAND_BLOCK_COMMAND() {return 71}; //string
    static get DATA_COMMAND_BLOCK_LAST_OUTPUT() {return 72}; //string
    static get DATA_COMMAND_BLOCK_TRACK_OUTPUT() {return 73}; //byte
    static get DATA_CONTROLLING_RIDER_SEAT_NUMBER() {return 74}; //byte
    static get DATA_STRENGTH() {return 75}; //int
    static get DATA_MAX_STRENGTH() {return 76}; //int
    /* 77 (int) */
    static get DATA_LIMITED_LIFE() {return 78};
    static get DATA_ARMOR_STAND_POSE_INDEX() {return 79}; //int
    static get DATA_ENDER_CRYSTAL_TIME_OFFSET() {return 80}; //int
    static get DATA_ALWAYS_SHOW_NAMETAG() {return 81}; //byte: -1() {return default, 0() {return only when looked at, 1() {return always
    static get DATA_COLOR_2() {return 82}; //byte
    /* 83 (unknown) */
    static get DATA_SCORE_TAG() {return 84}; //string
    static get DATA_BALLOON_ATTACHED_ENTITY() {return 85}; //int64, entity unique ID of owner
    static get DATA_PUFFERFISH_SIZE() {return 86}; //byte
    static get DATA_BOAT_BUBBLE_TIME() {return 87}; //int (time in bubble column)
    static get DATA_PLAYER_AGENT_EID() {return 88}; //long
    /* 89 (float) related to panda sitting
     * 90 (float) related to panda sitting */
    static get DATA_EAT_COUNTER() {return 91}; //int (used by pandas)
    static get DATA_FLAGS2() {return 92}; //long (extended data flags)
    /* 93 (float) related to panda lying down
     * 94 (float) related to panda lying down */
    static get DATA_AREA_EFFECT_CLOUD_DURATION() {return 95}; //int
    static get DATA_AREA_EFFECT_CLOUD_SPAWN_TIME() {return 96}; //int
    static get DATA_AREA_EFFECT_CLOUD_RADIUS_PER_TICK() {return 97}; //float, usually negative
    static get DATA_AREA_EFFECT_CLOUD_RADIUS_CHANGE_ON_PICKUP() {return 98}; //float
    static get DATA_AREA_EFFECT_CLOUD_PICKUP_COUNT() {return 99}; //int
    static get DATA_INTERACTIVE_TAG() {return 100}; //string (button text)
    static get DATA_TRADE_TIER() {return 101}; //int
    static get DATA_MAX_TRADE_TIER() {return 102}; //int
    static get DATA_TRADE_XP() {return 103}; //int

    static get DATA_FLAG_ONFIRE() {return 0};
    static get DATA_FLAG_SNEAKING() {return 1};
    static get DATA_FLAG_RIDING() {return 2};
    static get DATA_FLAG_SPRINTING() {return 3};
    static get DATA_FLAG_ACTION() {return 4};
    static get DATA_FLAG_INVISIBLE() {return 5};
    static get DATA_FLAG_TEMPTED() {return 6};
    static get DATA_FLAG_INLOVE() {return 7};
    static get DATA_FLAG_SADDLED() {return 8};
    static get DATA_FLAG_POWERED() {return 9};
    static get DATA_FLAG_IGNITED() {return 10};
    static get DATA_FLAG_BABY() {return 11};
    static get DATA_FLAG_CONVERTING() {return 12};
    static get DATA_FLAG_CRITICAL() {return 13};
    static get DATA_FLAG_CAN_SHOW_NAMETAG() {return 14};
    static get DATA_FLAG_ALWAYS_SHOW_NAMETAG() {return 15};

    static get DATA_FLAG_IMMOBILE() {return 16}
    static get DATA_FLAG_NO_AI() {return 16};

    static get DATA_FLAG_SILENT() {return 17};
    static get DATA_FLAG_WALLCLIMBING() {return 18};
    static get DATA_FLAG_CAN_CLIMB() {return 19};
    static get DATA_FLAG_SWIMMER() {return 20};
    static get DATA_FLAG_CAN_FLY() {return 21};
    static get DATA_FLAG_WALKER() {return 22};
    static get DATA_FLAG_RESTING() {return 23};
    static get DATA_FLAG_SITTING() {return 24};
    static get DATA_FLAG_ANGRY() {return 25};
    static get DATA_FLAG_INTERESTED() {return 26};
    static get DATA_FLAG_CHARGED() {return 27};
    static get DATA_FLAG_TAMED() {return 28};
    static get DATA_FLAG_ORPHANED() {return 29};
    static get DATA_FLAG_LEASHED() {return 30};
    static get DATA_FLAG_SHEARED() {return 31};
    static get DATA_FLAG_GLIDING() {return 32};
    static get DATA_FLAG_ELDER() {return 33};
    static get DATA_FLAG_MOVING() {return 34};
    static get DATA_FLAG_BREATHING() {return 35};
    static get DATA_FLAG_CHESTED() {return 36};
    static get DATA_FLAG_STACKABLE() {return 37};
    static get DATA_FLAG_SHOWBASE() {return 38};
    static get DATA_FLAG_REARING() {return 39};
    static get DATA_FLAG_VIBRATING() {return 40};
    static get DATA_FLAG_IDLING() {return 41};
    static get DATA_FLAG_EVOKER_SPELL() {return 42};
    static get DATA_FLAG_CHARGE_ATTACK() {return 43};
    static get DATA_FLAG_WASD_CONTROLLED() {return 44};
    static get DATA_FLAG_CAN_POWER_JUMP() {return 45};
    static get DATA_FLAG_LINGER() {return 46};
    static get DATA_FLAG_HAS_COLLISION() {return 47};
    static get DATA_FLAG_AFFECTED_BY_GRAVITY() {return 48};
    static get DATA_FLAG_FIRE_IMMUNE() {return 49};
    static get DATA_FLAG_DANCING() {return 50};
    static get DATA_FLAG_ENCHANTED() {return 51};
    static get DATA_FLAG_SHOW_TRIDENT_ROPE() {return 52}; // tridents show an animated rope when enchanted with loyalty after they are thrown and return to their owner. To be combined with DATA_OWNER_EID
    static get DATA_FLAG_CONTAINER_PRIVATE() {return 53}; //inventory is private, doesn't drop contents when killed if true
    static get DATA_FLAG_TRANSFORMING() {return 54};
    static get DATA_FLAG_SPIN_ATTACK() {return 55};
    static get DATA_FLAG_SWIMMING() {return 56};
    static get DATA_FLAG_BRIBED() {return 57}; //dolphins have this set when they go to find treasure for the player
    static get DATA_FLAG_PREGNANT() {return 58};
    static get DATA_FLAG_LAYING_EGG() {return 59};
    static get DATA_FLAG_RIDER_CAN_PICK() {return 60}; //???
    static get DATA_FLAG_TRANSITION_SITTING() {return 61};
    static get DATA_FLAG_EATING() {return 62};
    static get DATA_FLAG_LAYING_DOWN() {return 63};
    static get DATA_FLAG_SNEEZING() {return 64};
    static get DATA_FLAG_TRUSTING() {return 65};
    static get DATA_FLAG_ROLLING() {return 66};
    static get DATA_FLAG_SCARED() {return 67};
    static get DATA_FLAG_IN_SCAFFOLDING() {return 68};
    static get DATA_FLAG_OVER_SCAFFOLDING() {return 69};
    static get DATA_FLAG_FALL_THROUGH_SCAFFOLDING() {return 70};
    static get DATA_FLAG_BLOCKING() {return 71}; //shield
    static get DATA_FLAG_DISABLE_BLOCKING() {return 72};
    //73 is set when a player is attacked while using shield, unclear on purpose
    //74 related to shield usage, needs further investigation
    static get DATA_FLAG_SLEEPING() {return 75};
    //76 related to sleeping, unclear usage
    static get DATA_FLAG_TRADE_INTEREST() {return 77};
    static get DATA_FLAG_DOOR_BREAKER() {return 78}; //...
    static get DATA_FLAG_BREAKING_OBSTRUCTION() {return 79};
    static get DATA_FLAG_DOOR_OPENER() {return 80}; //...
    static get DATA_FLAG_ILLAGER_CAPTAIN() {return 81};
    static get DATA_FLAG_STUNNED() {return 82};
    static get DATA_FLAG_ROARING() {return 83};
    static get DATA_FLAG_DELAYED_ATTACKING() {return 84};
    static get DATA_FLAG_AVOIDING_MOBS() {return 85};
    //86 used by RangedAttackGoal
    //87 used by NearestAttackableTargetGoal

    static get DATA_PLAYER_FLAG_SLEEP() {return 1};
    static get DATA_PLAYER_FLAG_DEAD() {return 2}; //TODO: CHECK

    static initVars(){
        this._entityCount = 1;
        this._knownEntities = [];
        this._saveNames = [];

        this._hasSpawned = [];

        this._id = -1;

        this._propertyManager = null;

        this.chunk = null;

        this._lastDamageCause = null;

        this._blocksAround = [];

        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        this._motion = null;
        this._lastMotion = null;
        this._forceMovementUpdate = false;

        this.temporalVector = null;

        this.lastYaw = 0.0;
        this.lastPitch = 0.0;

        this.boundingBox = null;
        this.onGround = false;

        this.eyeHeight = null;

        this.height = 4.0;
        this.width = 0.0;

        this._baseOffset = 0.0;

        this._health = 20.0;
        this._maxHealth = 20;

        this._ySize = 0.0;
        this._stepHeight = 0.0;
        this.keepMovement = false;

        this.fallDistance = 0.0;
        this.ticksLived = 0;
        this.lastUpdate = -1;
        this._fireTicks = 0;
        this.namedtag = new CompoundTag();
        this.canCollide = true;

        this._isStatic = false;

        this._savedWithChunks = true;

        this.isCollided = false;
        this.isCollidedHorizontally = false;
        this.isCollidedVertically = false;

        this.noDamageTicks = 0;
        this._justCreated = true;
        this._invulnerable = false;

        this._attributeMap = null;

        this._gravity = 0.0;
        this._drag = null; //float

        this._server = null;

        this._closed = false;
        this._needsDespawn = false;

        this._timings = null;

        this._constructed = false;

        this._closeInFlight = false;
    }

    /**
     *
     * @param level {Level}
     * @param nbt {CompoundTag}
     */
    constructor(level, nbt){
        super(); //mhh.. werid.. i cannot just call it later.. mhh..
        Entity.initVars();

        Entity._constructed = true;
        //TODO: this._timings = Timings.getEntityTimings(this);

        Entity.temporalVector = new Vector3();

        if (Entity.eyeHeight === null){
            Entity.eyeHeight = Entity.height / 2 + 0.1;
        }

        Entity._id = Entity._entityCount++;
        //Entity.namedtag = nbt;
        //Entity.namedtag = new CompoundTag();
        //this._server = level.getServer();

        //let pos = Entity.namedtag.getListTag("Pos").getAllValues();
        //let rotation = Entity.namedtag.getListTag("Rotation").getAllValues();
        //super(pos[0], pos[1], pos[2], rotation[0], rotation[1], level);
        //assert(!Number.isNaN(this.x) && Number.isFinite(this.x) && !Number.isNaN(this.y) && Number.isFinite(this.y) && !Number.isNaN(this.z) && Number.isFinite(this.z));


        this.boundingBox = new AxisAlignedBB(0, 0, 0, 0, 0, 0);
        this.recalculateBoundingBox();

        /*this.chunk = this.level.getChunkAtPosition(this, false);
        if (this.chunk === null){
            console.log("Cannot create entities in unloaded chunks");
        }*/
        
        /*this._motion = new Vector3(0, 0, 0);
        if (this.namedtag.hasTag("Motion", ListTag)) {
            let motion = this.namedtag.getListTag("Motion").getAllValues();
            this.setMotion(this.temporalVector.setComponents(...motion)); //TODO: function setMotion()
        }*/
    }

    init(){


        Attribute.init();
    }

    createEntity(type, level, nbt, ...args){
        if (Isset(this._knownEntities[type])){

        }
    }

    isSprinting(){
        return this.getGenericFlag(self.DATA_FLAG_SPRINTING);
    }

    /**
     *
     * @param flagId {number}
     */
    getGenericFlag(flagId){
        this.getDataFlag(flagId >= 64 ? self.DATA_FLAGS2 : self.DATA_FLAGS, flagId % 64);
    }

    /**
     *
     * @param propertyId {number}
     * @param flagId {number}
     */
    getDataFlag(propertyId, flagId){
        //return Number(this.propertyManager)
    }

    /**
     *
     * @param motion {Vector3}
     * @return boolean
     */
    setMotion(motion){
        if (!this._justCreated){
            let ev = EntityMotionEvent(this, motion);
            EventManager.callEvent(ev.getName(), ev);
            if (ev.isCancelled()){
                return false;
            }
        }

        this._motion = Object.assign({}, motion); //might not work, test purpose clone

        if (this._justCreated){
            //this.updateMovement();
        }

        return true;
    }

    //TODO: finish and take a look
    recalculateBoundingBox(){
        let halfWidth = this.width / 2;

        this.boundingBox.setBounds(
            this.x - halfWidth,
            this.y,
            this.z -  halfWidth,
            this.x +  halfWidth,
            this.y +  this.height,
            this.z +  halfWidth
        )
    }

}

module.exports = Entity;