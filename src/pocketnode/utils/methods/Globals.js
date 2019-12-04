const Path = require("path");

/**
 * Require files from PocketNode
 * @param path {string}
 * @return {*}
 */
global.binarystream = function(path){
    return require(Path.normalize(__dirname + "/../../../binarystream/" + path));
};
/**
 * @deprecated use them at your own risk... personally i prefer require()... it also give you hints.
 * @param path
 * @return {*}
 */
global.pocketnode = function(path){
    return require(Path.normalize(__dirname + "/../../" + path));
};
global.raknet = function(path){
    return require(Path.normalize(__dirname + "/../../../raknet/" + path));
};

global.hex2bin = function(s) {
    //  discuss at: https://locutus.io/php/hex2bin/
    // original by: Dumitru Uzun (https://duzun.me)
    //   example 1: hex2bin('44696d61')
    //   returns 1: 'Dima'
    //   example 2: hex2bin('00')
    //   returns 2: '\x00'
    //   example 3: hex2bin('2f1q')
    //   returns 3: false

    let ret = [];
    let i = 0;
    let l;

    s += '';

    for (l = s.length; i < l; i += 2) {
        let c = parseInt(s.substr(i, 1), 16);
        let k = parseInt(s.substr(i + 1, 1), 16);
        if (isNaN(c) || isNaN(k)) return false;
        ret.push((c << 4) | k)
    }

    return String.fromCharCode.apply(String, ret);
};

/*global.clone = function(src) {
    function mixin(dest, source, copyFunc) {
        let name, s, i, empty = {};
        for(name in source){
            // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
            // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
            // don't overwrite it with the toString() method that source inherited from Object.prototype
            s = source[name];
            if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                dest[name] = copyFunc ? copyFunc(s) : s;
            }
        }
        return dest;
    }

    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
        // null, undefined, any non-object, or function
        return src;	// anything
    }
    if(src.nodeType && "cloneNode" in src){
        // DOM Node
        return src.cloneNode(true); // Node
    }
    if(src instanceof Date){
        // Date
        return new Date(src.getTime());	// Date
    }
    if(src instanceof RegExp){
        // RegExp
        return new RegExp(src);   // RegExp
    }
    let r, i, l;
    if(src instanceof Array){
        // array
        r = [];
        for(i = 0, l = src.length; i < l; ++i){
            if(i in src){
                r.push(clone(src[i]));
            }
        }
        // we don't clone functions for performance reasons
        //		}else if(d.isFunction(src)){
        //			// function
        //			r = function(){ return src.apply(this, arguments); };
    }else{
        // generic objects
        r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, clone);

};*/

global.clone = function(src){
    return Object.assign({}, src);
};

// By Jackx
global.multiple = function(baseClass, ...mixins){
    class base extends baseClass {
        constructor (...args) {
            super(...args);
            for(let y = 0; y < mixins.length; ++y){
                let mixin = mixins[y];
                copyProps(this, (new mixin));
            }
        }
    }
    let copyProps = (target, source) => {
        let props = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));
        for(let z = 0; z < props.length; ++z){
            let prop = props[z];
            if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
        }
    };
    for(let x = 0; x < mixins.length; ++x){
        let mixin = mixins[x];
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    }
    return base;
};

global.atob = require("atob");

// By Jackx
global.flipArray = function(array){
    let newA = [];
    for(let prop in array){
        if(array.hasOwnProperty(prop)){
            newA[array[prop]] = prop;
        }
    }
    return newA;
};

global.str_pad = function(input, padLength, padString, padType){

    let half = "";
    let padToGo;

    let _strPadRepeater = function(s, len){
        let collect = "";

        while(collect.length < len){
            collect += s;
        }
        collect = collect.substr(0, len);

        return collect;
    };

    input += "";
    padString = padString !== undefined ? padString : " ";

    if(padType !== "STR_PAD_LEFT" && padType !== "STR_PAD_RIGHT" && padType !== "STR_PAD_BOTH"){
        padType = "STR_PAD_RIGHT";
    }
    if((padToGo = padLength - input.length) > 0){
        if(padType === "STR_PAD_LEFT"){
            input = _strPadRepeater(padString, padToGo) + input;
        }else if(padType === "STR_PAD_RIGHT"){
            input = input + _strPadRepeater(padString, padToGo);
        }else if(padType === "STR_PAD_BOTH"){
            half = _strPadRepeater(padString, Math.ceil(padToGo / 2));
            input = half + input + half;
            input = input.substr(0, padLength);
        }
    }

    return input;
};

const SFS = pocketnode("utils/SimpleFileSystem");

void function(){
    function walk(dir){
        SFS.walkDir(dir).forEach(path => {
            if(SFS.basename(SFS.dirname(path)) === "pocketnode" && SFS.isFile(path)) return; //omit Server, PocketNode

            let parent;
            if(SFS.isDir(path)){
                parent = trace(path);
            }else if(SFS.isFile(path)){
                parent = trace(SFS.dirname(path));
            }


            if(SFS.isDir(path)){
                walk(path);
            }else if(SFS.isFile(path)){
                parent.files[Path.basename(path, ".js")] = path;
            }
        });
    }

    function trace(path){
        path = path.split(Path.sep);
        path = path.slice(path.lastIndexOf("pocketnode")+1);

        let parent = global.pocketnode;

        path.forEach(part => {
            if(part === "") return;

            if(typeof parent[part] === "undefined"){
                parent[part] = {
                    files: {},
                    use: function(file){
                        if(typeof file === "string"){
                            file = file.indexOf(".js") !== -1 ? file.slice(0, -3) : file;
                            if(Object.keys(this.files).indexOf(file) !== -1){
                                return require(this.files[file]);
                            }else{
                                throw new Error(`The requested resource, ${file}, was not found!`);
                            }
                        }else if(file instanceof Array){
                            let files = [];

                            file.forEach(f => {
                                if(Object.keys(this.files).indexOf(f) !== -1){
                                    files.push(require(this.files[f]));
                                }else{
                                    files.push(undefined);
                                }
                            });

                            return files;
                        }
                    },
                    all(){
                        let all = {};
                        for(let name in this.files){
                            all[name] = require(this.files[name]);
                        }
                        return all;
                    }
                };
            }

            parent = parent[part];
        });

        return parent;
    }

    walk(__dirname + "/../../");
}();


/**
 * PHP-like rounding added onto the Math object
 * @param value     {number}
 * @param precision {number}
 * @param mode      {string}
 * @return {Number}
 */
Math.round_php = function(value, precision = 0, mode = "ROUND_HALF_UP"){
    let m, f, isHalf, sgn;
    m = Math.pow(10, precision);
    value *= m;
    // sign of the number
    sgn = (value > 0) | -(value < 0);
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);
    if(isHalf){
        switch (mode) {
            case "ROUND_HALF_DOWN":
                // rounds .5 toward zero
                value = f + (sgn < 0);
                break;
            case "ROUND_HALF_EVEN":
                // rounds .5 towards the next even integer
                value = f + (f % 2 * sgn);
                break;
            case "ROUND_HALF_ODD":
                // rounds .5 towards the next odd integer
                value = f + !(f % 2);
                break;
            default:
                // rounds .5 away from zero
                value = f + (sgn > 0);
        }
    }
    return ((isHalf ? value : Math.round(value)) / m);
};

/**
 * CheckTypes
 * Example: CheckTypes([String, "myString"]); // true
 *          CheckTypes([String, 12]); // throws TypeError
 *
 * @throws {TypeError}
 * @return {boolean}
 */
global.CheckTypes = function(...args){
    if(args.length === 0) throw new TypeError("Expecting at least 1 Array. Example: [Object, myObjectVar]");

    args.forEach(arg => {
        if(!(arg instanceof Array)){
            throw new TypeError("Expecting Array, got "+(arg.constructor.name ? arg.constructor.name : arg.name));
        }

        if(typeof arg[0] === "undefined" || typeof arg[1] === "undefined"){
            throw new TypeError("Expecting Array with two items. Example: [Object, myObjectVar]");
        }

        let type = arg[0];
        let item = arg[1];

        if(
            !(item instanceof type) &&
            (item.constructor.name !== type.name && item.constructor !== type)
        ){
            throw new TypeError("Expecting "+type.name+", got "+item.constructor.name);
        }
    });
    return true;
};

String.prototype.ltrim = function(char){
    let str = this.valueOf();
    while(true){
        if(str[0] === char) str = str.substr(1);
        else break;
    }
    return str;
};

String.prototype.rtrim = function(char){
    let str = this.valueOf().split("").reverse().join("");
    while(true){
        if(str[0] === char) str = str.substr(1);
        else break;
    }
    return str.split("").reverse().join("");
};

String.prototype.contains = function(str){
    return this.indexOf(str) !== -1;
};

Math.fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };

/**
 * @author Jonas Raoni Soares Silva
 * @link http://jsfromhell.com/string/wordwrap
 */
String.prototype.wordwrap = function(m, b, c){
    let i, j, l, s, r;
    if(m < 1)
        return this;
    for(i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
                || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
    return r.join("\n");
};

global.assert = require("assert");

global.sleep = function(ms){
    return sleep_until(Date.now() + ms);
};

global.sleep_until = function(ms){
    while(Date.now() < ms){}
    return true;
};

/**
 * A more accurate interval
 * @param fn       {Function}
 * @param interval {Number}
 */
global.createInterval = function(fn, interval){
    return new (function(){
        this.baseline = undefined;
        this.run = function(){
            if(this.baseline === undefined){
                this.baseline = Date.now();
            }

            fn();

            let end = Date.now();
            this.baseline += interval;

            let nextTick = interval - (end - this.baseline);
            if (nextTick < 0) nextTick = 0;
            this.timer = setTimeout(() => this.run(end), nextTick);
        };

        this.stop = () => clearTimeout(this.timer);
    });
};

global.TRAVIS_BUILD = process.argv.indexOf("--travis-build") !== -1;
global.RUNNING_LOCALLY = (process.argv.indexOf("--local") !== -1 || process.argv.indexOf("-l") !== -1);