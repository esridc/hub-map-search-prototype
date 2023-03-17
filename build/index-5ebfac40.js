import { g as getPortalUrl$1, S as SearchQueryBuilder, u as unprotectGroup, r as removeGroup, c as createOrgNotification, a as addGroupUsers, i as inviteGroupUsers, b as unprotectItem, d as removeItem, e as updateItem, f as getItem, h as getItemData, s as shareItemWithGroup, j as unshareItemWithGroup, k as searchItems, l as addItemResource, m as getItemResources, n as searchGroups, o as searchUsers, p as getRelatedItems } from './index-bed14788.js';
import { r as request, A as ArcGISRequestError } from './index-5c68fb28.js';
import { U as UserSession } from './index-923d9554.js';

/**
 * Maps over the values of an object (one level deep)
 * @param obj
 * @param fn
 * @private
 */
function _mapValues(obj, fn) {
    const keys = Object.keys(obj);
    const newObject = keys.reduce(function (acc, currentKey) {
        acc[currentKey] = fn(obj[currentKey], currentKey, obj);
        return acc;
    }, {});
    return newObject;
}

/**
 * Maps over _all_ values of an object graph
 * @param object
 * @param callback function to be called on each value
 * @param propertyPath an initial path (optional, only changes what is passed to the callback as the "path" argument)
 * @private
 */
function _deepMapValues(object, callback, propertyPath) {
    propertyPath = propertyPath || "";
    if (Array.isArray(object)) {
        return object.map(deepMapValuesIteratee);
    }
    else if (object &&
        _isObject(object) &&
        !_isDate(object) &&
        !_isRegExp(object) &&
        !_isFunction(object)) {
        return Object.assign({}, object, _mapValues(object, deepMapValuesIteratee));
    }
    else {
        return callback(object, propertyPath);
    }
    function deepMapValuesIteratee(value, key) {
        const valuePath = "" + (propertyPath ? propertyPath + "." + key : key);
        return _deepMapValues(value, callback, valuePath);
    }
}
// Simple "good-enough" type checks for the tree traversal functions
// these are not bullet-proof and should not be public/docd
/**
 * Is this a string?
 * @param v
 * @private
 */
function _isString(v) {
    return typeof v === "string" || v instanceof String;
}
/**
 * Return if the passed entry is a Date
 * @param v
 * @private
 */
function _isDate(v) {
    return v instanceof Date;
}
/**
 * Is this a function?
 * @param v
 * @private
 */
function _isFunction(v) {
    return typeof v === "function";
}
/**
 * Is this an Object?
 * @param v
 * @private
 */
function _isObject(v) {
    return typeof v === "object";
}
/**
 * Is this a regexp?
 * @param v
 * @private
 */
function _isRegExp(v) {
    return v instanceof RegExp;
}

/**
 * Get a property out of a deeply nested object
 * Does not handle anything but nested object graph
 */
function getProp(obj, path) {
    return path.split(".").reduce(function (prev, curr) {
        /* istanbul ignore next no need to test undefined scenario */
        return prev ? prev[curr] : undefined;
    }, obj);
}

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { cloneObject } from "@esri/hub-common";
 * const original = { foo: "bar" }
 * const copy = cloneObject(original)
 * copy.foo // "bar"
 * copy === original // false
 * ```
 * Make a deep clone, including arrays. Does not handle functions!
 */
function cloneObject$1(obj) {
    let clone = {};
    // first check array
    if (Array.isArray(obj)) {
        clone = obj.map(cloneObject$1);
    }
    else if (typeof obj === "object") {
        for (const i in obj) {
            /* istanbul ignore next no need to deal w/ other side of hasOwnProperty() */
            if (obj.hasOwnProperty(i)) {
                const value = obj[i];
                if (value != null && typeof value === "object") {
                    if (value instanceof Date) {
                        clone[i] = new Date(value.getTime());
                    }
                    else {
                        clone[i] = cloneObject$1(value);
                    }
                }
                else {
                    clone[i] = value;
                }
            }
        }
    }
    else {
        clone = obj;
    }
    return clone;
}
/**
 * Given an array of objects, convert into an object, with each
 * entry assigned the key via the keyprop
 */
function arrayToObject(arr, key) {
    return arr.reduce((hash, entry) => {
        hash[getProp(entry, key)] = entry;
        return hash;
    }, {});
}
/**
 * Given an object, convert into an array, with each
 * something or other
 */
function objectToArray(obj, keyProp = "id") {
    const arr = Object.keys(obj).reduce((acc, prop) => {
        obj[prop][keyProp] = prop;
        acc.push(cloneObject$1(obj[prop]));
        return acc;
    }, []);
    return arr;
}
/**
 * Return an entry from an array by a property name
 */
function findBy(arr, prop, value) {
    if (!arr) {
        return null;
    }
    const res = arr.reduce((acc, entry) => {
        if (getProp(entry, prop) === value) {
            acc = entry;
        }
        return acc;
    }, null);
    return res;
}
/**
 * Return a new array without the specified value.
 *
 * @export
 * @param {any[]} arr
 * @param {*} val value or object to remove
 * @returns {any[]} Array without the value
 */
function without(arr, value) {
    const res = arr.filter((entry) => entry !== value);
    return res;
}
/**
 * Compose
 * adapted from: https://github.com/stoeffel/compose-function/blob/master/module/index.js
 */
function compose(...fns) {
    return fns.reduce((f, g) => (...args) => f(g(...args)));
}
/**
 * Return a random number, prefixed with a string. Used for unique identifiers that do not require
 * the rigor of a full UUID - i.e. node id's, process ids etc.
 * @param prefix String to prefix the random number with so the result is a valid javascript property
 */
function createId(prefix = "i") {
    // prepend some char so it's always a valid dotable property name
    // get a random number, convert to base 36 representation, then grab chars 2-8
    return `${prefix}${Math.random().toString(36).substr(2, 8)}`;
}
/**
 * Append or replace a value on an object, using a specified key, if the value is not null.
 * This is a very useful companion to the [getProp()](../getProp/) utility.
 *
 * Note: object that is passed in is cloned before the property is appended.
 *
 * Allows for code like:
 *
 * ```js
 * let model = {
 *  item: {
 *    title: 'some example object',
 *    description: 'this is some longer text',
 *    type: 'Web Map',
 *    properties: {
 *      sourceId: '3ef'
 *    }
 *  },
 *  data: {
 *    theme: 'orange',
 *    parcelLayer: {
 *      primaryField: 'PIN'
 *    }
 *  }
 * };
 *
 * // Let's extract some details into an object.
 * const summary = [
 *  'item.title',
 *  'item.description',
 *  'item.missingProp',
 *  'data.parcelLayer.primaryField'].reduce((acc, prop) => {
 *   // create the property name... you could do this however...
 *   let propName = prop.split('.').reverse()[0];
 *   return maybeAdd(propName, getProp(model, key), acc);
 * }, {});
 *
 * // summary =>
 * // {
 * //   title: 'some example object',
 * //   description: 'this is some longer text',
 * //   primaryField: 'PIN'
 * // }
 * ```
 * @param key - key to use when appending to the object
 * @param val - the possibly null value
 * @param target - the object to update
 */
function maybeAdd(key, val, target) {
    // see if we got something...
    if (val !== null && val !== undefined) {
        target = cloneObject$1(target);
        // attach using the key
        target[key] = val;
    }
    return target;
}
/**
 * Append a value to an array, if the value is not null.
 * This is a very useful companion to the [getProp()](../getProp/) utility.
 *
 * Note: the array that is passed in is cloned before being appended to.
 *
 * Allows for code like:
 * ```js
 *  // example object
 * let model = {
 *  item: {
 *    id: 'c00',
 *    title: 'some example object',
 *    description: 'this is some longer text',
 *    type: 'Web Map',
 *    properties: {
 *      sourceId: '3ef'
 *    }
 *  },
 *  data: {
 *    theme: 'orange',
 *    parcelLayer: {
 *      itemId: '7ca',
 *      primaryField: 'PIN'
 *    }
 *  }
 * };
 * // lets pluck some id's into an array...
 * maybePush(getProp(model, 'item.properties.sourceId'), []);
 * // > ['3ef']
 *
 * // now try to get a value from a property that is missing...
 * maybePush(getProp(obj, 'item.properties.childId'), []);
 * // > []
 *
 * // easily pluck values via property paths
 * const summary = [
 *  'item.id',
 *  'item.properties.sourceId',
 *  'item.properties.childId',
 *  'data.parcelLayer.itemId'].reduce((acc, prop) => {
 *   return maybePush(getProp(model, key), acc);
 * }, []);
 *
 * // summary => ['c00', '3ef', '7ca']
 *
 * ```
 *
 * @param val - the possibly null value
 * @param target - the array to add the value to
 */
function maybePush(val, target) {
    if (val !== null && val !== undefined) {
        // create a clone because mutation makes us sad...
        target = cloneObject$1(target);
        target.push(val);
    }
    return target;
}
/**
 * Convert a string to camelCase
 *
 * @export
 * @param {string} value
 * @returns {string} camelCased string
 */
function camelize(value) {
    // lower case the whole thing to start...
    value = value.toLowerCase();
    // strip out any/all special chars...
    value = value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ");
    // Hoisted from EmberJS (MIT License)
    // https://github.com/emberjs/ember.js/blob/v2.0.1/packages/ember-runtime/lib/system/string.js#L23-L27
    const STRING_CAMELIZE_REGEXP_1 = /(\-|\_|\.|\s)+(.)?/g;
    const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;
    return value
        .replace(STRING_CAMELIZE_REGEXP_1, function (match, separator, chr) {
        return chr ? chr.toUpperCase() : "";
    })
        .replace(STRING_CAMELIZE_REGEXP_2, function (match, separator, chr) {
        return match.toLowerCase();
    });
}
/**
 * Determines if a value is unique in an array
 * Allows for code like:
 *
 * ```js
 * const ary = [ 1, 2, 3, 3, 4, 5, 1 ];
 *
 * const result = ary.filter(unique);
 *
 * result => [ 1, 2, 3, 4, 5 ]
 * ```
 * @param value - the value to search for
 * @param index - the index of the searched value
 * @param ary - the array to search
 * @returns {boolean} - indicating if the value is unique in the array
 */
function unique(value, index, ary) {
    return ary.indexOf(value) === index;
}
/**
 * Return array of unique objects, based on a deep property value
 *  Note: Property you compare on should be a primative type
 * @export
 * @template T
 * @param {T[]} arr
 * @param {string} prop
 * @return {*}  {T[]}
 */
function uniqueBy(arr, prop) {
    return arr.reduce((acc, entry) => {
        const nameMatches = (e) => getProp(e, prop) === getProp(entry, prop);
        return maybePush(acc.find(nameMatches) ? null : entry, acc);
    }, []);
}
/**
 * Return last element of an array
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @return {*}  {T}
 */
function last(arr) {
    return arr[arr.length - 1];
}
/**
 * Filter an array by a deep property value
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @param {string} prop
 * @param {unknown} val
 * @return {*}  {T[]}
 */
function filterBy(arr, prop, val) {
    return arr.filter((entry) => getProp(entry, prop) === val);
}
/**
 * Extends the target object with props from the source object, overwriting identically named
 * props in target with those from source, ignoring null and undefined values; similar to $.extend.
 * Performs a deep extend by default, unless deep = false is passed as the third arg.
 *
 * @param target - the object that will take props from source
 * @param source - the object from which to take props
 * @param deep - whether or not to perform a deep (recursive) extend of source
 */
function extend(target, source, deep = true) {
    const extended = cloneObject$1(target);
    return Object.keys(source).reduce((obj, prop) => {
        if (source[prop] !== null && source[prop] !== undefined) {
            const value = cloneObject$1(source[prop]);
            if (Array.isArray(value)) {
                // check for arrays, since array is type object
                obj[prop] = value;
            }
            else if (deep && typeof value === "object") {
                obj[prop] = extend(obj[prop] || {}, value, deep);
            }
            else {
                obj[prop] = value;
            }
        }
        return obj;
    }, extended);
}
/**
 * Add number of days to a given date
 *
 * @export
 * @param {string} date
 * @param {number} numOfDays
 * @returns {string} date string with numOfDays added to the given date
 */
function addDays(date, numOfDays) {
    try {
        const given = new Date(date);
        const dateString = new Date(given.setDate(given.getDate() + numOfDays)).toISOString();
        return dateString.split("T")[0];
    }
    catch (e) {
        throw new Error("Invalid Date");
    }
}
/**
 * Returns an array with arrays of the given size.
 *
 * @param arr Array to split
 * @param size Size of every group
 */
function chunkArray(arr, size) {
    const results = [];
    let index = 0;
    while (index < arr.length) {
        results.push(arr.slice(index, index + size));
        index += size;
    }
    return results;
}
/**
 * Determine if a value is null or undefined
 * @param value anything
 * @returns
 */
const isNil = (value) => value == null;
/**
 * Upper case first letter (only) of a string
 * @param word
 * @returns Word
 */
const capitalize = (word) => {
    // upper case first letter and return as element in array for backwards compatibility
    const chars = Array.from(word);
    chars[0] = chars[0].toUpperCase();
    return chars.join("");
};
/**
 * An IE-compatible stand-in for Javascript's [array.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
 * @param arr the array
 * @returns an array
 */
function flattenArray(arr) {
    return arr.reduce((acc, val) => acc.concat(val), []);
}

/**
 * Deep set function. Like Ember.set, but smarter as it will create the path
 * @param {Object} target Object we want to set the property on
 * @param {String} path Dotted path to the property we want to set
 * @param {Any} value Value we want to assign to the property
 */
function deepSet(target, path, value = {}) {
    const parts = path.split(".");
    let worker = target;
    const lastIdx = parts.length - 1;
    parts.forEach((p, idx) => {
        if (!worker.hasOwnProperty(p) || worker[p] === null) {
            if (idx === lastIdx) {
                worker[p] = value;
            }
            else {
                // keep building the path
                worker[p] = {};
            }
        }
        else if (idx === lastIdx) {
            if (typeof worker[p] === "object" && !Array.isArray(worker[p])) {
                worker[p] = Object.assign(worker[p], cloneObject$1(value));
            }
            else {
                worker[p] = value;
            }
        }
        worker = worker[p];
    });
}

/**
 * Ensure that an object has a deep property path.
 * This will replace any existing object at the end of the path
 * @param {Object} target Object we want to ensure has some deep property
 * @param {string} path Dotted path to the property we want to ensure exists
 */
function ensureProp(target, path) {
    return deepSet(target, path);
}

/**
 * Given an array of prop paths, return all the values that exist, in an array
 */
function getProps(obj, props) {
    return props.reduce((a, p) => {
        const v = getProp(obj, p);
        if (v) {
            a.push(v);
        }
        return a;
    }, []);
}

/**
 * Gets the value of a property from an object with a
 * default if that prop is undefined
 * @param obj
 * @param prop
 * @param def
 */
function getWithDefault$1(obj, prop, def) {
    const res = getProp(obj, prop);
    return res !== undefined ? res : def;
}

/**
 * Remove empty properties from an object graph
 * @param {Object} obj Object to remove empty/null properties from
 */
function removeEmptyProps(obj) {
    // http://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === "object") {
            removeEmptyProps(obj[key]);
        }
        else if (obj[key] == null) {
            delete obj[key];
        }
    });
    return obj;
}

/**
 * Iterate over an object graph, and for all string properties, search for a string,
 * and replace it with another string
 */
function deepStringReplace(obj, stringOrRegex, replacement) {
    const replacedObject = _deepMapValues(obj, function (value) {
        // Only string templates
        if (!_isString(value)) {
            return value;
        }
        let re;
        if (_isRegExp(stringOrRegex)) {
            re = stringOrRegex;
        }
        else {
            re = new RegExp(stringOrRegex, "g");
        }
        return value.replace(re, replacement);
    });
    return replacedObject;
}

/**
 * Apply a specified set properties from a source object to a target object
 *
 * @param {Object} source The source object
 * @param {Object} target The target object
 * @param {Array} allowList Array of property paths (if not provided, source returned)
 */
function mergeObjects(source, target, allowList) {
    if (Array.isArray(allowList) && allowList.length) {
        // we iterate the allowList, applying changes to the target from source
        allowList.forEach(prop => {
            if (getProp(source, prop) !== undefined) {
                deepSet(target, prop, getProp(source, prop));
            }
        });
        // return the modified target object
        return target;
    }
    else {
        // if no property paths were passed in, return the source
        return source;
    }
}

/**
 * Sets a deep object property, constructing the property path as necessary
 *
 * @param path - the path to the property we want to set
 * @param val - the value we want to set it to
 * @param obj - the target object
 */
function setProp(path, val, obj) {
    if (Array.isArray(path)) {
        path = path.join(".");
    }
    deepSet(obj, path, val);
}

/**
 * Traverse a graph, locating the first entry with an `id` property that
 * has a specific string or number value
 *
 * ```js
 * const l = {
 *  one: {
 *    two: [
 *      {
 *        id: "n001",
 *        color: "red"
 *      },
 *      {
 *        id: "n002",
 *        color: "yellow"
 *      }
 *    ]
 *  }
 * };
 *
 * const config = deepFindById(l, "n002")
 * //> {id: "n002", color:"yellow"}
 * ```
 *
 * This was designed to search a Site/Page/Project layout, and return
 * the config for a card. There was some concern about the performance
 * and using a real layout object, in the test, it takes ~1.5ms to
 * do the search.
 *
 * @param object
 * @param key
 * @param value
 * @returns
 */
function deepFindById(object, value) {
    const p = (obj) => obj.id === value;
    return deepFind(object, p);
}
/**
 * Traverse a graph locating an entry that passes the predicate
 *
 * @param object
 * @param predicate
 * @returns
 */
function deepFind(object, predicate) {
    if (Array.isArray(object)) {
        return object.reduce((acc, entry) => {
            if (predicate(entry)) {
                acc = entry;
            }
            else {
                if (isFindable(entry)) {
                    const maybe = deepFind(entry, predicate);
                    if (maybe) {
                        acc = maybe;
                    }
                }
            }
            return acc;
        }, undefined);
    }
    else if (isFindable(object)) {
        if (predicate(object)) {
            return object;
        }
        else {
            return Object.keys(object).reduce((acc, entry) => {
                if (isFindable(object[entry])) {
                    const maybe = deepFind(object[entry], predicate);
                    if (maybe) {
                        acc = maybe;
                    }
                }
                return acc;
            }, undefined);
        }
    }
    else {
        return undefined;
    }
}
function isFindable(object) {
    let result = false;
    if (object &&
        _isObject(object) &&
        !_isDate(object) &&
        !_isRegExp(object) &&
        !_isFunction(object)) {
        result = true;
    }
    return result;
}

/**
 * Helper to split a large number of calls into
 * smaller batches of concurrent calls.
 * @param {Array} values Any array of values with which to invoke fn
 * @param {Function} fn The function that will be invoked with each value
 * @param {number} [batchSize=5] The number of concurrent calls to fn, defaults to 5
 * @returns {Promise<IBatch[]>}
 */
function batch(values, fn, batchSize = 5) {
    const toBatches = (_batches, value) => {
        let _batch = _batches[_batches.length - 1];
        if (!_batch || _batch.length === batchSize) {
            _batch = [];
            _batches.push(_batch);
        }
        _batch.push(value);
        return _batches;
    };
    const toSerialBatchChain = (promise, batchOfValues) => {
        const executeBatch = (prevResults) => {
            const batchResults = batchOfValues.map(id => fn(id));
            return Promise.all(batchResults).then(results => prevResults.concat(results));
        };
        return promise.then(executeBatch);
    };
    // split values into batches of values
    const batches = values.reduce(toBatches, []);
    // batches are processed serially, however
    // all calls within a batch are concurrent
    return batches.reduce(toSerialBatchChain, Promise.resolve([]));
}

/**
 * Checks whether a value exists in the given array
 * @param array The array
 * @param val The value
 */
function includes(array, val) {
    return array.indexOf(val) !== -1;
}

/**
 * Given an array of strings, add a value and ensure it is unique by incrementing a suffix number
 * @param {Array} entries array of strings
 * @param {string} value string to uniqueify and add
 */
function ensureUniqueString(entries, value) {
    let foundUnique = false;
    let num = 0;
    let chk = value;
    while (!foundUnique) {
        if (includes(entries, chk)) {
            num++;
            chk = `${value}-${num}`;
        }
        else {
            foundUnique = true;
        }
    }
    return chk;
}

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Generic Solution Error with an Error stack as well
 * as an optional serialized OperationStack.
 *
 * Also accepts a `rootCause` Error object
 */
class OperationError extends Error {
    /**
     * Creates an instance of OperationError.
     * @param {string} operation
     * @param {string} [message]
     * @param {Error} [rootCause]
     * @memberof OperationError
     */
    constructor(operation, message, rootCause) {
        message = message || "UNKNOWN_ERROR";
        // if the rootCause has a .rootCause, use that so we don't deeply nest
        rootCause = getWithDefault$1(rootCause, "rootCause", rootCause);
        super(message);
        this.operation = operation;
        this.name = "OperationError";
        this.rootCause = rootCause;
        Object.setPrototypeOf(this, OperationError.prototype);
        // using rootCause.stack ensures that the resulting error will have the original
        // message + call stack. If that's not an option, we create a new
        // stack... which is better than nothing, but it will look like
        // OperationError is the source of the error
        this.stack = getWithDefault$1(rootCause, "stack", new Error().stack);
    }
}

/**
 * Returns a function that orchestrates a pipeline of smaller functions.
 * See [Composing Workflows](../../../guides/composing-workflows) for more information.
 *
 * All the functions must adhere to the `PipelineFn<T>` signature:
 *
 * `(value: IPipeable<T>) => Promise<IPipeable<T>>`
 *
 * Given an array of OperationPipeFns, run them in sequence and return the resultant promise
 *
 * i.e. `createOperationPipeline([fn1, fn2, f3])` will return in a function that chains
 * the functions like this: `fn1(input).then(fn2).then(fn3).then(result)`
 *
 * @param fns functions to be run in sequence
 * @returns Promise<Pipable<T>>
 */
const createOperationPipeline = (fns) => (input) => {
    return fns.reduce((chain, func) => {
        return chain.then(func).catch((err) => {
            // if it's an OperationError we can just reject with it...
            if (err.name === "OperationError") {
                return Promise.reject(err);
            }
            else {
                // otherwise, create an OperationError and reject with that
                const msg = `IPipeableFn did not reject with an OperationError \n Operation Stack: \n ${input.stack.toString()}`;
                const opErr = new OperationError("pipeline execution error", msg);
                opErr.operationStack = input.stack.serialize();
                return Promise.reject(opErr);
            }
        });
    }, Promise.resolve(input));
};

/**
 * Wrap an async function such that it will never reject
 * @param {Function} fn Async Function that we want to never fail
 * @param {Object} resolveWith Object to resolve with in the event of a failure
 */
function failSafe(fn, resolveWith = {}) {
    return (...args) => {
        return fn(...args).catch((_) => {
            return resolveWith;
        });
    };
}

/**
 * Generate a random string of a specified length
 * User when we need to ensure a unique domain with a fixed length
 * @param {Number} chars Length of random string
 */
function generateRandomString(chars) {
    let d = new Date().getTime();
    const result = Array(chars)
        .fill(0)
        .reduce(function (acc) {
        /* tslint:disable-next-line */
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        acc = `${acc}${r.toString(16)}`;
        return acc;
    }, "");
    return result;
}

/**
 * Gien a portal settings object, determine the hub product name
 * @param {Object} portal Portal settings object
 */
function getHubProduct(portal) {
    const isPremium = getProp(portal, "portalProperties.hub.enabled") || false;
    let product = isPremium ? "premium" : "basic";
    // TODO confirm w/ AGO that this is 100% bomber logic
    if (portal.isPortal && portal.portalMode === "singletenant") {
        product = "portal";
    }
    return product;
}

const getSubscriptionType = (portalSelf) => {
    return getWithDefault$1(portalSelf, "subscriptionInfo.type", "Enterprise");
};

/**
 * Is a String a GUID?
 * @param {string} stringToTest string to check if it's a GUID
 */
function isGuid(stringToTest) {
    // strip curlies if sent...
    if (stringToTest[0] === "{") {
        stringToTest = stringToTest.substring(1, stringToTest.length - 1);
    }
    // ughh... seems legit
    const regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{12}(\}){0,1}$/gi;
    // test
    return regexGuid.test(stringToTest);
}

/**
 * Map over an array returning the specified property for each entry
 * @param {String} prop Property to extracct
 * @param {Array} arr array of objects
 */
function mapBy(prop, arr = []) {
    return arr.map((e) => e[prop]);
}

/**
 * Perform the following operations on a string to make it slug-friendly:
 * 1. trim it
 * 2. convert to lowercase
 * 3. remove any character not a-z, 0-9, or _
 * 4. dasherize it
 * @param {String} value String to slugify
 */
function slugify(value) {
    if (typeof value === "string") {
        // @ts-ignore
        return value
            .trim()
            .toLowerCase()
            .replace(/ +/g, "-")
            .replace(/[^\w-]/g, "")
            .replace(/-+/g, "-");
    }
    else {
        return value;
    }
}

/**
 * Returns a new array with all the entries have the given value
 * at the given prop location removed.
 *
 * @param prop the property
 * @param val the value
 * @param arr the array
 */
function withoutByProp(prop, val, arr) {
    return arr.filter((e) => {
        return e[prop] !== val;
    });
}

/**
 * Given a string, strip out chars etc that would make it
 * and invalid javascript property name, then camelize it.
 * @param {string} value String to convert into a property
 */
function propifyString(value) {
    let result = value;
    // strip off any leading numbers...
    result = result.replace(/^[0-9]*/g, "");
    // remove any rando chars...
    result = result.replace(/[^\w\s]/g, "");
    // camelize the rest...
    result = camelize(result);
    return result;
}

/**
 * Given a string, append a `- 1` on the end if no number is present
 * otherwise, increment the number
 * @param {string} str String to increment
 */
function incrementString(str) {
    const matches = str.match(/-\s(\d+$)/);
    if (matches) {
        // get the number
        const current = parseInt(matches[1], 10);
        // replace `- current` with `- current + 1`
        const next = current + 1;
        str = str.replace(`- ${current}`, `- ${next}`);
    }
    else {
        str = str + " - 1";
    }
    return str;
}

/* tslint:disable no-console */
/**
 * Enum for Logger Levels
 */
var Level;
(function (Level) {
    Level[Level["all"] = 0] = "all";
    Level[Level["debug"] = 1] = "debug";
    Level[Level["info"] = 2] = "info";
    Level[Level["warn"] = 3] = "warn";
    Level[Level["error"] = 4] = "error";
    Level[Level["off"] = 5] = "off";
})(Level || (Level = {}));
/**
 * ```js
 * import { Logger, Level } from '@esri/hub-common'
 * ```
 * Functions share the console interface
 * ```js
 * Logger.log('My Message');
 * Logger.warn('Watch out!', { threat: 'Charizard' });
 * // etc, etc
 * ```
 * Available logging levels are specified in the Level enum. The hierarchy is as follows:
 * ```
 * off > error > warn > info > debug > all
 * ```
 * Logger only sends messages whose level is greater than or equal to the global log level
 * ```js
 * // Global level is 'warn'
 * Logger.info('This message won't log');
 * Logger.error('But this one will!');
 * ```
 * Logger's default level is 'off', so set desired level before use
 * ```js
 * Logger.setLogLevel(Level.all);
 * ```
 */
class Logger {
    /**
     * Sets the global log level
     * @param {Level} level
     */
    static setLogLevel(level) {
        this.logLevel = level;
    }
    /**
     * Logs to debug if level is enabled
     * @param {string} message
     * @param {...*} objects additional objects to log (optional rest parameter)
     */
    static log(message, ...objects) {
        if (this.isLevelPermitted(Level.debug)) {
            console.log(message, ...objects);
        }
    }
    /**
     * Logs to debug if level is enabled
     * @param {string} message
     * @param {...*} objects additional objects to log (optional rest parameter)
     */
    static debug(message, ...objects) {
        if (this.isLevelPermitted(Level.debug)) {
            console.debug(message, ...objects);
        }
    }
    /**
     * Logs to info if level is enabled
     * @param {string} message
     * @param {...*} objects additional objects to log (optional rest parameter)
     */
    static info(message, ...objects) {
        if (this.isLevelPermitted(Level.info)) {
            console.info(message, ...objects);
        }
    }
    /**
     * Logs to warn if level is enabled
     * @param {string} message
     * @param {...*} objects additional objects to log (optional rest parameter)
     */
    static warn(message, ...objects) {
        if (this.isLevelPermitted(Level.warn)) {
            console.warn(message, ...objects);
        }
    }
    /**
     * Logs to error if level is enabled
     * @param {string} message
     * @param {...*} objects additional objects to log (optional rest parameter)
     */
    static error(message, ...objects) {
        if (this.isLevelPermitted(Level.error)) {
            console.error(message, ...objects);
        }
    }
    static isLevelPermitted(level) {
        return this.logLevel <= level;
    }
}
Logger.logLevel = Level.off;

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Determines if a given IGroup is an update group
 * @param {IGroup} group The group to evaluate
 */
function isUpdateGroup(group) {
    return group.capabilities.includes("updateitemcontrol");
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Runs the given task and returns a IRevertableTaskResult
 * @param {Function} task A task method to run
 * @param {Function} revert A method to revert the task
 * @returns {Promise<IRevertableTaskResult>}
 */
const runRevertableTask = (task, revert) => {
    return task()
        .then(results => {
        return {
            status: "fullfilled",
            results,
            revert
        };
    })
        .catch(error => {
        return { status: "rejected", error };
    });
};
/**
 * Processes an Array of Promise<IRevertableTaskResult>. When all IRevertableTaskResult
 * are IRevertableTaskSuccess, it resolves an Array of all result values. If any
 * IRevertableTaskResult are IRevertableTaskFailed, it reverts all IRevertableTaskSuccess
 * and rejects with the first IRevertableTaskFailed error
 * @param revertableTasks
 * @returns {Promise<any[]>}
 */
const processRevertableTasks = (revertableTasks) => {
    return Promise.all(revertableTasks).then(results => {
        const isFullfilled = (result) => result.status === "fullfilled";
        const successfulTasks = results.filter(isFullfilled);
        const failedTasks = results.filter((result) => !isFullfilled(result));
        if (failedTasks.length) {
            const reverts = successfulTasks.map(task => task.revert());
            // fire & forget
            /* tslint:disable no-empty */
            Promise.all(reverts).catch(() => { });
            /* tslint:enable no-empty */
            throw failedTasks[0].error;
        }
        const returnResults = successfulTasks.map((result) => result.results);
        return returnResults;
    });
};

/**
 * Checks for fundamental privilege required by all access checks
 * @param {IUser} user
 * @returns {boolean}
 */
function hasBasePriv(user) {
    const { privileges = [] } = user;
    return includes(privileges, "portal:user:createItem");
}

/**
 * Checks if user has access to edit an event in Hub
 * @param {IEventModel} model consolidated event model as consumed by Hub, contains the event feature, related initiative model, and attendees group
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditEvent(model, user) {
    let res = false;
    if (hasBasePriv(user)) {
        const coreTeamId = getProp(model, "initiative.item.properties.collaborationGroupId");
        const { groups = [] } = user;
        res = !!coreTeamId && !!findBy(groups, "id", coreTeamId);
    }
    return res;
}

/**
 * Checks if user has access to edit an item in Hub
 * @param {IItem} item
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditItem(item, user) {
    let res = false;
    const itemControls = ["admin", "update"];
    const { itemControl, owner, orgId: itemOrgId } = item;
    const { roleId, role, username, groups: userGroups, orgId: userOrgId } = user;
    const hasItemControl = includes(itemControls, itemControl);
    const isOwner = !!owner && owner === username;
    const isOrgItem = !!itemOrgId && itemOrgId === userOrgId;
    const isItemOrgAdmin = !!isOrgItem && !roleId && role === "org_admin";
    const hasPlatformControl = hasItemControl || isOwner || isItemOrgAdmin;
    const hasPriv = hasBasePriv(user);
    if (hasPriv && hasPlatformControl) {
        res = true;
    }
    else if (hasPriv) {
        const itemGroups = [
            ...(getProp(item, "groupIds") || []),
            getProp(item, "properties.collaborationGroupId")
        ];
        const isGroupEditable = (group) => isUpdateGroup(group) && includes(itemGroups, group.id);
        res = userGroups.some(isGroupEditable);
    }
    return res;
}

const REQUIRED_PRIVS = [
    "portal:user:createGroup",
    "portal:user:createItem",
    "portal:user:shareToGroup",
    "portal:user:viewOrgGroups",
    "portal:user:viewOrgItems"
];
/**
 * Checks if user has access to content library in Hub
 * In Hub Home context, user access requires additional privileges
 * In initiative context, check is delegated to canEditItem for the initiative site item
 * @param {IItem} item
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditSiteContent(item, user) {
    let res = false;
    const isDefaultHubHome = getProp(item, "properties.isDefaultHubHome");
    const hasPriv = hasBasePriv(user);
    if (!isDefaultHubHome && hasPriv) {
        res = canEditItem(item, user);
    }
    else if (hasPriv) {
        const userOrgId = user.orgId;
        const itemOrgId = item.orgId;
        const sameOrg = !!userOrgId && userOrgId === itemOrgId;
        if (sameOrg) {
            const privileges = user.privileges || [];
            res = REQUIRED_PRIVS.every(privilege => includes(privileges, privilege));
        }
    }
    return res;
}

/**
 * Checks if user has access to edit site in Hub
 * Currently, Hub Home sites are not editable
 * In initiative context, check is delegated to canEditItem for the initiative site item
 * @param {IItem} model
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditSite(model, user) {
    let res = false;
    const isDefaultHubHome = getProp(model, "properties.isDefaultHubHome");
    if (!isDefaultHubHome && hasBasePriv(user)) {
        res = canEditItem(model, user);
    }
    return res;
}

/**
 * @private
 */
function buildUrl(params) {
    const { host, path, query } = params;
    const baseUrl = host.endsWith("/") ? host : `${host}/`;
    const url = new URL(path, baseUrl);
    url.search = buildQueryString(query);
    return url.toString();
}
function buildQueryString(params = {}) {
    const queryParams = Object.keys(params)
        .filter(key => {
        return params[key] !== undefined;
    })
        .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});
    return new URLSearchParams(queryParams).toString();
}

/**
 * ```js
 * import { getPortalUrl } from "@esri/hub-common";
 * // from a portal API URL
 * let portalUrl = getPortalUrl("https://org.maps.arcgis.com/sharing/rest"); // https://org.maps.arcgis.com
 * // from an enterprise portal self response (IPortal)
 * let portalSelf = { isPortal: true, portalHostname: "server.example.org" };
 * portalUrl = getPortalUrl(portalSelf); // https://server.example.org
 * // from an online portal self response (IPortal)
 * portalSelf = { isPortal: false, urlKey: "org", customBaseUrl: "maps.arcgis.com" };
 * portalUrl = getPortalUrl(portalSelf); // https://org.maps.arcgis.com
 * // from hub request options (IHubRequestOptions) with a portal self (IPortal)
 * let requestOptions = { isPortal: false, portalSelf };
 * portalUrl = getPortalUrl(requestOptions); // https://org.maps.arcgis.com
 * // from request options (IRequestOptions) with a portal (string)
 * requestOptions = { portal: "https://org.maps.arcgis.com/sharing/rest" };
 * portalUrl = getPortalUrl(requestOptions); // https://org.maps.arcgis.com
 * ```
 * Derive a portal's base URL from the portal's API URL, a portal object, or request options
 * @param urlOrObject a portal API URL, a portal object, or request options containing either of those
 * @returns The portal base URL, defaults to `https://www.arcgis.com`
 */
function getPortalUrl(urlOrObject) {
    if (typeof urlOrObject === "string") {
        // assume this is the URL of the portal API
        // and strip the `/sharing/rest`
        return urlOrObject.replace(/\/sharing\/rest\/?$/, "");
    }
    if (typeof urlOrObject === "object") {
        // build URL from portal self object, which could be
        // either a property of the object (request options) or the object itself
        const portalSelf = urlOrObject.portalSelf;
        const portal = portalSelf || urlOrObject;
        const { portalHostname, urlKey, customBaseUrl } = portal;
        if (portalHostname || (urlKey && customBaseUrl)) {
            // user passed in a portal object, we'll use that to build the URL
            if (portal.isPortal) {
                return `https://${portal.portalHostname}`;
            }
            else {
                return `https://${portal.urlKey}.${portal.customBaseUrl}`;
            }
        }
    }
    // urlOrObj is either undefined, or a request options w/o portal self
    // get portal API URL and parse portal URL from that
    return getPortalUrl(getPortalUrl$1(urlOrObject));
}

/**
 * Mapping between the AGO Env's and the Hub's asset CDNs
 */
const HUB_CDN_URLMAP = {
    devext: "https://d1011m9qpnz5mw.cloudfront.net",
    qaext: "https://dyq9ux9ryu4qj.cloudfront.net",
    www: "https://d1iq7pbacwn5rb.cloudfront.net"
};

// TODO: should this take IHubRequestOptions as well as a portal?
// if so, address when we tackle https://github.com/Esri/hub.js/issues/321
/**
 * Given a Portal object, return the full Hub locale asset url
 * Used for fetching translations
 * @param {Object} portal Portal Self
 */
function getHubLocaleAssetUrl(portal) {
    if (portal.isPortal) {
        // Enterprise - use Site app as source for assets
        const baseUrl = getPortalUrl(portal);
        return `${baseUrl}/apps/sites`;
    }
    else {
        // AGO - Convert portalHostname into CDN url
        const index = portal.portalHostname.split(".")[0];
        const base = HUB_CDN_URLMAP[index] || HUB_CDN_URLMAP.www;
        return `${base}/opendata-ui/assets`;
    }
}

/**
 * ```js
 * import { getPortalApiUrl } from "@esri/hub-common";
 * // from a portal base URL
 * let portalApiUrl = getPortalApiUrl("https://org.maps.arcgis.com"); // https://org.maps.arcgis.com/sharing/rest
 * // from an enterprise portal self response (IPortal)
 * let portalSelf = { isPortal: true, portalHostname: "server.example.org" };
 * portalApiUrl = getPortalApiUrl(portalSelf); // https://server.example.org/sharing/rest
 * // from an online portal self response (IPortal)
 * portalSelf = { isPortal: false, urlKey: "org", customBaseUrl: "maps.arcgis.com" };
 * portalApiUrl = getPortalApiUrl(portalSelf); // https://org.maps.arcgis.com/sharing/rest
 * // from hub request options (IHubRequestOptions) with a portal self (IPortal)
 * let requestOptions = { isPortal: false, portalSelf };
 * portalApiUrl = getPortalApiUrl(requestOptions); // https://org.maps.arcgis.com/sharing/rest
 * // from request options (IRequestOptions) with a portal (string)
 * requestOptions = { portal: "https://org.maps.arcgis.com/sharing/rest" };
 * portalApiUrl = getPortalApiUrl(requestOptions); // https://org.maps.arcgis.com/sharing/rest
 * ```
 * Derive a portal's API URL from the portal's base URL, a portal object, or request options
 * @param urlOrObject a portal base URL, a portal object, or request options containing either of those
 * @returns The portal API URL, defaults to `https://www.arcgis.com/sharing/rest`
 */
function getPortalApiUrl(urlOrObject) {
    return `${getPortalUrl(urlOrObject)}/sharing/rest`;
}

/**
 * Add protocol or upgrade http to https
 * @param {string} url
 */
function upgradeProtocol(url) {
    if (url.indexOf("http") === -1) {
        return `https://${url}`;
    }
    else if (url.indexOf("http://") !== -1) {
        return url.replace(/^http:/i, "https:");
    }
    return url;
}

/**
 * Remove protocol if present
 * @param {string} hostname Hostname
 */
function stripProtocol(hostname) {
    hostname = hostname.toLowerCase();
    if (hostname.includes("//")) {
        hostname = hostname.split("//")[1];
    }
    return hostname;
}

/**
 * Given a url without a protocol or with either http or https, return an array
 * that contains both the http and https version
 * @param {string} uri Url with either http or https, or no protocol
 * @private
 */
function _getHttpAndHttpsUris(uri) {
    if (!uri) {
        return [];
    }
    const domain = uri.replace(/^http(s?):\/\//, "");
    return [`http://${domain}`, `https://${domain}`];
}

/**
 * Wrapper over window.location
 * @private
 */
/* istanbul ignore next */
function _getLocation() {
    /* istanbul ignore next */
    if (window) {
        return window.location;
    }
}

/**
 * Parse the portal url, and if it matches one of the AGO
 * Url patterns, return the correct Hub Url
 * If portalUrl does not match an AGO pattern, this will
 * return `undefined`
 * @param portalUrl
 * @private
 */
function _getHubUrlFromPortalHostname(portalUrl) {
    let result;
    if (portalUrl.match(/(qaext|\.mapsqa)\.arcgis.com/)) {
        result = "https://hubqa.arcgis.com";
    }
    else if (portalUrl.match(/(devext|\.mapsdevext)\.arcgis.com/)) {
        result = "https://hubdev.arcgis.com";
    }
    else if (portalUrl.match(/(www|\.maps)\.arcgis.com/)) {
        result = "https://hub.arcgis.com";
    }
    return result;
}

/**
 * Return the Hub Url based on the portal self
 * @param portal
 */
function getHubUrlFromPortal(portal) {
    if (portal.isPortal) {
        throw new Error(`Hub Url is not available in ArcGIS Enterprise`);
    }
    else {
        return _getHubUrlFromPortalHostname(portal.portalHostname);
    }
}

/**
 * Return the Portal url based on the portal self
 * @param {Object} portal Portal Self
 */
function getHubApiUrlFromPortal(portal) {
    return `${getHubUrlFromPortal(portal)}/api/v3`;
}

/**
 * Return the URL of the item's page in the Portal Home application
 * @param itemId The item's ID
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @returns URL to the item's data REST end point, defaults to `https://www.arcgis.com/home/item.html?id={item.id}`
 */
function getItemHomeUrl(itemId, portalUrlOrObject) {
    const portalUrl = getPortalUrl(portalUrlOrObject);
    return `${portalUrl}/home/item.html?id=${itemId}`;
}

// NOTE: this fn is tested via getItemDataUrl tests
/**
 * Get the fully qualified URL to the REST end point for an item.
 * @param item w/ id and access
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @param token token for the current user's session; will only be appended as a query parameter if the item's access is **not** `public`
 * @returns URL to the item's REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{item.id}?f=json`
 */
const getItemApiUrl = (item, portalUrlOrObject, token) => {
    const { id, access } = item;
    const url = `${getPortalApiUrl(portalUrlOrObject)}/content/items/${id}`;
    const params = new URLSearchParams({ f: "json" });
    if (access !== "public" && token) {
        params.append("token", token);
    }
    return `${url}?${params.toString()}`;
};

/**
 * Get the fully qualified URL to the data REST end point for an item
 * @param item w/ id and access
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @param token token for the current user's session; will only be appended as a query parameter if the item's access is **not** `public`
 * @returns URL to the item's data REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{item.id}/data`
 */
const getItemDataUrl = (item, portalUrlOrObject, token) => {
    const url = getItemApiUrl(item, portalUrlOrObject, token);
    const pattern = `\\/${item.id}\\?f=json`;
    const regExp = new RegExp(pattern);
    // TODO: re-append f param based on item.type?
    return (url && url.replace(regExp, `/${item.id}/data`).replace(/\&token/, "?token"));
};

const MAP_OR_FEATURE_SERVER_URL_REGEX = /\/(map|feature)server/i;
/**
 *
 * @param url
 * @returns true if the url is of a map or feature service
 */
const isMapOrFeatureServerUrl = (url) => {
    return MAP_OR_FEATURE_SERVER_URL_REGEX.test(url);
};
/**
 * parses map or feature service type from URL
 * @param url map or feature service URL
 * @returns item type, either "Map Service" or "Feature Service"
 * or undefined for other types of URLs
 */
const getServiceTypeFromUrl = (url) => {
    const match = url.match(MAP_OR_FEATURE_SERVER_URL_REGEX);
    const mapOrFeature = match && match[1];
    return mapOrFeature && `${capitalize(mapOrFeature)} Service`;
};

/**
 * ```js
 * import { getHubApiUrl() } from "@esri/hub-common";
 * //
 * getHubApiUrl({ portal: "https://custom.maps.arcgis.com/sharing/rest" })
 * >> "https://hub.arcgis.com"
 * ```
 * Retrieves the Hub API Url associated with a specific ArcGIS Online organization.
 * @param urlOrObject a Portal URL, Portal API URL, request options object, or Portal self object
 * @returns the associated Hub API Url as a string.
 */
function getHubApiUrl(urlOrObject) {
    const hubApiUrl = urlOrObject && urlOrObject.hubApiUrl;
    if (hubApiUrl) {
        // this is request options w/ hubApiUrl already defined
        return hubApiUrl;
    }
    return _getHubUrlFromPortalHostname(getPortalApiUrl(urlOrObject));
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * A thin wrapper around [`UserSession.completeOAuth2()`](https://esri.github.io/arcgis-rest-js/api/auth/UserSession/#completeOAuth2) that sets search tags and other relevant metadata for newly created community users.
 */
/* istanbul ignore next */
function completeOAuth2(options, win = window) {
    const match = win.location.href.match(/access_token=(.+)&expires_in=.+&username=([^&]+)/);
    const token = match[1];
    const user = decodeURIComponent(match[2]);
    const baseUrl = `https://www.arcgis.com/sharing/rest/community/users/${user}`;
    return request(baseUrl, {
        params: { token },
        httpMethod: "GET"
    }).then(response => {
        if (Date.now() - response.created < 5000) {
            return request(`${baseUrl}/update`, {
                params: {
                    token,
                    tags: ["hubRole:participant", `org:${response.orgId}`],
                    access: "public"
                }
            }).then(() => {
                return UserSession.completeOAuth2(options);
            });
        }
        else {
            return UserSession.completeOAuth2(options);
        }
    });
}

const app$1 = [
    "Application",
    "City Engine Web Scene",
    "CityEngine Web Scene",
    "Dashboard",
    "Insights Page",
    "Insights Workbook",
    "Operation View",
    "Web Mapping Application",
    "StoryMap",
    "Web Experience",
    "Urban Model",
];
const dataset$1 = [
    "CSV Collection",
    "CSV",
    "Feature Collection Template",
    "Feature Collection",
    "Feature Layer",
    "Feature Service",
    "File Geodatabase",
    "GeoJSON",
    "GeoJson",
    "KML Collection",
    "KML",
    "Microsoft Excel",
    "Raster Layer",
    "Shapefile",
    "Stream Service",
    "Table",
];
const document$1 = [
    "CAD Drawing",
    "Document Link",
    "Hub Page",
    "Site Page",
    "Image",
    "iWork Keynote",
    "iWork Numbers",
    "iWork Pages",
    "Microsoft Powerpoint",
    "Microsoft Visio",
    "Microsoft Word",
    "Notebook",
    "PDF",
    "Pro Map",
    "Report Template",
];
const event$1 = ["Hub Event"];
const feedback$1 = ["Form", "Quick Capture Project"];
const initiative$1 = ["Hub Initiative"];
const solution = ["Solution"];
const template = ["Hub Initiative Template"];
const map$1 = [
    "Image Collection",
    "Image Service",
    "Map Service Layer",
    "Map Service",
    "Scene Service",
    "Scene Layer",
    "Vector Tile Service",
    "Web Map Service",
    "Web Map Tile Service",
    "Web Map",
    "Web Scene",
    "WFS",
    "WMS",
    "WMTS",
];
const other$1 = [
    "360 VR Experience",
    "AppBuilder Widget Package",
    "Application Configuration",
    "ArcPad Package",
    "Code Attachment",
    "Code Sample",
    "Desktop Add In",
    "Desktop Application Template",
    "Desktop Application",
    "Desktop Style",
    "Explorer Add In",
    "Explorer Layer",
    "Geocoding Service",
    "Geometry Service",
    "Geoprocessing Package",
    "Geoprocessing Sample",
    "Geoprocessing Service",
    "Layer File",
    "Layer Package",
    "Layer Template",
    "Layer",
    "Layout",
    "Locator Package",
    "Map Area",
    "Map Document",
    "Map Package",
    "Map Service Definition",
    "Map Template",
    "Mobile Application",
    "Mobile Map Package",
    "Native Application",
    "Network Analysis Service",
    "Operations Dashboard Add In",
    "Project Package",
    "Project Template",
    "Raster Function Template",
    "Rule Package",
    "Scene Package",
    "Service Definition",
    "SQLite Geodatabase",
    "Style",
    "Tile Package",
    "Vector Tile Package",
    "Workflow Manager Package",
];
const site$1 = ["Hub Site Application", "Site Application"];
const collections = {
    app: app$1,
    dataset: dataset$1,
    document: document$1,
    event: event$1,
    feedback: feedback$1,
    initiative: initiative$1,
    template,
    solution,
    map: map$1,
    other: other$1,
    site: site$1,
};

const { app, dataset, document, event, feedback, initiative, map, other, site, } = collections;
const downloadableTypes = [
    "360 VR Experience",
    "Application",
    "CityEngine Web Scene",
    "Code Sample",
    "CSV Collection",
    "CSV",
    "CAD Drawing",
    "Desktop Application",
    "Desktop Application Template",
    "Desktop Style",
    "File Geodatabase",
    "GeoJson",
    "Geoprocessing Package",
    "Geoprocessing Sample",
    "Image",
    "iWork Keynote",
    "iWork Numbers",
    "KML Collection",
    "KML",
    "Layer",
    "Layer File",
    "Layer Package",
    "Layout",
    "Locator Package",
    "Map Package",
    "Map Service Definition",
    "Map Template",
    "Microsoft Excel",
    "Microsoft Powerpoint",
    "Microsoft Visio",
    "Microsoft Word",
    "Notebook",
    "Operations Dashboard Add In",
    "PDF",
    "Pro Map",
    "Project Package",
    "Project Template",
    "Raster function template",
    "Rule Package",
    "Service Definition",
    "Shapefile",
    "Vector Tile Package",
    "Workflow Manager Package",
];
const downloadableTypeKeywords = ["Data"];
const apiTypes = ["Feature Service", "Map Service", "Image Service"];
// TODO: remove this at next breaking version
// we're just keeping this for backwards compatibility
const categories = {
    app: app.concat(feedback),
    dataset,
    document,
    event,
    initiative,
    map,
    other,
    site,
    downloadableTypes,
    downloadableTypeKeywords,
    apiTypes,
};
// TODO: move this function and supporting arrays to another module
/**
 * Is the item type downloadable in the Hub app
 * @param item ArcGIS item with type and type keywords
 */
function isDownloadable(item) {
    return (downloadableTypes.indexOf(item.type) !== -1 ||
        (item.typeKeywords &&
            downloadableTypeKeywords.some((downloadableTypeKeyword) => item.typeKeywords.some((typeKeyword) => typeKeyword === downloadableTypeKeyword))));
}

function createExtent(xmin, ymin, xmax, ymax, wkid = 4326) {
    return {
        xmin,
        ymin,
        xmax,
        ymax,
        // type: 'extent',
        spatialReference: {
            wkid
        }
    };
}
/**
 * Turns an extent into a bbox
 * @param envelope extent
 */
function extentToBBox(envelope) {
    return [[envelope.xmin, envelope.ymin], [envelope.xmax, envelope.ymax]];
}
const GLOBAL_EXTENT = {
    xmin: -180,
    ymin: -90,
    xmax: 180,
    ymax: 90,
    spatialReference: {
        wkid: 4326
    }
};
/**
 * Gets the geographic extent for an org
 * @param hubRequestOptions
 */
function getGeographicOrgExtent(hubRequestOptions) {
    const portal = hubRequestOptions.portalSelf;
    const orgExtent = portal.defaultExtent;
    const geometryServiceUrl = getProp(portal, "helperServices.geometry.url");
    // Define a default global extent object
    if (!geometryServiceUrl) {
        return Promise.resolve(GLOBAL_EXTENT);
    }
    if (!orgExtent) {
        return Promise.resolve(GLOBAL_EXTENT);
    }
    const url = `${geometryServiceUrl}/project`;
    // geometry params...
    const geometryParam = {
        geometryType: "esriGeometryEnvelope",
        geometries: [orgExtent]
    };
    const options = {
        httpMethod: "POST",
        params: {
            geometries: JSON.stringify(geometryParam),
            transformForward: false,
            transformation: "",
            inSR: orgExtent.spatialReference.wkid,
            outSR: 4326,
            f: "json"
        }
    };
    // add in auth if it's passed
    if (hubRequestOptions.authentication) {
        options.authentication = hubRequestOptions.authentication;
    }
    return request(url, options)
        .then(response => {
        const geom = response.geometries[0];
        return {
            xmin: geom.xmin,
            ymin: geom.ymin,
            xmax: geom.xmax,
            ymax: geom.ymax,
            spatialReference: {
                wkid: 4326
            }
        };
    })
        .catch(ex => {
        return GLOBAL_EXTENT;
    });
}
/**
 * Get the default org extent as a bbox for use on item.extent
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getOrgExtentAsBBox(hubRequestOptions) {
    return getGeographicOrgExtent(hubRequestOptions).then(extent => extentToBBox(extent));
}
function isExtentCoordinateArray(extent) {
    return (Array.isArray(extent) &&
        Array.isArray(extent[0]) &&
        Array.isArray(extent[1]));
}
function isExtentJSON(extent) {
    return ["xmin", "ymin", "xmax", "ymax"].every(key => typeof extent[key] === "number");
}
/**
 * Check if the given extent is in a known format
 * @param  {Object} extent extent in any format
 * @return {Boolean}       indicator
 */
function isValidExtent(extent) {
    return (!!extent &&
        [isExtentCoordinateArray, isExtentJSON].some(test => test(extent)));
}

const STANDARD_LICENSES = [
    {
        type: "CC0-1.0",
        abbr: "CC0",
        name: "Public Domain Dedication",
        url: "http://creativecommons.org/publicdomain/zero/1.0",
    },
    {
        type: "CC-BY-4.0",
        abbr: "CC BY",
        name: "Attribution 4.0 International",
        url: "http://creativecommons.org/licenses/by/4.0",
    },
    {
        type: "CC-BY-3.0",
        abbr: "CC BY 3.0",
        name: "Attribution 3.0 Unported",
        url: "http://creativecommons.org/licenses/by/3.0",
    },
    {
        type: "CC-BY-2.5",
        abbr: "CC BY 2.5",
        name: "Attribution 2.5 Generic",
        url: "http://creativecommons.org/licenses/by/2.5",
    },
    {
        type: "CC-BY-2.0",
        abbr: "CC BY 2.0",
        name: "Attribution 2.0 Generic",
        url: "http://creativecommons.org/licenses/by/2.0",
    },
    {
        type: "CC-BY-1.0",
        abbr: "CC BY 1.0",
        name: "Attribution 1.0 Generic",
        url: "http://creativecommons.org/licenses/by/1.0",
    },
    {
        type: "CC-BY-SA-4.0",
        abbr: "CC BY-SA",
        name: "Attribution-ShareAlike 4.0 International",
        url: "http://creativecommons.org/licenses/by-sa/4.0",
    },
    {
        type: "CC-BY-SA-3.0",
        abbr: "CC BY-SA 3.0",
        name: "Attribution-ShareAlike 3.0 Unported",
        url: "http://creativecommons.org/licenses/by-sa/3.0",
    },
    {
        type: "CC-BY-SA-2.5",
        abbr: "CC BY-SA 2.5",
        name: "Attribution-ShareAlike 2.5 Generic",
        url: "http://creativecommons.org/licenses/by-sa/2.5",
    },
    {
        type: "CC-BY-SA-2.0",
        abbr: "CC BY-SA 2.0",
        name: "Attribution-ShareAlike 2.0 Generic",
        url: "http://creativecommons.org/licenses/by-sa/2.0",
    },
    {
        type: "CC-BY-SA-1.0",
        abbr: "CC BY-SA 1.0",
        name: "Attribution-ShareAlike 1.0 Generic",
        url: "http://creativecommons.org/licenses/by-sa/1.0",
    },
    {
        type: "CC-BY-ND-4.0",
        abbr: "CC BY-ND",
        name: "Attribution-NoDerivatives 4.0 International",
        url: "http://creativecommons.org/licenses/by-nd/4.0",
    },
    {
        type: "CC-BY-ND-3.0",
        abbr: "CC BY-ND 3.0",
        name: "Attribution-NoDerivs 3.0 Unported",
        url: "http://creativecommons.org/licenses/by-nd/3.0",
    },
    {
        type: "CC-BY-ND-2.5",
        abbr: "CC BY-ND 2.5",
        name: "Attribution-NoDerivs 2.5 Generic",
        url: "http://creativecommons.org/licenses/by-nd/2.5",
    },
    {
        type: "CC-BY-ND-2.0",
        abbr: "CC BY-ND 2.0",
        name: "Attribution-NoDerivs 2.0 Generic",
        url: "http://creativecommons.org/licenses/by-nd/2.0",
    },
    {
        type: "CC-BY-ND-1.0",
        abbr: "CC BY-ND 1.0",
        name: "Attribution-NoDerivs 1.0 Generic",
        url: "http://creativecommons.org/licenses/by-nd/1.0",
    },
    {
        type: "CC-BY-NC-4.0",
        abbr: "CC BY-NC",
        name: "Attribution-NonCommercial 4.0 International",
        url: "https://creativecommons.org/licenses/by-nc/4.0",
    },
    {
        type: "CC-BY-NC-3.0",
        abbr: "CC BY-NC 3.0",
        name: "Attribution-NonCommercial 3.0 Unported",
        url: "https://creativecommons.org/licenses/by-nc/3.0",
    },
    {
        type: "CC-BY-NC-2.5",
        abbr: "CC BY-NC 2.5",
        name: "Attribution-NonCommercial 2.5 Generic",
        url: "https://creativecommons.org/licenses/by-nc/2.5",
    },
    {
        type: "CC-BY-NC-2.0",
        abbr: "CC BY-NC 2.0",
        name: "Attribution-NonCommercial 2.0 Generic",
        url: "https://creativecommons.org/licenses/by-nc/2.0",
    },
    {
        type: "CC-BY-NC-1.0",
        abbr: "CC BY-NC 1.0",
        name: "Attribution-NonCommercial 1.0 Generic",
        url: "https://creativecommons.org/licenses/by-nc/1.0",
    },
    {
        type: "CC-BY-NC-SA-4.0",
        abbr: "CC BY-NC-SA",
        name: "Attribution-NonCommercial-ShareAlike 4.0 International",
        url: "https://creativecommons.org/licenses/by-nc-sa/4.0",
    },
    {
        type: "CC-BY-NC-SA-3.0",
        abbr: "CC BY-NC-SA 3.0",
        name: "Attribution-NonCommercial-ShareAlike 3.0 Unported",
        url: "https://creativecommons.org/licenses/by-nc-sa/3.0",
    },
    {
        type: "CC-BY-NC-SA-2.5",
        abbr: "CC BY-NC-SA 2.5",
        name: "Attribution-NonCommercial-ShareAlike 2.5 Generic",
        url: "https://creativecommons.org/licenses/by-nc-sa/2.5",
    },
    {
        type: "CC-BY-NC-SA-2.0",
        abbr: "CC BY-NC-SA 2.0",
        name: "Attribution-NonCommercial-ShareAlike 2.0 Generic",
        url: "https://creativecommons.org/licenses/by-nc-sa/2.0",
    },
    {
        type: "CC-BY-NC-SA-1.0",
        abbr: "CC BY-NC-SA 1.0",
        name: "Attribution-NonCommercial-ShareAlike 1.0 Generic",
        url: "https://creativecommons.org/licenses/by-nc-sa/1.0",
    },
    {
        type: "CC-BY-NC-ND-4.0",
        abbr: "CC BY-NC-ND",
        name: "Attribution-NonCommercial-NoDerivatives 4.0 International",
        url: "https://creativecommons.org/licenses/by-nc-nd/4.0",
    },
    {
        type: "CC-BY-NC-ND-3.0",
        abbr: "CC BY-NC-ND 3.0",
        name: "Attribution-NonCommercial-NoDerivs 3.0 Unported",
        url: "https://creativecommons.org/licenses/by-nc-nd/3.0",
    },
    {
        type: "CC-BY-NC-ND-2.5",
        abbr: "CC BY-NC-ND 2.5",
        name: "Attribution-NonCommercial-NoDerivs 2.5 Generic",
        url: "https://creativecommons.org/licenses/by-nc-nd/2.5",
    },
    {
        type: "CC-BY-NC-ND-2.0",
        abbr: "CC BY-NC-ND 2.0",
        name: "Attribution-NonCommercial-NoDerivs 2.0 Generic",
        url: "https://creativecommons.org/licenses/by-nc-nd/2.0",
    },
    {
        type: "CC-BY-NC-ND-1.0",
        abbr: "CC BY-NC-ND 1.0",
        name: "Attribution-NonCommercial-NoDerivs 1.0 Generic",
        url: "https://creativecommons.org/licenses/by-nc-nd/1.0",
    },
    {
        type: "PDDL-1.0",
        abbr: "PDDL",
        name: "ODC Public Domain Dedication and License",
        url: "http://opendatacommons.org/licenses/pddl/summary",
    },
    {
        type: "ODbL-1.0",
        abbr: "ODbL",
        name: "ODC Open Database License",
        url: "http://opendatacommons.org/licenses/odbl/summary",
    },
    {
        type: "ODC-BY-1.0",
        abbr: "ODC BY",
        name: "ODC Attribution License",
        url: "http://opendatacommons.org/licenses/by/summary",
    },
];
/**
 * generates the structured license of an item based on its
 * configured "licenseInfo"
 * @param rawLicense an item's raw licenseInfo string
 * @returns {IStructuredLicense}
 */
function getStructuredLicense(rawLicense) {
    let structuredLicense;
    rawLicense = rawLicense || "";
    // (1) start by assuming it's either a custom license, or, if there's no
    // raw license, then there's no license at all
    structuredLicense = {
        type: rawLicense ? "custom" : "none",
        text: rawLicense,
    };
    // (2) Check for standard licenses: If the name, abbr, or url of any standard
    // license is in the raw license text, we assume that is the license.
    let hasStandardLicense = false;
    const matchingStandardLicenses = STANDARD_LICENSES.filter((standardLicense) => {
        return licenseTextContainsStandardLicenseAttributes(rawLicense, standardLicense);
    });
    if (matchingStandardLicenses.length) {
        hasStandardLicense = true;
        structuredLicense = matchingStandardLicenses.pop();
    }
    // (3) if not a standard license, we check if the raw license is a url or link
    if (!hasStandardLicense) {
        let url;
        // a. check if the the raw license is simply a url
        if (isParseableAsURL(rawLicense)) {
            url = rawLicense;
        }
        // b. check if the raw license is simply a link (i.e. an anchor tag with an href)
        else if (isSingleAnchorWithHrefAttribute(rawLicense)) {
            const hrefRegex = new RegExp(/href\s?=\s?["'](.*?)["']/);
            const match = rawLicense.match(hrefRegex);
            const href = match[1];
            url = href;
        }
        if (url) {
            structuredLicense.url = url;
            structuredLicense.text = "";
        }
    }
    if (!structuredLicense.text)
        delete structuredLicense.text;
    return structuredLicense;
}
/**
 * helper function to determine if a raw license is one of the standard licenses.
 * We say it is if the raw license includes the name, url or abbreviation of the
 * standard license
 * @param rawLicense an item's raw licenseInfo string
 * @param standardLicense one of the standard licenses
 * @returns {boolean}
 */
function licenseTextContainsStandardLicenseAttributes(rawLicense, standardLicense) {
    rawLicense = rawLicense.toLowerCase();
    return (rawLicense.includes(standardLicense.name.toLowerCase()) ||
        rawLicense.includes(standardLicense.url.toLowerCase()) ||
        rawLicense.includes(standardLicense.abbr.toLowerCase()));
}
/**
 * helper function to determine if an input string can be parsed
 * as a URL with a protocol
 * @param value string to check
 * @returns {boolean}
 */
function isParseableAsURL(value) {
    try {
        const url = new URL(value);
        return !!url.protocol;
    }
    catch (err) {
        // just return fals if the URL couldn't be parsed
        return false;
    }
}
/**
 * helper function to determine if the raw license is simply a link, i.e. a single
 * anchor tag with an href attribute: <a href="https://google.com">Click</a> or <a href="https://google.com" />
 * @param rawLicense an item's raw licenseInfo string
 * @returns {boolean}
 */
function isSingleAnchorWithHrefAttribute(rawLicense) {
    const isSingleAnchorTagRegex = new RegExp(/^<a[\s]+(href\s?=\s?["'].*?["'])+([^>]?)>((?:.(?!\<\/a\>))*.)?<\/a>$|^<a[\s]+(href\s?=\s?["'].*?["'])+([^>]?)\/>/);
    return isSingleAnchorTagRegex.test(rawLicense);
}

function collectionToFamily(collection) {
    const overrides = {
        other: "content",
        solution: "template",
    };
    return overrides[collection] || collection;
}
function itemExtentToBoundary(extent) {
    return (extent &&
        extent.length && {
        // TODO: center?
        geometry: createExtent(extent[0][0], extent[0][1], extent[1][0], extent[1][1]),
    });
}
const cache = {};
// TODO: remove this at next breaking version
/**
 * ```js
 * import { getCategory } from "@esri/hub-common";
 * //
 * getCategory('Feature Layer')
 * > 'dataset'
 * ```
 * **DEPRECATED: Use getCollection() instead**
 * returns the Hub category for a given item type
 * @param itemType The ArcGIS [item type](https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm).
 * @returns the category of a given item type.
 */
function getCategory(itemType = "") {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: Use getCollection() instead. getCategory will be removed at v10.0.0");
    /* tslint:enable no-console */
    const collection = getCollection(itemType);
    // for backwards compatibility
    return collection === "feedback" ? "app" : collection;
}
/**
 * ```js
 * import { getTypes } from "@esri/hub-common";
 * //
 * getTypes('site')
 * > [ 'hub site application' ]
 * ```
 * To do.
 * @param category The ArcGIS Hub category.
 * @returns all the item types for the given category.
 *
 */
function getTypes(category = "") {
    return categories[category.toLowerCase()];
}
/**
 * ```js
 * import { normalizeItemType } from "@esri/hub-common";
 * //
 * normalizeItemType(item)
 * > [ 'Hub Site Application' ]
 * ```
 * @param item Item object.
 * @returns type of the input item.
 *
 */
function normalizeItemType(item = {}) {
    let ret = item.type;
    const typeKeywords = item.typeKeywords || [];
    if (item.type === "Site Application" ||
        (item.type === "Web Mapping Application" &&
            includes(typeKeywords, "hubSite"))) {
        ret = "Hub Site Application";
    }
    if (item.type === "Site Page" ||
        (item.type === "Web Mapping Application" &&
            includes(typeKeywords, "hubPage"))) {
        ret = "Hub Page";
    }
    if (item.type === "Hub Initiative" &&
        includes(typeKeywords, "hubInitiativeTemplate")) {
        ret = "Hub Initiative Template";
    }
    if (item.type === "Web Mapping Application" &&
        includes(typeKeywords, "hubSolutionTemplate")) {
        ret = "Solution";
    }
    return ret;
}
/**
 * ```js
 * import { getTypeCategories } from "@esri/hub-common";
 * //
 * getTypeCategories(item)
 * > [ 'Hub Site Application' ]
 * ```
 * @param item Item object.
 * @returns typeCategory of the input item.
 *
 */
function getTypeCategories(item = {}) {
    const type = normalizeItemType(item);
    const category = getCategory(type);
    if (category) {
        // upper case first letter and return as element in array for backwards compatibility
        const chars = Array.from(category);
        chars[0] = chars[0].toUpperCase();
        return [chars.join("")];
    }
    else {
        return ["Other"];
    }
}
/**
 * ```js
 * import { getCollection } from "@esri/hub-common";
 * //
 * getCollection('Feature Layer')
 * > 'dataset'
 * ```
 * Get the Hub collection for a given item type
 * @param itemType The ArcGIS [item type](https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm).
 * @returns the Hub collection of a given item type.
 */
function getCollection(itemType = "") {
    if (cache[itemType]) {
        return cache[itemType];
    }
    for (const collection of Object.keys(collections)) {
        for (const type of collections[collection]) {
            if (itemType.toLowerCase() === type.toLowerCase()) {
                cache[itemType] = collection;
                return collection;
            }
        }
    }
}
/**
 * Case-insensitive check if the type is "Feature Service"
 * @param {string} type - item's type
 * @returns {boolean}
 */
const isFeatureService = (type) => {
    return type && type.toLowerCase() === "feature service";
};
/**
 * parse layer id from a service URL
 * @param {string} url
 * @returns {string} layer id
 */
const getLayerIdFromUrl = (url) => {
    const endsWithNumberSegmentRegEx = /\/\d+$/;
    const matched = url && url.match(endsWithNumberSegmentRegEx);
    return matched && matched[0].slice(1);
};
/**
 * return the layerId if we can tell that item is a single layer service
 * @param {*} item from AGO
 * @returns {string} layer id
 */
const getItemLayerId = (item) => {
    // try to parse it from the URL, but failing that we check for
    // the Singlelayer typeKeyword, which I think is set when you create the item in AGO
    // but have not verified that, nor that we should alway return '0' in that case
    return (getLayerIdFromUrl(item.url) ||
        (isFeatureService(item.type) &&
            includes(item.typeKeywords, "Singlelayer") &&
            "0"));
};
/**
 * given an item, get the id to use w/ the Hub API
 * @param item
 * @returns Hub API id (hubId)
 */
const getItemHubId = (item) => {
    if (item.access !== "public") {
        // the hub only indexes public items
        return;
    }
    const id = item.id;
    const layerId = getItemLayerId(item);
    return layerId ? `${id}_${layerId}` : id;
};
/**
 * ```js
 * import { getContentIdentifier } from "@esri/hub-common";
 * //
 * getContentIdentifier(content, site)
 * > 'f12hhjk32' // id
 * // OR
 * > 'content-slug' // human-readable slug
 * ```
 * Returns the preferred identifier for a piece of content (determined by content type):
 * - Content from the 'template' and 'feedback' families return the standard id field
 * - Pages that are linked to the site parameter will return the slug defined by the site. Otherwise, the page id will be returned
 * - All other content will return the highest available item in the following hierarchy:
 *   1. slug - includes org prefix if the site parameter is a portal or has an orgKey different from the slug prefix
 *   2. hubId
 *   3. id
 * @param content The IHubContent item
 * @param site The site to compare content against
 * @returns the preferred id for the given content.
 */
function getContentIdentifier(content, site) {
    // We don't currently support slugs for hub initiative templates, solutions or surveys
    if (includes(["template", "feedback"], content.family)) {
        return content.id;
    }
    // If it is a hub page linked to a site, return the page slug at the
    // site data instead. Because this one is the original one that was used
    // to create the page url (not mutable once created) and the slug (below)
    // generated by the hub-indexer could simply change with page name.
    if (isPageContent(content)) {
        // check if the page is linked to the current site
        const pages = getProp(site, "data.values.pages") || [];
        // if so, return the page slug otherwise the page id
        const page = pages.find((p) => p.id === content.id);
        return page ? page.slug : content.id;
    }
    // If a slug is present, always return it
    if (content.slug) {
        let slug;
        const orgKey = getProp(site, "domainInfo.orgKey");
        // Use namespaced slug when on the umbrella site
        if (getProp(site, "data.values.isUmbrella")) {
            slug = content.slug;
        }
        else {
            // Use shortened slug if the slug's namespace is the same as the orgKey
            slug = removeContextFromSlug(content.slug, orgKey);
        }
        return slug;
    }
    return content.hubId || content.id;
}
//////////////////////
// Slug Helpers
//////////////////////
/**
 * Parse item ID and layer ID (if any) from dataset record ID
 *
 * @param datasetId Hub API dataset record id ({itemId}_{layerId} or {itemId})
 * @returns A hash with the `itemId` and `layerId` (if any)
 */
function parseDatasetId(datasetId) {
    const [itemId, layerId] = datasetId ? datasetId.split("_") : [];
    return { itemId, layerId };
}
/**
 * Determine if an identifier is a Hub API slug
 *
 * @param identifier Hub API slug ({orgKey}::{title-as-slug} or {title-as-slug})
 * or record id ((itemId}_{layerId} or {itemId})
 * @returns true if the identifier is valid _and_ is **not** a record id
 */
function isSlug(identifier) {
    const { itemId } = parseDatasetId(identifier);
    if (!itemId || isGuid(itemId)) {
        // it's either invalid, or an item id, or a dataset id
        return false;
    }
    // otherwise assume it's a slug
    return true;
}
/**
 * Add a context (prefix) to slug if it doesn't already have one
 *
 * @param slug Hub API slug (with or without context)
 * @param context usually a portal's orgKey
 * @returns slug with context ({context}::{slug})
 */
function addContextToSlug(slug, context) {
    // the slug has an org key already e.g. dc::crime-incidents
    if (/.+::.+/.test(slug)) {
        return slug;
        // the slug belongs to the org that owns the site e.g. crime-incidents
    }
    else {
        return `${context}::${slug}`;
    }
}
/**
 * Remove context (prefix) from a slug
 *
 * @param slug Hub API slug with context
 * @param context usually a portal's orgKey
 * @returns slug without context
 */
function removeContextFromSlug(slug, context) {
    if (context && slug.match(`${context}::`)) {
        return slug.split(`${context}::`)[1];
    }
    else {
        return slug;
    }
}
/**
 * Splits item category strings at slashes and discards the "Categories" keyword
 *
 * ```
 * ["/Categories/Boundaries", "/Categories/Planning and cadastre/Property records", "/Categories/Structure"]
 * ```
 * Should end up being
 * ```
 * ["Boundaries", "Planning and cadastre", "Property records", "Structure"]
 * ```
 *
 * @param categories - an array of strings
 * @private
 */
function parseItemCategories(categories) {
    if (!categories)
        return categories;
    const exclude = ["categories", ""];
    const parsed = categories.map((cat) => cat.split("/"));
    const flattened = parsed.reduce((acc, arr, _) => [...acc, ...arr], []);
    return flattened.filter((cat) => !includes(exclude, cat.toLowerCase()));
}
/**
 * return the Hub family given an item's type
 * @param type item type
 * @returns Hub family
 */
function getFamily(type) {
    let family;
    // override default behavior for the rows that are highlighted in yellow here:
    // https://esriis.sharepoint.com/:x:/r/sites/ArcGISHub/_layouts/15/Doc.aspx?sourcedoc=%7BADA1C9DC-4F6C-4DE4-92C6-693EF9571CFA%7D&file=Hub%20Routes.xlsx&nav=MTBfe0VENEREQzI4LUZFMDctNEI0Ri04NjcyLThCQUE2MTA0MEZGRn1fezIwMTIwMEJFLTA4MEQtNEExRC05QzA4LTE5MTAzOUQwMEE1RH0&action=default&mobileredirect=true&cid=df1c874b-c367-4cea-bc13-7bebfad3f2ac
    switch ((type || "").toLowerCase()) {
        case "image service":
            family = "dataset";
            break;
        case "feature service":
        case "raster layer":
            // TODO: check if feature service has > 1 layer first?
            family = "map";
            break;
        case "microsoft excel":
            family = "document";
            break;
        case "cad drawing":
        case "feature collection template":
        case "report template":
            family = "content";
            break;
        default:
            // by default derive from collection
            family = collectionToFamily(getCollection(type));
    }
    return family;
}
/**
 * DEPRECATED: Use getFamily() instead.
 *
 * get the HubType for a given item or item type
 *
 * @param itemOrType an item or item.type
 */
function getItemHubType(itemOrType) {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: Use getFamily() instead. getItemHubType() will be removed at v10.0.0");
    /* tslint:enable no-console */
    if (typeof itemOrType === "string") {
        itemOrType = { type: itemOrType };
    }
    const itemType = normalizeItemType(itemOrType);
    // TODO: not all categories are Hub types, may need to validate
    return getCollection(itemType);
}
/**
 * Convert a Portal item to Hub content
 *
 * @param item Portal Item
 * @returns Hub content
 * @export
 */
function itemToContent(item) {
    const createdDate = new Date(item.created);
    const createdDateSource = "item.created";
    const properties = item.properties;
    const content = Object.assign({}, item, {
        identifier: item.id,
        // no server errors when fetching the item directly
        errors: [],
        // store a reference to the item
        item,
        // NOTE: this will overwrite any existing item.name, which is
        // The file name of the item for file types. Read-only.
        // presumably there to use as the default file name when downloading
        // we don't store item.name in the Hub API and we use name for title
        name: item.title,
        // TODO: hubType is no longer used, remove it at next breaking change
        hubType: getItemHubType(item),
        categories: parseItemCategories(item.categories),
        itemCategories: item.categories,
        // can we strip HTML from description, and do we need to trim it to a X chars?
        summary: item.snippet || item.description,
        publisher: {
            name: item.owner,
            username: item.owner,
        },
        permissions: {
            visibility: item.access,
            control: item.itemControl || "view",
        },
        // Hub app configuration metadata from item properties
        actionLinks: properties && properties.links,
        hubActions: properties && properties.actions,
        metrics: properties && properties.metrics,
        isDownloadable: isDownloadable(item),
        // default boundary from item.extent
        boundary: itemExtentToBoundary(item.extent),
        license: { name: "Custom License", description: item.accessInformation },
        // dates and sources we will enrich these later...
        createdDate,
        createdDateSource,
        publishedDate: createdDate,
        publishedDateSource: createdDateSource,
        updatedDate: new Date(item.modified),
        updatedDateSource: "item.modified",
        structuredLicense: getStructuredLicense(item.licenseInfo),
    });
    return setContentType(content, item.type);
}
/**
 * Convert a Hub API dataset resource to Hub Content
 *
 * @param {DatasetResource} Dataset resource
 * @returns {IHubContent} Hub content object
 * @export
 */
function datasetToContent(dataset) {
    // extract item from dataset, create content from the item
    const item = datasetToItem(dataset);
    const content = itemToContent(item);
    // We remove these because the indexer doesn't actually
    // preserve the original item categories so this attribute is invalid
    delete content.itemCategories;
    // overwrite or add enrichments from Hub API
    const { id: hubId, attributes } = dataset;
    const { 
    // common enrichments
    errors, boundary, extent, metadata, modified, modifiedProvenance, slug, searchDescription, groupIds, 
    // map and feature server enrichments
    server, layers, 
    // NOTE: the Hub API also returns the following server properties
    // but we should be able to get them from the above server object
    // currentVersion, capabilities, tileInfo, serviceSpatialReference
    // maxRecordCount, supportedQueryFormats, etc
    // feature and raster layer enrichments
    layer, recordCount, statistics, 
    // NOTE: the Hub API also returns the following layer properties
    // but we should be able to get them from the above layer object
    // supportedQueryFormats, supportsAdvancedQueries, advancedQueryCapabilities, useStandardizedQueries
    // geometryType, objectIdField, displayField, fields,
    // org properties?
    orgId, orgName, organization, orgExtent, 
    // NOTE: for layers and tables the Hub API returns the layer type
    // ("Feature Layer", "Table", "Raster Layer") instead of the item type
    type, } = attributes;
    // NOTE: we could throw or return if there are errors
    // to prevent type errors trying to read properties below
    content.errors = errors;
    // common enrichments
    content.boundary = boundary;
    if (!isExtentCoordinateArray(item.extent) &&
        extent &&
        isExtentCoordinateArray(extent.coordinates)) {
        // we fall back to the extent derived by the API
        // which prefers layer or service extents and ultimately
        // falls back to the org's extent
        content.extent = extent.coordinates;
    }
    // setting this to null signals to enrichMetadata to skip this
    content.metadata = metadata || null;
    if (content.modified !== modified) {
        // capture the enriched modified date
        // NOTE: the item modified date is still available on content.item.modified
        content.modified = modified;
        content.updatedDate = new Date(modified);
        content.updatedDateSource = modifiedProvenance;
    }
    content.slug = slug;
    if (searchDescription) {
        // overwrite default summary (from snippet) w/ search description
        content.summary = searchDescription;
    }
    content.groupIds = groupIds;
    // server enrichments
    content.server = server;
    content.layers = layers;
    // layer enrichments
    content.layer = layer;
    content.recordCount = recordCount;
    content.statistics = statistics;
    // org enrichments
    if (orgId) {
        content.org = {
            id: orgId,
            name: orgName || organization,
            extent: orgExtent,
        };
    }
    // return a content with updated hubId and type
    // along w/ related properties like identifier, family, etc
    return setContentType(setContentHubId(content, hubId), type);
}
/**
 * Convert a Hub API dataset resource to a portal item
 *
 * @param {DatasetResource} Dataset resource
 * @returns {IItem} portal item
 * @export
 */
function datasetToItem(dataset) {
    if (!dataset) {
        return;
    }
    const { id, attributes } = dataset;
    if (!attributes) {
        return;
    }
    // parse item id
    const { itemId } = parseDatasetId(id);
    // read item properties from attributes
    // NOTE: we attempt to read all item properties
    // even though some may not be currently returned
    const { 
    // start w/ item properties from
    // https://developers.arcgis.com/rest/users-groups-and-items/item.htm
    owner, orgId, created, 
    // the Hub API returns item.modified in attributes.itemModified (below)
    modified, 
    // NOTE: we use attributes.name to store the title or the service/layer name
    // but in Portal name is only used for file types to store the file name (read only)
    name, title, type, typeKeywords, description, snippet, tags, thumbnail, 
    // the Hub API returns item.extent in attributes.itemExtent (below)
    // extent,
    categories, contentStatus, 
    // the Hub API doesn't currently return spatialReference
    spatialReference, 
    // the Hub API doesn't currently return accessInformation
    accessInformation, licenseInfo, culture, url, access, 
    // the Hub API doesn't currently return proxyFilter
    proxyFilter, properties, 
    // the Hub API doesn't currently return appCategories, industries,
    // languages, largeThumbnail, banner, screenshots, listed, ownerFolder
    appCategories, industries, languages, largeThumbnail, banner, screenshots, listed, ownerFolder, size, 
    // the Hub API doesn't currently return protected
    protected: isProtected, commentsEnabled, 
    // the Hub API doesn't currently return numComments, numRatings,
    // avgRating, numViews, itemControl, scoreCompleteness
    numComments, numRatings, avgRating, numViews, itemControl, scoreCompleteness, 
    // additional attributes we'll need
    // to derive the above values when missing
    itemExtent, itemModified, modifiedProvenance, serviceSpatialReference, } = attributes;
    // layer datasets will get their type from the layer
    // so we will need to derive the item type from the URL
    const serviceType = url && getServiceTypeFromUrl(url);
    // build and return an item from properties
    // NOTE: we currently do NOT provide default values
    // (i.e. null for scalar attributes, [] for arrays, etc)
    // for attributes that are not returned by the Hub API
    // this helps distinguish an item that comes from the API
    // but forces all consumers to do handle missing properties
    return {
        id: itemId,
        owner: owner,
        orgId,
        created: created,
        // for feature layers, modified will usually come from the layer so
        // we prefer itemModified, but fall back to modified if it came from the item
        modified: (itemModified ||
            (modifiedProvenance === "item.modified" && modified)),
        title: (title || name),
        type: serviceType || type,
        typeKeywords,
        description,
        tags,
        snippet,
        thumbnail,
        extent: itemExtent ||
            /* istanbul ignore next: API should always return itemExtent, but we default to [] just in case */ [],
        categories,
        contentStatus,
        spatialReference: spatialReference || serviceSpatialReference,
        accessInformation,
        licenseInfo,
        culture,
        url,
        access,
        size,
        protected: isProtected,
        proxyFilter,
        properties,
        appCategories,
        industries,
        languages,
        largeThumbnail,
        banner,
        screenshots,
        listed,
        ownerFolder,
        commentsEnabled,
        numComments,
        numRatings,
        avgRating,
        numViews,
        itemControl,
        scoreCompleteness,
    };
}
/**
 * retunrs a new content that has the specified type and
 * and updated related properties like normalizedType, family, etc
 * @param content orignal content
 * @param type new type
 * @returns new content
 */
const setContentType = (content, type) => {
    // get family and normalized type based on new type
    const family = getFamily(type);
    const normalizedType = normalizeItemType(Object.assign(Object.assign({}, content.item), { type }));
    const updated = Object.assign(Object.assign({}, content), { type, family, normalizedType });
    // update the relative URL to the content
    // which is based on type and family
    return appendContentUrls(updated, {
        relative: getContentRelativeUrl(updated),
    });
};
/**
 * retunrs a new content that has the specified hubId and updated identifier
 * @param content orignal content
 * @param hubId new hubId
 * @returns new content
 */
const setContentHubId = (content, hubId) => {
    const { id, slug } = content;
    // get the identifier which is based on hubId
    const identifier = slug || hubId || id;
    const updated = Object.assign(Object.assign({}, content), { hubId, identifier });
    // update the relative URL to the content
    // which is based on identifier
    return appendContentUrls(updated, {
        relative: getContentRelativeUrl(updated),
    });
};
/**
 * append the absolute URL to the content on the site
 * also updates the relative URL in case the
 * @param content
 * @param siteModel
 * @returns
 */
const setContentSiteUrls = (content, siteModel) => {
    // recompute relative URL using a site specific identifier
    const siteIdentifier = getContentIdentifier(content, siteModel);
    const relative = getContentRelativeUrl(content, siteIdentifier);
    // get the absolute URL to this content on the site
    const siteUrl = getProp(siteModel, "item.url").replace(/\/$/, "");
    const site = `${siteUrl}${relative}`;
    // append the updated URLs to a new content
    return appendContentUrls(content, {
        relative,
        site,
    });
};
// URL helpers
const appendContentUrls = (content, newUrls) => {
    // merge new urls into existing ones and return a new content
    const urls = Object.assign(Object.assign({}, content.urls), newUrls);
    return Object.assign(Object.assign({}, content), { urls });
};
const getContentRelativeUrl = (content, siteIdentifier) => {
    const { family } = content;
    // prefer site specific identifier if passed in
    const identifier = siteIdentifier || content.identifier;
    // solution types have their own logic
    let contentUrl = getSolutionUrl(content);
    if (!contentUrl) {
        const pluralizedFamilies = [
            "app",
            "dataset",
            "document",
            "map",
            "template",
        ];
        // default to the catchall content route
        let path = "/content";
        if (content.family === "feedback") {
            // exception
            path = "/feedback/surveys";
        }
        else if (isPageContent(content)) {
            // pages are in the document family,
            // but instead of showing the page's metadata on /documents/about
            // but we render the page on the pages route
            path = "/pages";
        }
        else if (pluralizedFamilies.indexOf(family) > -1) {
            // the rule
            path = `/${family}s`;
        }
        contentUrl = `${path}/${identifier}`;
    }
    return contentUrl;
};
const getSolutionUrl = (content) => {
    var _a;
    let hubUrl;
    const { normalizedType, identifier } = content;
    if (normalizedType === "Solution") {
        // NOTE: as per the above spreadsheet,
        // solution types are now in the Template family
        // but we don't send them to the route for initiative templates
        if (((_a = content.typeKeywords) === null || _a === void 0 ? void 0 : _a.indexOf("Deployed")) > 0) {
            // deployed solutions go to the generic content route
            hubUrl = `/content/${identifier}`;
        }
        // others go to the solution about route
        hubUrl = `/templates/${identifier}/about`;
    }
    return hubUrl;
};
// page helpers
// TODO: we check both "Hub Page" and "Site Page" because we don't know whether the site is a portal or not
// In the future, the site object will have a site.isPortal() function that we can leverage
// instead of hardcoding the types here.
// TODO: should this be based on normalizedType instead?
const isPageContent = (content) => includes(["Hub Page", "Site Page"], content.type);

"use strict";

/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 */
function atob(data) {
  // Web IDL requires DOMStrings to just be converted using ECMAScript
  // ToString, which in our case amounts to using a template literal.
  data = `${data}`;
  // "Remove all ASCII whitespace from data."
  data = data.replace(/[ \t\n\f\r]/g, "");
  // "If data's length divides by 4 leaving no remainder, then: if data ends
  // with one or two U+003D (=) code points, then remove them from data."
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, "");
  }
  // "If data's length divides by 4 leaving a remainder of 1, then return
  // failure."
  //
  // "If data contains a code point that is not one of
  //
  // U+002B (+)
  // U+002F (/)
  // ASCII alphanumeric
  //
  // then return failure."
  if (data.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(data)) {
    return null;
  }
  // "Let output be an empty byte sequence."
  let output = "";
  // "Let buffer be an empty buffer that can have bits appended to it."
  //
  // We append bits via left-shift and or.  accumulatedBits is used to track
  // when we've gotten to 24 bits.
  let buffer = 0;
  let accumulatedBits = 0;
  // "Let position be a position variable for data, initially pointing at the
  // start of data."
  //
  // "While position does not point past the end of data:"
  for (let i = 0; i < data.length; i++) {
    // "Find the code point pointed to by position in the second column of
    // Table 1: The Base 64 Alphabet of RFC 4648. Let n be the number given in
    // the first cell of the same row.
    //
    // "Append to buffer the six bits corresponding to n, most significant bit
    // first."
    //
    // atobLookup() implements the table from RFC 4648.
    buffer <<= 6;
    buffer |= atobLookup(data[i]);
    accumulatedBits += 6;
    // "If buffer has accumulated 24 bits, interpret them as three 8-bit
    // big-endian numbers. Append three bytes with values equal to those
    // numbers to output, in the same order, and then empty buffer."
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 0xff0000) >> 16);
      output += String.fromCharCode((buffer & 0xff00) >> 8);
      output += String.fromCharCode(buffer & 0xff);
      buffer = accumulatedBits = 0;
    }
    // "Advance position by 1."
  }
  // "If buffer is not empty, it contains either 12 or 18 bits. If it contains
  // 12 bits, then discard the last four and interpret the remaining eight as
  // an 8-bit big-endian number. If it contains 18 bits, then discard the last
  // two and interpret the remaining 16 as two 8-bit big-endian numbers. Append
  // the one or two bytes with values equal to those one or two numbers to
  // output, in the same order."
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 0xff00) >> 8);
    output += String.fromCharCode(buffer & 0xff);
  }
  // "Return output."
  return output;
}
/**
 * A lookup table for atob(), which converts an ASCII character to the
 * corresponding six-bit number.
 */

const keystr$1 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function atobLookup(chr) {
  const index = keystr$1.indexOf(chr);
  // Throw exception if character is not in the lookup string; should not be hit in tests
  return index < 0 ? undefined : index;
}

var atob_1 = atob;

"use strict";

/**
 * btoa() as defined by the HTML and Infra specs, which mostly just references
 * RFC 4648.
 */
function btoa(s) {
  let i;
  // String conversion as required by Web IDL.
  s = `${s}`;
  // "The btoa() method must throw an "InvalidCharacterError" DOMException if
  // data contains any character whose code point is greater than U+00FF."
  for (i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 255) {
      return null;
    }
  }
  let out = "";
  for (i = 0; i < s.length; i += 3) {
    const groupsOfSix = [undefined, undefined, undefined, undefined];
    groupsOfSix[0] = s.charCodeAt(i) >> 2;
    groupsOfSix[1] = (s.charCodeAt(i) & 0x03) << 4;
    if (s.length > i + 1) {
      groupsOfSix[1] |= s.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (s.charCodeAt(i + 1) & 0x0f) << 2;
    }
    if (s.length > i + 2) {
      groupsOfSix[2] |= s.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = s.charCodeAt(i + 2) & 0x3f;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += btoaLookup(groupsOfSix[j]);
      }
    }
  }
  return out;
}

/**
 * Lookup table for btoa(), which converts a six-bit number into the
 * corresponding ASCII character.
 */
const keystr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function btoaLookup(index) {
  if (index >= 0 && index < 64) {
    return keystr[index];
  }

  // Throw INVALID_CHARACTER_ERR exception here -- won't be hit in the tests.
  return undefined;
}

var btoa_1 = btoa;

"use strict";




var abab = {
  atob: atob_1,
  btoa: btoa_1
};

const WGS84_WKID = "4326";
const PORTAL_EXPORT_TYPES = {
    csv: {
        name: "CSV",
        itemTypes: ["CSV", "CSV Collection"],
        supportsProjection: true,
    },
    kml: {
        name: "KML",
        itemTypes: ["KML", "KML Collection"],
        supportsProjection: false,
    },
    shapefile: {
        name: "Shapefile",
        itemTypes: ["Shapefile"],
        supportsProjection: true,
    },
    fileGeodatabase: {
        name: "File Geodatabase",
        itemTypes: ["File Geodatabase"],
        supportsProjection: true,
    },
    geojson: {
        name: "GeoJson",
        itemTypes: ["GeoJson"],
        supportsProjection: false,
    },
    excel: {
        name: "Excel",
        itemTypes: ["Microsoft Excel"],
        supportsProjection: true,
    },
    featureCollection: {
        name: "Feature Collection",
        itemTypes: ["Feature Collection"],
        supportsProjection: true,
    },
};
/**
 * Puts a spatial reference into a serialized format that can be used
 * for item typeKeywords.
 *
 * **Note**: discards "latestWkid"
 *
 * In the past we used `JSON.stringify`, but that causes problems because
 * it can include commas which are interpreted by the portal [update item call](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm)
 * as being separate typekeywords. With `JSON.stringify`, equality was also
 * dependent on the order of the properties in the spatial reference.
 *
 * Check https://developers.arcgis.com/web-map-specification/objects/spatialReference/
 * for more details on what this object looks like.
 */
function serializeSpatialReference(spatialReference) {
    if (typeof spatialReference === "object") {
        const { wkid, wkt } = spatialReference;
        return wkid ? wkid + "" : abab.btoa(wkt);
    }
    else {
        return spatialReference;
    }
}
/**
 * spatialRefId can currently take the form of either a WKID string or a
 * serialized ISpatialReference object.
 *
 * TODO - we shouldn't need this function. Instead, spatialRefId should
 * always be consistent, maybe by using serializeSpatialReference
 *
 * @private
 */
function parseSpatialRefId(spatialRefId) {
    let _spatialRefId;
    try {
        _spatialRefId = JSON.parse(spatialRefId);
    }
    catch (_a) {
        _spatialRefId = spatialRefId;
    }
    return _spatialRefId;
}
/**
 * Builds the Portal API query string to search for exports from a given dataset
 *
 * @param itemId - The dataset ID
 * @param options - A set of options including item types, layerId, and spatialRefId
 * @returns
 */
function buildExistingExportsPortalQuery(itemId, options) {
    const { onlyTypes, layerId, spatialRefId } = maybeExtractOptions(options);
    const formatInfos = Object.keys(PORTAL_EXPORT_TYPES).map((key) => PORTAL_EXPORT_TYPES[key]);
    const noProjectionItemTypes = new Set(flattenArray(formatInfos
        .filter((info) => !info.supportsProjection)
        .map((info) => info.itemTypes)));
    let types;
    if (!onlyTypes) {
        types = flattenArray(formatInfos.map((info) => info.itemTypes));
    }
    else {
        types = onlyTypes;
    }
    const queryBuilder = new SearchQueryBuilder()
        .startGroup()
        .match(getExportItemTypeKeyword(itemId))
        .in("typekeywords")
        .and()
        .match(getExportLayerTypeKeyword(layerId))
        .in("typekeywords")
        .endGroup()
        .and()
        .startGroup();
    buildExportTypesClause(queryBuilder, {
        types,
        spatialRefId,
        noProjectionItemTypes,
    });
    queryBuilder.endGroup();
    return queryBuilder.toParam();
}
function maybeExtractOptions(options) {
    if (options) {
        return {
            onlyTypes: options.onlyTypes,
            layerId: options.layerId,
            spatialRefId: options.spatialRefId,
        };
    }
    return {};
}
function buildExportTypesClause(builder, options) {
    const { types, noProjectionItemTypes, spatialRefId } = options;
    const getSpatialRefIdWithDefaults = (_spatialRefId, itemType) => {
        let ret = WGS84_WKID;
        if (_spatialRefId && !noProjectionItemTypes.has(itemType)) {
            ret = _spatialRefId;
        }
        return ret;
    };
    const buildQueryForType = (type, _builder) => {
        _builder
            .startGroup()
            .match(/\s/g.test(type) ? type : `"${type}"`) // temporary logic until https://github.com/Esri/arcgis-rest-js/issues/916 is resolved
            .in("type")
            .and()
            .match(getSpatialRefTypeKeyword(getSpatialRefIdWithDefaults(spatialRefId, type)))
            .in("typekeywords")
            .endGroup();
    };
    types.forEach((type, i) => {
        buildQueryForType(type, builder);
        if (i < types.length - 1) {
            builder.or();
        }
    });
}
/**
 * Generates typekeyword for identifying which spatialRefId an export is
 * @param spatialRefId - either a WKID, WKT, or stringified ISpatialReference
 * @private
 */
function getSpatialRefTypeKeyword(spatialRefId) {
    const parsedSpatialReference = parseSpatialRefId(spatialRefId);
    const serializedSpatialReference = serializeSpatialReference(parsedSpatialReference);
    return `spatialRefId:${serializedSpatialReference}`;
}
/**
 * Returns the keyword identifying exports by the item they originate from
 * @param itemId - ID for the item from which the export originated
 * @private
 */
function getExportItemTypeKeyword(itemId) {
    return `exportItem:${itemId}`;
}
/**
 * Returns the keyword identifying exports by the layer they originate from
 * @param layerId - ID for the layer from which the export originated
 * @private
 */
function getExportLayerTypeKeyword(layerId) {
    // NOTE - Layer Id's need to be padded with "0" so that /search results are predictable. Searches for typeKeywords:"exportLayer:1" don't work.
    // See https://github.com/Esri/hub.js/pull/472 for more information.
    // TODO - use `filter` when Enterprise Sites adds support.
    return layerId ? `exportLayer:0${layerId}` : `exportLayer:null`;
}

/**
 * Unprotect and Remove a Group.
 * Assumed caller has checked that the current user should be able
 * to unprotect and remove the group. Underlying calls are failsafe
 * so a failure to unprotect or remove the group will not reject
 * @param {IUserGroupOptions} userGroupOptions id and authentication
 * @private
 */
function _unprotectAndRemoveGroup(userGroupOptions) {
    const failSafeUnprotect = failSafe(unprotectGroup, { success: true });
    const failSafeRemove = failSafe(removeGroup, { success: true });
    return failSafeUnprotect(userGroupOptions).then(() => {
        return failSafeRemove(userGroupOptions);
    });
}

/**
 * @private
 */
function _consolidateResults(context) {
    const { autoAddResult, inviteResult, primaryEmailResult, secondaryEmailResult } = context;
    let combinedEmailResults;
    if (primaryEmailResult || secondaryEmailResult) {
        const validResults = [primaryEmailResult, secondaryEmailResult].filter(r => r);
        const combinedSuccess = validResults.every(r => r.success);
        const combinedErrors = validResults.reduce((collection, r) => collection.concat(getWithDefault$1(r, "errors", [])), []);
        combinedEmailResults = {
            success: combinedSuccess
        };
        if (combinedErrors.length) {
            combinedEmailResults.errors = combinedErrors;
        }
    }
    const overallSuccess = [autoAddResult, inviteResult, combinedEmailResults]
        .filter(r => r)
        .every(r => r.success);
    return {
        success: overallSuccess,
        autoAdd: autoAddResult,
        invite: inviteResult,
        email: combinedEmailResults
    };
}

/**
 * @private
 *
 * Coerce autoAdd response into a more similar interface as
 * the other rest calls.
 *
 * If any users are not auto added, an error is added to the response
 * and unadded users are placed into the invitation list
 */
function _formatAutoAddResponse(rawResponse, context) {
    if (rawResponse) {
        const success = !getProp(rawResponse, "notAdded.length") && !rawResponse.errors;
        context.autoAddResult = { success };
        if (!success) {
            const errors = rawResponse.errors || [];
            if (getProp(rawResponse, "notAdded.length")) {
                errors.push(new ArcGISRequestError(`Users not auto-added: ${rawResponse.notAdded.join(", ")}`));
            }
            context.autoAddResult.errors = errors;
            // Move unadded users to invite list;
            const unaddedUsers = context.usersToAutoAdd.filter(user => includes(rawResponse.notAdded, user.username));
            context.usersToInvite = context.usersToInvite.concat(unaddedUsers);
        }
    }
    return context;
}

/**
 * @private
 *
 * returns whether or not the users are in the same org
 */
function _canEmailUser(recipient, sender) {
    return recipient.orgId === sender.orgId;
}

/**
 * @private
 */
function _isOrgAdmin(user) {
    return user.role === "org_admin" && !user.roleId;
}

/**
 * Attempts to email members of the requesting user's organization.
 *
 * @param {IUser[]} users Users to email (must be in the same org as the requesting user)
 * @param {IEmail} email
 * @param {IAuthenticationManager} authentication
 * @param {boolean} isOrgAdmin // Whether the requesting user in an org admin
 *
 * @returns {object|null} A promise that resolves to the result of the transaction (null if no users are passed in)
 */
function emailOrgUsers(users, email, authentication, isOrgAdmin) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            authentication,
            message: email.body,
            subject: email.subject,
            notificationChannelType: "email",
            users: users.map(u => u.username)
        };
        if (!isOrgAdmin) {
            args.batchSize = 1;
        }
        response = createOrgNotification(args);
    }
    return response;
}

/**
 * @private
 *
 * If a secondary authentication is passed in AND
 * an email object is passed in AND
 * the previous invitation call was successful:
 *
 * Send an email notification to the invited
 * users that are part of the secondary authentication's org
 */
function _processSecondaryEmail(context) {
    let response = Promise.resolve(context);
    // If secondaryRO provided, send email to the invited users in the secondaryRO's org (typically a community org)
    if (context.email &&
        context.secondaryRO &&
        getProp(context, "inviteResult.success")) {
        const secondaryUser = getWithDefault$1(context, "secondaryRO.portalSelf.user", {});
        const secondaryOrgUsersToEmail = context.usersToInvite.filter(u => _canEmailUser(u, secondaryUser));
        response = emailOrgUsers(secondaryOrgUsersToEmail, context.email, context.secondaryRO.authentication, _isOrgAdmin(secondaryUser)).then(result => {
            context.secondaryEmailResult = result;
            return context;
        });
    }
    return response;
}

/**
 *
 * Attempts to auto-add users to a group
 *
 * @param {string} id ID of the group the users will be added to
 * @param {IUser[]} users
 * @param {IAuthenticationManager} authentication
 *
 * @returns {IAddGroupUsersResult|null} Result of the transaction (null if no users are passed in)
 */
function autoAddUsers(id, users, authentication) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            id,
            users: users.map(u => u.username),
            authentication
        };
        response = addGroupUsers(args);
    }
    return response;
}

/**
 * @private
 */
function _processAutoAdd(context) {
    return autoAddUsers(getProp(context, "groupId"), getProp(context, "usersToAutoAdd"), getProp(context, "primaryRO.authentication")).then(rawResponse => _formatAutoAddResponse(rawResponse, context));
}

/**
 *
 * Attempts to invite users to a group
 *
 * @param {string} id ID of the group the users will be invited to
 * @param {object[]} users
 * @param {object} authentication
 * @param {number} expiration How long the invite will be active (in minutes)
 * @param {string} role What role should they be added as. Defaults to group member
 *
 * @returns {object|null} Result of the transaction (null if no users are passed in)
 */
function inviteUsers(id, users, authentication, expiration = 20160, // default to 2 week expiration TODO: is this actually 2 weeks?
role = "group_member" // default to group member, but allow for team_admin as well
) {
    let response = Promise.resolve(null);
    if (users.length) {
        const args = {
            id,
            users: users.map((u) => u.username),
            authentication,
            role,
            expiration,
        };
        response = inviteGroupUsers(args);
    }
    return response;
}

/**
 * @private
 */
function _processInvite(context) {
    return inviteUsers(getProp(context, "groupId"), getProp(context, "usersToInvite"), getProp(context, "primaryRO.authentication")).then(result => {
        context.inviteResult = result;
        return context;
    });
}

/**
 * @private
 *
 * Send email notification if an email object is present and
 * the previous invitation call was successful
 */
function _processPrimaryEmail(context) {
    let response = Promise.resolve(context);
    // Email users if invite succeeds
    if (context.email && getProp(context, "inviteResult.success")) {
        response = emailOrgUsers(context.usersToEmail, context.email, context.primaryRO.authentication, _isOrgAdmin(context.requestingUser)).then(result => {
            context.primaryEmailResult = result;
            return context;
        });
    }
    return response;
}

/**
 * @private
 *
 * A user can be auto-added if they are part of the requesting user's e-org
 * or c-org and the requesting user has the assignToGroups privilege
 */
function _getAutoAddUsers(users, requestingUser) {
    let usersToAutoAdd = [];
    if (requestingUser.privileges.indexOf("portal:admin:assignToGroups") !== -1) {
        const orgIds = [requestingUser.orgId, requestingUser.cOrgId].filter(o => o);
        usersToAutoAdd = users.filter(u => orgIds.indexOf(u.orgId) !== -1);
    }
    return usersToAutoAdd;
}

/**
 * @private
 *
 * A user will be invited if they cannot be auto-added
 */
function _getInviteUsers(users, requestingUser) {
    const autoAddedUsers = _getAutoAddUsers(users, requestingUser);
    return users.filter(user => !autoAddedUsers.some(aau => aau.username === user.username));
}

/**
 * @private
 *
 * A user can be emailed if they are invited (not auto-added)
 * and the _canEmailUser condition is met
 */
function _getEmailUsers(users, requestingUser, includeSelf = false) {
    const invitedUsers = _getInviteUsers(users, requestingUser);
    const emailUsers = invitedUsers.filter(user => _canEmailUser(user, requestingUser));
    if (includeSelf) {
        emailUsers.push(requestingUser);
    }
    return emailUsers;
}

/**
 * Adds, invites or emails users about joining a group
 * based on the permissions of the requesting user. The
 * function returns a hash of results indicating which
 * operations were attempted and whether they were successful.
 *
 * In general, this algorithm will auto-add all the users
 * that it can, invite the others, and send emails to eligible
 * invited users (See below for more details)
 *
 * Here are a couple caveats to be aware of:
 * 1) If the requestingUser can auto-add to the group (A.K.A. has
 * portal:admin:assignToGroups) no email will be sent, period.
 * 2) Emails can only be sent to members of the same org as the
 * requesting user if they have been invited (not auto-added)
 * to the group. If emails must to be sent to invited members
 * of a second org (e.g a community org), an authenticated user
 * of the second org must be passed in (see secondaryRO)
 * 3) If no email is passed in, no email will be sent
 * 4) If auto-adding fails, the unadded users will be invited
 *
 * @param {string} groupId
 * @param {IUser[]} allUsers
 * @param {IHubRequestOptions} primaryRO Info and authentication for the requesting user
 * @param {IEmail} [email] Email to be sent (if qualifying users are passed in)
 * @param {IHubRequestOptions} [secondaryRO] Info and authentication for emailing members of a secondary organization (typically a community org)
 *
 * @returns {IConsolidatedResult} The operations attempted, whether they were successful and any errors
 */
function addUsersToGroup(groupId, allUsers, primaryRO, email, secondaryRO) {
    // Extract requesting user
    const requestingUser = cloneObject$1(getWithDefault$1(primaryRO, "portalSelf.user", {}));
    requestingUser.cOrgId = getProp(primaryRO, "portalSelf.portalProperties.hub.settings.communityOrg.orgId");
    // Context for each process segment
    const context = {
        groupId,
        allUsers,
        primaryRO,
        email,
        secondaryRO,
        requestingUser,
        usersToAutoAdd: _getAutoAddUsers(allUsers, requestingUser),
        usersToInvite: _getInviteUsers(allUsers, requestingUser),
        usersToEmail: _getEmailUsers(allUsers, requestingUser, getProp(email, "copyMe"))
    };
    return _processAutoAdd(context)
        .then(_processInvite)
        .then(_processPrimaryEmail)
        .then(_processSecondaryEmail)
        .then(_consolidateResults);
}

/**
 * Unprotect and Remove an Item
 * Assumes caller has checked that the curernt user should be able to
 * unprotect and remove the item. Underlying calls are failsafe
 * so a failure to unprotect or temove the item will not reject.
 * @param {IUserItemOptions} userItemOptions id and authentication
 * @private
 */
function _unprotectAndRemoveItem(userItemOptions) {
    const failSafeUnprotect = failSafe(unprotectItem, { success: true });
    const failSafeRemove = failSafe(removeItem, { success: true });
    return failSafeUnprotect(userItemOptions).then(() => {
        return failSafeRemove(userItemOptions);
    });
}

/**
 * Apply a hash of properties to an array of items.
 * Extracted to simplify testing.
 * @param {array} items Array of items to apply the properties to
 * @param {object} props hash of properties to apply to the item
 */
function applyPropertiesToItems(items, props) {
    return items.map((item) => {
        if (!item.properties) {
            item.properties = {};
        }
        Object.assign(item.properties, props);
        return item;
    });
}

/**
 * Delete a property from an object using a deep path
 * MODIFIES PASSED TARGET
 * @param {Object} target Object from which we want to delete the property
 * @param {string} path Dotted path to the property we want to delete
 */
function deleteProp(target, lookupStr) {
    if (typeof target !== "object" || target === null)
        return;
    if (typeof lookupStr !== "string")
        return;
    const lookupKeys = lookupStr.split(".");
    for (let i = 0; i < lookupKeys.length - 1; i++) {
        if (!target.hasOwnProperty(lookupKeys[i]))
            return;
        target = target[lookupKeys[i]];
    }
    delete target[lookupKeys[lookupKeys.length - 1]];
}

/**
 * Given a model, return a serialized clone that can be sent to
 * the items api
 * @param {Object} model Item model {item:{}, data:{}}
 */
function serializeModel(model) {
    const serialized = cloneObject$1(model.item);
    serialized.text = JSON.stringify(model.data);
    return serialized;
}

/**
 * Update a model's item, wrapped in a failSafe so this will not blow up if
 * the user lacks rights somehow. This should be used in places where there is
 * a high-probability that the current user CAN update the item.
 * @param {Object} model Model object to be updated
 * @param {IRequestOptions} requestOptions
 */
function failSafeUpdate(model, requestOptions) {
    const failSafedUpdate = failSafe(updateItem, {
        id: model.item.id,
        success: true
    });
    const opts = Object.assign({ item: serializeModel(model) }, requestOptions);
    return failSafedUpdate(opts);
}

/**
 * Gets the full item/data model for an item
 * @param {string} id Id of the item to fetch
 * @param {Object} requestOptions
 */
function getModel(id, requestOptions) {
    return Promise.all([
        getItem(id, requestOptions),
        getItemData(id, requestOptions)
    ]).then((result) => {
        // shape this into a model
        return {
            item: result[0],
            data: result[1]
        };
    });
}

/**
 * To streamline passing of either a model id or the model itself, we use this function
 * to extract the model or fetch it, and return it. It uses `failSafe` and if the item
 * is not accessible for whatever reason, will return a model-ish object with `isMissing: true`
 * It is up to the caller to take approriate action
 * @param {String} modelType the type of model to extract from the options hash
 * @param {Object} options Something that extends IRequestOptions
 */
function getModelFromOptions(modelType, options) {
    const modelProp = `${modelType}Model`;
    const idProp = `${modelType}Id`;
    // if the options hash has the model, return it
    if (options[modelProp]) {
        return Promise.resolve(options[modelProp]);
    }
    else {
        if (options[idProp]) {
            const failSafeModel = failSafe(getModel, {
                item: { id: options[idProp] },
                isMissing: true
            });
            return failSafeModel(options[idProp], options);
        }
        else {
            throw new Error(`getModelFromOptions requires either a .${modelProp} or .${idProp} property.`);
        }
    }
}

/**
* adlib - v3.0.6 - Thu Dec 17 2020 17:08:08 GMT-0800 (Pacific Standard Time)
* Copyright (c) 2017-2020 Dave Bouwman / Esri
* Apache-2.0
*/
/*    Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

/**
 * Return the value of a deep property, using a path.
 */
var getWithDefault = function (obj, path, defaultValue) {
  if ( defaultValue === void 0 ) defaultValue = undefined;

  return path
  .split('.')
  .reduce(function (o, p) { return o ? o[p] : defaultValue; }, obj);
};

/*    Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

/**
 * Simply Map over the props of an object
 */
function mapValues (obj, fn) {
  var keys = Object.keys(obj);
  // console.info(`keys: ${keys}`);
  var newObject = keys.reduce(function(acc, currentKey) {
    // console.log(`   acc: ${JSON.stringify(acc)} curKey: ${currentKey}`);
    acc[currentKey] = fn(obj[currentKey], currentKey, obj);
    return acc;
  }, {});
  // console.info(`  output: ${JSON.stringify(newObject)}`);
  return newObject;
}

/*    Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

var isDate = function (v) { return v instanceof Date; };

var isFunction = function (v) { return typeof v === 'function'; };

var isObject = function (v) { return typeof v === 'object'; };

var isRegExp = function (v) { return v instanceof RegExp; };

function deepMapValues(object, callback, propertyPath) {
  propertyPath = propertyPath || '';
  if(Array.isArray(object)){
    return object.map(deepMapValuesIteratee);
  }
  else if(object && isObject(object) && !isDate(object) && !isRegExp(object) && !isFunction(object)){
    return Object.assign({}, object, mapValues(object, deepMapValuesIteratee));
  }
  else {
    var output = callback(object, propertyPath);
    return output;
  }

  function deepMapValuesIteratee(value, key){
    var valuePath = propertyPath ? propertyPath + '.' + key : key;
    return deepMapValues(value, callback, valuePath);
  }
}

/*    Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

var isObject$1 = function (v) { return typeof v === 'object'; };

/**
 * Trim a tree decorated with `{{delete:NNN}}`
 */
function arborist (object, propertyPath) {

  if(Array.isArray(object)){
    // filter out any nulls...
    var arrResults = object.map(iteratee).filter(function (entry) {
      // need to ensure entry is actually NULL vs just falsey
      return entry !== null && entry !== undefined;
    });
    return pruneArray(arrResults);

  } if(object && isObject$1(object) ) {

    return pruneObject(mapValues(object, iteratee));

  } else {

    return getPropertyValue(object);
  }

  function iteratee(value, key){
    return arborist(value);
  }
}

/**
 * Prune an array
 * For all the entries in the array...
 *    if the entry is a naked string and contains `{{delete:NNN}}`
 *      get maximum NNN value
 *    then
 *      if maxN === 0
 *        return an empty array
 *      if maxN > 0
 *        return `{{delete:maxN-1}}`
 *    else
 *      return array
 */
function pruneArray (arrResults) {
  var res = arrResults;
  // is any entry a string w/ {{delete}}?
  var maxLevel = arrResults.reduce(function (maxLevel, e) {
    if (isString(e) && hasDelete(e)) {
      var lvl = getLevel(e);
      if (lvl > maxLevel) {
        maxLevel = lvl;
      }
    }
    return maxLevel;
  }, -1);

  if (maxLevel > -1) {
    if (maxLevel === 0) {
      res = [];
    } else {
      res = "{{delete:" + (maxLevel - 1) + "}}";
    }
  }

  return res;
}


function pruneObject (objResults) {
  // console.log(`   pruneObject:: working on ${JSON.stringify(objResults)}`);
  var startVal = {obj: {}, maxLevel: -1 };
  var res;
  // cook a new clone object, and track the maxLevel
  var reduction = Object.keys(objResults).reduce(function (acc, key) {
    var val = objResults[key];
    if (isString(val) && hasDelete(val)) {
      var lvl = getLevel(val);
      if (lvl > acc.maxLevel) {
        acc.maxLevel = lvl;
      }
    } else {
      // only add the prop if it's not a `{{delete:NNN}}`
      acc.obj[key] = val;
    }
    return acc;
  }, startVal);
  // if -1, we return entire object...
  // if 0 we just remove the prop...
  // if 1 we return undefined...
  // if > 1 we return the deleteVal
  if (reduction.maxLevel > 0 ) {
    if (reduction.maxLevel === 1) {
      res = undefined;
    } else {
      res = "{{delete:" + (reduction.maxLevel - 1) + "}}";
    }
  } else {
    res = reduction.obj;
  }

  // console.log(`     returning ${JSON.stringify(res)}`);
  return res;
}

/**
 * Get a value for a property, handling the `{{delete:NNN}}` syntax
 */
function getPropertyValue (val){
  var output = val;

  if (typeof val === 'string') {
    if (hasDelete(val)) {
      output = getDeleteValue(val);
    }
  }
  return output;
}

/**
 * Given a string with `{{delete:NNN}}`
 * if NNN === 0 return undefined
 * else return `{{delete:NNN - 1}}`
 */
function getDeleteValue (val) {
  var output = val;
  var level = getLevel(val);
  if (level === 0) {
    output = undefined;
  } else {
    output = "{{delete:" + level + "}}";
  }
  return output;
}

/**
 * Extract the level from a `{{delete:NNN}}`
 */
var getLevel = function (value) { return parseInt(value.replace(/{|}/g, '').split(':')[1]); };

/**
 * Simple check if a value has `{{delete` in it
 */
function hasDelete (value) {
  if (value && typeof value === 'string') {
    return value.indexOf('{{delete') > -1;
  } else {
    return false;
  }
}

var isString = function (v) { return typeof v === 'string'; };

/*   Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

/**
 * Optional Transform
 * Supports a declarative syntax for optional template properties
 *
 * {{some.object.key:optional:2}}
 *
 * In this example, if defined, the value of `some.object.key` is used.
 * If not defined, then the optional transform is utilized
 * and a post-processing step is executed which will remove two parent levels
 * from the output structure
 */

function optionalTransform(key, value, settings, level) {
  if ( level === void 0 ) level = 0;

  // console.log(`optional: ${key}, ${value}, ${level}`);
  var val = value;
  if (!value) {
    val = "{{delete:" + level + "}}";
  }
  return val;
}

/*    Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */

/**
 * ```js
 * import { cloneObject } from "./cloneObject";
 * const original = { foo: "bar" }
 * const copy = cloneObject(original)
 * copy.foo // "bar"
 * copy === original // false
 * ```
 * Make a deep clone, including arrays. Does not handle functions!
 *
 * Copied from @esri/hub-common to avoid bringing along that package's
 * dependencies, @esri/hub-common should be made a dependency if more
 * functions are needed from it in the future
 */
var cloneObject = function (obj) {
  var clone = {};
  // first check array
  if (Array.isArray(obj)) {
    clone = obj.map(cloneObject);
  } else if (typeof obj === "object") {
    for (var i in obj) {
      if (obj[i] != null && typeof obj[i] === "object") {
        clone[i] = cloneObject(obj[i]);
      } else {
        clone[i] = obj[i];
      }
    }
  } else {
    clone = obj;
  }
  return clone;
};

/*    Copyright (c) 2017-2019 Esri Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */
var HANDLEBARS = /{{\s*?[\w].*?}}/g;

var isString$1 = function (v) { return typeof v === 'string'; };

function _swap(parameter, settings, transforms) {
  var value;
  // console.info(`_swap: param: ${parameter}`);
  // Parameters can optionally call transform functions
  // e.g. "{{ipsum:translateLatin}}"
  // so extract {{<parameter>:<transformFunction>:<key||value>}}
  var transformCheck = parameter.split(':');
  if (transformCheck.length > 1) {
    // we have a request to use a transform...
    var key = transformCheck[0];
    var fn = transformCheck[1];
    // we default to using the value...
    var param;
    if (transformCheck[2]){
      param = transformCheck[2];
    }
    if(transforms && transforms[fn] && typeof transforms[fn] === 'function') {
      // get the value from the param
      value = getWithDefault(settings, key);
      // transform it...
      value = transforms[fn](key, value, settings, param);
    } else {
      throw new Error(("Attempted to apply non-existant transform " + fn + " on " + key + " with params " + parameter));
    }
  } else {
    // we just get the value
    value = getWithDefault(settings, parameter);
  }
  return value;
}

/**
 * Does a propertyPath exist on a target
 */
function _propertyPathExists (propertyPath, target) {
  // remove any transforms
  var cleanPath = propertyPath.split(':')[0];
  var value = getWithDefault(target, cleanPath, null);
  if (value !== null && value !== undefined) {
    return true;
  } else {
    return false;
  }
}

/**
 * Is the value considered valid
 */
function _isValue (val) {
  return val || val === '' || val === 0;
}

// Combine a Template with Settings
function adlib (template, settings, transforms) {
  if ( transforms === void 0 ) transforms = null;

  transforms = cloneObject(transforms) || {};
  if (transforms.optional) {
    throw new Error('Please do not pass in an `optional` transform; adlib provides that internally.');
  } else {
    transforms.optional = optionalTransform;
  }

  var res = deepMapValues(template, function(templateValue, templatePath){
    // Only string templates
    if (!isString$1(templateValue)) {
      return templateValue;
    }

    // When we match "{{layer.fields..}}"
    var settingsValue;

    var hbsEntries = templateValue.match(HANDLEBARS);

    if (hbsEntries && hbsEntries.length) {
      // console.log(`Got a ${hbsEntries.length} handlebar entries...`);
      // iterate over the entries...
      var values = hbsEntries.map(function (entry) {
        var isStaticValue = false;
        // console.info(`Matched ${entry}...`);
        // strip off the curlies and trim any leading/trailing whitespace...
        var path = entry.replace(/{|}/g, '').trim();
        // check for || which indicate a hiearchy
        if (path.indexOf('||') > -1) {
          var paths = path.split('||').map(function (path) { return path.trim(); });
          var numberOfPaths = paths.length;
          // here we check each option, in order, and return the first with a value in the hash, OR the last
          path = paths.find(function (pathOption, idx) {
            // console.info(`Checking to see if ${pathOption} is in settings hash...`);
            var exists = _propertyPathExists(pathOption, settings);
            if (!exists) {
              if ((idx + 1) === numberOfPaths) {
                // console.info(`Got to last entry, and still did not find anything... assuming ${pathOption} is a static value...`);
                isStaticValue = true;
                // check if we can convert this into a number...
                if (!isNaN(pathOption)) {
                  pathOption = parseInt(pathOption);
                }
                return pathOption;
              } else {
                return false;
              }
            } else {
              return pathOption;
            }
          });
        }
        // setup the return value...
        var result = {
          key: entry,
          value: path
        };
        // if we have a valid object path, value comes from _swap
        if (!isStaticValue) {
          var swap = _swap(path, settings, transforms);
          result.value = _isValue(swap) ? swap : entry;
        }
        // console.info(`Value: ${JSON.stringify(result)}`);
        return result;
      });

      values.forEach(function (v) {
        // console.log(`Comparing ${templateValue} with ${v.key}`)
        if (templateValue === v.key) {
          // console.log(`template matches key, returning ${v.value}`);
          // if the value is a string...
          if (typeof v.value === 'string') {
            // and it's numeric-ish
            if(!isNaN(v.value) && v.value !== '') {
              // and has a . in it...
              if (v.value.indexOf('.') > -1) {
                // parse as a float...
                v.value = parseFloat(v.value);
              } else {
                // parse as an int
                v.value = parseInt(v.value);
              }
            }
          }
          settingsValue = v.value;
        } else {
          // a little extra regex dance to match the '||' because '|'
          // is a Very Special Regex Character and we need to super
          // escape them for the regex to work
          // console.log(`KEY ${v.key}`);
          // console.log(`TEMPLATE ${templateValue}`);
          templateValue = templateValue.replace(v.key, v.value);
          // console.log(`template did not match key, interpolating value ${v.value} into template to produce ${templateValue}`);
        }
      });

      // if we have a value, let's return that...
      if (_isValue(settingsValue)) {
        // console.log(`We found a value so we return it ${settingsValue}`);
        return settingsValue;
      } else {
        // console.log(`We did not find a value so we return the template ${templateValue}`);
        // but if we don't, lets return the template itself
        return templateValue;
      }
    } else {
      // console.log(`We did not find a hbs match, so we return the template ${templateValue}`);
      // no match, return the templateValue...
      return templateValue;
    }
  });
  return arborist(res);
}

// read a template and spit out unique values
function listDependencies (template) {
  if (typeof template !== 'string') {
    template = JSON.stringify(template);
  }

  try {
    return Array.from(
      new Set(
        template.match(HANDLEBARS)
      )
    )
    .map(function (term) {
      return term.replace(/^{{/g, '').replace(/}}$/g, '').replace(/:.+$/, '')
      // Node > 10 and browsers support this w/ a lookahead
      // won't need to use the replace
      // /(?<={{)[\w].*?(?=}})/g
    })
  } catch (e) {
    console.error(e);
  }
}

/**
 * Interpolates handlebars-style placeholders on an object graph
 * @param template
 * @param settings
 * @param transforms
 */
function interpolate(template, settings, transforms) {
    return adlib(template, settings, transforms);
}

/**
 * Interpolate the item id back into any  {{appid}} instances
 * in the item. Allows for self-referencing in templates
 * @param {object} model Item Model
 */
function interpolateItemId(model) {
    const settings = { item: { id: model.item.id }, appid: model.item.id };
    const transforms = {
        toISO(_, v) {
            return v;
        }
    };
    return interpolate(model, settings, transforms);
}

const itemPropsNotInTemplates = [
    "id",
    "isOrgItem",
    "proxyFilter",
    "ownerFolder",
    "protected",
    "owner",
    "created",
    "modified",
    "guid",
    "name",
    "access",
    "size",
    "listed",
    "numComments",
    "numRatings",
    "avgRating",
    "numViews",
    "scoreCompleteness",
    "groupDesignations",
    "listed",
    "screenshots",
    "banner",
    "appCategories",
    "industries",
    "languages",
    "largeThumbnail"
];
/**
 * Given an item, remove a standard set of properties not needed in a template
 * TODO: This should land in a templating helper lib in hub.js
 * @param {Object} item Item to be normalized
 */
function normalizeSolutionTemplateItem(item) {
    const template = cloneObject$1(item);
    itemPropsNotInTemplates.forEach(prop => {
        delete template[prop];
    });
    // set a bunch of things we do want
    template.extent = "{{organization.defaultExtentBBox}}";
    return template;
}

/**
 * Replaces instances of item ids on an item model
 * @param {Object} obj Object graph to traverse
 * @param {string} itemId id to replace with `{{appid}}`
 */
function replaceItemId(obj, itemId, replacement = "{{appid}}") {
    const clone = cloneObject$1(obj);
    const re = new RegExp(itemId, "g");
    return deepStringReplace(clone, re, replacement);
}

/**
 * Share an item to a set of groups
 * @param {String} itemId Iten Id to share to the groups
 * @param {Array} groups Array of group id's to which the item will be shared
 * @param {*} requestOptions
 */
function shareItemToGroups(itemId, groups, requestOptions) {
    return Promise.all(groups.map((groupId) => {
        const opt = Object.assign({}, { id: itemId, groupId }, requestOptions);
        return shareItemWithGroup(opt);
    }));
}

/**
 * Given a model, determine if it is protected, and unprotect it if it is.
 * Otherwise, just resolve with the same result.
 * @param {Object} model Model Object
 * @param {IRequestOptions} requestOptions
 */
function unprotectModel(model, requestOptions) {
    if (model.item.protected) {
        const opts = Object.assign({ id: model.item.id }, requestOptions);
        return unprotectItem(opts);
    }
    else {
        // act as though we did it
        return Promise.resolve({ success: true });
    }
}

/**
 * Unshare an item from a set of groups
 * @param {String} itemId Item Id to unshare from groups
 * @param {Array} groups Array of group id's from which the item will be unshared
 * @param {IRequestOptions} requestOptions
 */
function unshareItemFromGroups(itemId, groups, requestOptions) {
    return Promise.all(groups.map(groupId => {
        const opt = Object.assign({}, { id: itemId, groupId }, requestOptions);
        return unshareItemWithGroup(opt);
    }));
}

/**
 * Check if a site/page exists with a specific name
 */
function doesItemExistWithTitle(itemTitle, options, authMgr) {
    // if options have multiple properties, put them into one string separated with 'AND'
    const optionsQuery = Object.keys(options)
        .map(key => {
        return `${key}:"${options[key]}"`;
    })
        .join(" AND ");
    const opts = {
        q: `title:"${itemTitle}" AND ${optionsQuery}`,
        authentication: authMgr
    };
    return searchItems(opts)
        .then(searchResponse => searchResponse.results.length > 0)
        .catch(e => {
        throw Error(`Error in doesItemExistWithTitle ${e}`);
    });
}

/**
 * Given a title, construct a site/page title that is unique
 * if that title exists, this fn will add a number on the end, and increment until
 * an available title is found
 * @param {string} title site/page title to ensure if unique
 * @param {object} options an object that can be passed in to the q, eg. typekeywords, type
 * @param {object} authMgr auth info tells the function what url to use for the "root" of the API,
 * if missing, it will search against PROD
 * @param {number} step Number to increment. Defaults to 0
 */
function getUniqueItemTitle(title, options, authMgr, step = 0) {
    let combinedName = title;
    if (step) {
        combinedName = `${title} ${step}`;
    }
    return doesItemExistWithTitle(combinedName, options, authMgr)
        .then(result => {
        if (result) {
            step++;
            return getUniqueItemTitle(title, options, authMgr, step);
        }
        else {
            return combinedName;
        }
    })
        .catch(e => {
        throw Error(`Error in getUniqueItemTitle ${e}`);
    });
}

const MAX_NUM = 100;
/**
 * Fetches all the pages in a search request
 * @param {SearchFunction} searchFunc
 * @param {ISearchOptions} opts
 * @param {number} limit
 * @param {batchSize} number of concurrent requests at a time
 * @returns {Promise<SearchableType[]>}
 */
function fetchAllPages(searchFunc, opts, limit = -1, batchSize) {
    const pageSize = opts.num || MAX_NUM;
    const firstStart = opts.start || 1;
    // If a limit is provided, we don't have to use the first request to get the
    // total count before sending things off to batch(). So instead we fake the first
    // response just to set things up.
    const promise = limit === -1
        ? searchFunc(Object.assign(Object.assign({}, opts), { num: pageSize, start: firstStart }))
        : Promise.resolve({
            nextStart: firstStart,
            total: limit,
            results: [],
            num: pageSize
        });
    return promise
        .then(firstResponse => {
        // no more requests needed, return the first response
        if (firstResponse.nextStart === -1)
            return [firstResponse];
        // generate batch requests for the remaining pages to fetch
        const starts = [];
        for (let i = firstResponse.nextStart; i <= firstResponse.total; i += pageSize) {
            starts.push(i);
        }
        const batchSearchFunc = (start) => searchFunc(Object.assign(Object.assign({}, opts), { start, num: pageSize }));
        return batch(starts, batchSearchFunc, batchSize).then(responses => [
            firstResponse,
            ...responses
        ]);
    })
        .then(responses => {
        // merge all the search results into a single array
        const results = responses.reduce((acc, response) => [
            ...acc,
            ...response.results
        ], []);
        // discard results beyond the limit if applicable
        const clipLimit = limit === -1 ? results.length : limit;
        return results.slice(0, clipLimit);
    });
}

/**
 * Add a token to the resource request if the request is to the portal
 * @param {string} url Resource Url
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _addTokenToResourceUrl(url, requestOptions) {
    let result = url;
    if (url.indexOf("token") === -1) {
        // no token
        // Note: authentication.portal is a fully org url
        // i.e. https://dcdev.maps.arcgis.com/sharing/rest
        // this may need to be smarter to handle non-public solutions
        // shared across orgs
        if (url.indexOf(requestOptions.authentication.portal) > -1) {
            // is the portal
            result = `${url}?token=${requestOptions.authentication.token}`;
        }
    }
    return result;
}

/**
 * Convert the resources array on an individual template in a solution
 * into an assets array that can be used to upload the resources to
 * the newly created item.
 * @param {object} template Template from a Solution
 * @param {IHubRequestOptions} hubRequestOptions
 */
function convertSolutionTemplateResourcesToAssets(template, hubRequestOptions) {
    let assets = [];
    if (template.resources && template.bundleItemId) {
        const portalRestUrl = getPortalApiUrl(hubRequestOptions.portalSelf);
        // the resources are stored on the solution item, and that Id is attached
        // into the template as .bundleItemId
        const solutionItemUrl = `${portalRestUrl}/content/items/${template.bundleItemId}`;
        // the resources on the solution are prefixed with the item id of the item the
        // template was created from, which is stored as .itemId
        const prefix = template.itemId;
        // map over the resources and convert them into assets
        assets = template.resources.map(name => {
            // we fetch the resource from .url property
            // and we upload it using the .name property
            return {
                name,
                type: "resource",
                url: `${solutionItemUrl}/resources/${prefix}-${name}`
            };
        });
    }
    return assets;
}

/**
 * Given a url to an image, return it as a blob
 * @param {String} url Url to fetch the image from. Must have token if it's a non-publi item resource url
 * @param {Object} options additional optinos
 */
function fetchImageAsBlob(url, options = {}) {
    if (!options.credentials) {
        options.credentials = "same-origin";
    }
    // We use fetch intentionally as the url may or may not be for an item url, so we don't
    // want this to run thru the main request logic
    return fetch(url, options).then(response => {
        return response.blob();
    });
}

/**
 * Fetch image from a url, and upload as a resource
 * @param {Object} options {id, owner, fileName, url, authentication}
 */
function fetchAndUploadResource(options) {
    // first fetch it as a blob...
    return fetchImageAsBlob(options.url).then((file) => {
        // upload it to the item...
        return addItemResource({
            id: options.id,
            owner: options.owner,
            name: options.fileName,
            resource: file,
            authentication: options.authentication
        });
    });
}

/**
 * Fetch image from a url, then upload to an item as it's thumbnail
 * @param {object} options
 */
function fetchAndUploadThumbnail(options) {
    // first fetch it as a blob...
    return fetchImageAsBlob(options.url)
        .then(file => {
        return updateItem({
            item: {
                id: options.id,
                owner: options.owner
            },
            params: {
                fileName: options.fileName,
                thumbnail: file
            },
            authentication: options.authentication
        }).catch(_ => {
            // resolve b/c this is not crtical
            return Promise.resolve();
        });
    })
        .catch(_ => {
        return Promise.resolve();
    });
}

/**
 * Get the fully qualified URL for an item's thumbnail
 * @param item w/ id, thumbnail, and access
 * @param portalUrlOrObject a portal base or API URL, a portal object, or request options containing either of those
 * @param optionsOrToken options including width and/or token for the current user's session; will only be appended as a query parameter if the item's access is **not** `public`
 * @returns URL to the item's thumbnail, defaults to `https://www.arcgis.com/sharing/rest/content/items/{item.id}/info/{item.thumbnail}`. Returns `null` if the item does not have a thumbnail assigned.
 */
function getItemThumbnailUrl(item, portalUrlOrObject, optionsOrToken) {
    if (!item || !item.thumbnail) {
        // TODO: handle image types by returning the image (item data) itself?
        return null;
    }
    // tslint:disable-next-line prefer-const
    let { token, width } = optionsOrToken || {};
    // TODO: at the next breaking change drop support for passing token as string
    if (!token && typeof optionsOrToken === "string") {
        token = optionsOrToken;
    }
    const itemApiUrl = getItemApiUrl(item, portalUrlOrObject, token);
    const [baseUrl, search] = itemApiUrl.split("?");
    const searchParams = new URLSearchParams(search);
    searchParams.delete("f");
    if (width) {
        searchParams.append("w", width + "");
    }
    const newSearch = searchParams.toString();
    const url = `${baseUrl}/info/${item.thumbnail}`;
    return newSearch ? `${url}?${newSearch}` : url;
}

/**
 * Given an item, return an array of assets that includes
 * all the resources, as well as the thumbnail
 * @param {object} item Item
 * @param {IHubRequestOptions} IHubRequestOptions
 */
function getItemAssets(item, hubRequestOptions) {
    const portalRestUrl = getPortalApiUrl(hubRequestOptions.portalSelf);
    const itemUrl = `${portalRestUrl}/content/items/${item.id}`;
    // if construct the asset for the thumbnail
    const thumbnailUrl = getItemThumbnailUrl(item, hubRequestOptions);
    const assets = [];
    if (thumbnailUrl) {
        assets.push({
            name: item.thumbnail,
            url: thumbnailUrl,
            type: "thumbnail"
        });
    }
    // get all the other resources
    // TODO: see how this works w/ folders
    return getItemResources(item.id, hubRequestOptions).then(response => {
        const resourceAssets = response.resources.map((e) => {
            return {
                name: e.resource,
                type: "resource",
                url: `${itemUrl}/resources/${e.resource}`
            };
        });
        return assets.concat(resourceAssets);
    });
}

/**
 * Given a string, return it as a blob
 * NOTE: USE objectToJsonBlob if you're saving a JSON resource!!!
 * NOTE: This is not currently supported in Node
 * @param {string} the string
 */
function stringToBlob(s, type = "application/octet-stream") {
    /* istanbul ignore next */
    if (typeof Blob !== "undefined") {
        const bytes = [];
        for (let i = 0; i < s.length; i++) {
            bytes[i] = s.charCodeAt(i);
        }
        const encoded = new Uint8Array(bytes);
        return new Blob([encoded], { type });
    }
    else {
        throw new Error(`stringToBlob is not currently supported on Node`);
    }
}

/**
 * Given an Item and an array of resources, upload them
 * @param {Object} itemModel Item add the resource to
 * @param {Array} resources Array of resources, with urls, to upload to the item
 * @param {Object} requestOptions {authentication}
 */
function uploadResourcesFromUrl(itemModel, resources, requestOptions) {
    if (Array.isArray(resources)) {
        const resourcePromises = resources.reduce((acc, resource) => {
            if (resource.url) {
                const opts = {
                    id: itemModel.item.id,
                    owner: itemModel.item.owner,
                    fileName: resource.name,
                    url: _addTokenToResourceUrl(resource.url, requestOptions),
                    authentication: requestOptions.authentication
                };
                if (resource.type === "thumbnail") {
                    acc.push(fetchAndUploadThumbnail(opts));
                }
                else {
                    // treat as a resource
                    acc.push(fetchAndUploadResource(opts));
                }
            }
            return acc;
        }, []);
        // Let them resolve...
        return Promise.all(resourcePromises);
    }
    else {
        return Promise.resolve([]);
    }
}

/**
 * Add a url property to the entries in the assets hash
 * @param {IModelTemplate} template
 * @param {IHubRequestOptions} hubRequestOptions
 */
function addSolutionResourceUrlToAssets(template, hubRequestOptions) {
    /* istanbul ignore next */
    let assets = template.assets || template.resources || [];
    if (template.bundleItemId) {
        const portalRestUrl = getPortalApiUrl(hubRequestOptions.portalSelf);
        // the resources are stored on the solution item, and that Id is attached
        // into the template as .bundleItemId
        const solutionItemUrl = `${portalRestUrl}/content/items/${template.bundleItemId}`;
        // the resources on the solution are prefixed with the item id of the item the
        // template was created from, which is stored as .itemId
        const prefix = template.itemId;
        // map over the resources and convert them into assets
        assets = assets.map((asset) => {
            // we fetch the resource from .url property
            // and we upload it using the .name property
            return {
                name: asset.name,
                type: asset.type || "resource",
                url: `${solutionItemUrl}/resources/${prefix}-${asset.name}`
            };
        });
    }
    return assets;
}

/**
 * Convert an object to a Blob with type  'application/json'
 * @param {*} obj
 * @returns Blob
 */
function objectToJsonBlob(obj) {
    /* istanbul ignore next */
    if (typeof Blob !== "undefined") {
        return new Blob([JSON.stringify(obj)], { type: "application/json" });
    }
    else {
        throw new Error(`objectToJsonBlob is not currently supported on Node`);
    }
}

/**
 * Search the Hub API
 *
 * @param requestOptions
 * @returns JSONAPI response
 */
function hubApiSearch(requestOptions) {
    // derive default headers if authentication
    const authentication = requestOptions.authentication;
    const headers = authentication &&
        authentication.serialize && { authentication: authentication.serialize() };
    const defaults = {
        headers,
        httpMethod: "POST",
    };
    return hubApiRequest("/search", Object.assign(Object.assign({}, defaults), requestOptions));
}

/* Copyright (c) 2018-2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Well known APIs
 * Short-forms for specifying common APIs
 */
const SEARCH_APIS = {
    arcgis: {
        label: "ArcGIS Online",
        url: "https://www.arcgis.com",
        type: "arcgis",
    },
    arcgisQA: {
        label: "ArcGIS Online QAEXT",
        url: "https://qaext.arcgis.com",
        type: "arcgis",
    },
    arcgisDEV: {
        label: "ArcGIS Online DEVEXT",
        url: "https://devext.arcgis.com",
        type: "arcgis",
    },
    hub: {
        label: "ArcGIS Hub",
        url: "https://hub.arcgis.com/api",
        type: "arcgis-hub",
    },
    hubDEV: {
        label: "ArcGIS Hub DEV",
        url: "https://hubdev.arcgis.com/api",
        type: "arcgis-hub",
    },
    hubQA: {
        label: "ArcGIS Hub QA",
        url: "https://hubqa.arcgis.com/api",
        type: "arcgis-hub",
    },
};
/**
 * @private
 * Convert array of api "names" into full ApiDefinitions
 * @param apis
 * @returns
 */
function expandApis(apis) {
    return apis.map(expandApi);
}
/**
 * @private
 * Convert an api "name" into a full ApiDefinition
 * @param api
 * @returns
 */
function expandApi(api) {
    if (typeof api === "string" && api in SEARCH_APIS) {
        return SEARCH_APIS[api];
    }
    else {
        // it's an object, so we trust that it's well formed
        return api;
    }
}
/**
 * @private
 * Merge two date ranges by taking the longest span
 * @param dr1
 * @param dr2
 * @returns
 */
function mergeDateRange(dr1, dr2) {
    const result = cloneObject$1(dr1);
    // feels like there is a more concise way to do this...
    if (dr2.from < dr1.from) {
        result.from = dr2.from;
    }
    if (dr2.to > dr1.to) {
        result.to = dr2.to;
    }
    return result;
}
/**
 * @private
 * Merge two [`MatchOptions`](../MatchOptions)
 *
 * Currently a naieve implementation where the arrays are simply merged
 *
 * @param mo1
 * @param mo2
 * @returns
 */
function mergeMatchOptions(mo1, mo2) {
    const result = {};
    // None of these props are required, so we can't just
    // use Object.keys/.entries
    const props = ["any", "all", "not", "exact"];
    props.forEach((prop) => {
        const key = prop;
        const merged = [...getMatchValue(mo1, key), ...getMatchValue(mo2, key)];
        if (merged.length) {
            // remove any dupes and set on the return
            result[key] = merged.filter(unique);
        }
    });
    return result;
}
/**
 * Get the value of a property on an IMatchOptions
 *
 * This is complex b/c all the props are optional, and
 * they could be a simple string, or an array of strings.
 *
 * This function normalizes all that and returns an array,
 * which may or may not be empty
 * @param option
 * @param key
 * @returns
 */
function getMatchValue(option, key) {
    let matchValue = [];
    if (option[key]) {
        const val = option[key];
        if (Array.isArray(val)) {
            matchValue = val;
        }
        else {
            matchValue = [val];
        }
    }
    return matchValue;
}
/**
 * @private
 * Convert a field value into a MatchOptions if it's not already one
 * @param value
 * @returns
 */
function valueToMatchOptions(value) {
    let result = {};
    if (Array.isArray(value)) {
        result = {
            any: value,
        };
    }
    else {
        if (typeof value === "string") {
            result = {
                any: [value],
            };
        }
        if (typeof value === "object") {
            result = value;
        }
    }
    return result;
}
/**
 * @private
 * Convert a RelativeDate to a DateRange<number>
 * @param relative
 * @returns
 */
function relativeDateToDateRange(relative) {
    // hash of offsets
    const offsetMs = {
        min: 1000 * 60,
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24,
        weeks: 1000 * 60 * 60 * 24 * 7,
    };
    const now = new Date();
    // default
    const result = {
        type: "date-range",
        from: now.getTime(),
        to: now.getTime(),
    };
    //
    switch (relative.unit) {
        case "hours":
        case "days":
        case "weeks":
            result.from = result.to - offsetMs[relative.unit] * relative.num;
            break;
        case "months":
            // get the current month and subtract num
            now.setMonth(now.getMonth() - relative.num);
            result.from = now.getTime();
            break;
        case "years":
            now.setFullYear(now.getFullYear() - relative.num);
            result.from = now.getTime();
            break;
    }
    return result;
}
/**
 * @private
 * As a final `ISearchOptions` object gets created, many such objects are created, and
 * need to be systematically "merged" so as to return consistently structured `q` and `filter`
 * values.
 * @param so1
 * @param so2
 * @param join
 * @returns
 */
function mergeSearchOptions(so1, so2, join) {
    const result = cloneObject$1(so1);
    const { q, filter } = so2;
    if (q) {
        result.q = (result.q ? ` (${result.q} ${join} ${q})` : q).trim();
    }
    if (filter) {
        result.filter = (result.filter ? `(${result.filter} ${join} ${filter})` : filter).trim();
    }
    return result;
}
/**
 * @private
 * Serialize a `MatchOptions` into `q` or `filter` on an `ISearchOptions`
 * @param key
 * @param opts
 * @returns
 */
function serializeMatchOptions(key, opts) {
    const result = {
        q: "",
        filter: "",
    };
    if (opts.exact) {
        // defined separately for refactoring later
        const userFilterableFields = [
            "username",
            "firstname",
            "lastname",
            "fullname",
            "email",
        ];
        const itemFilterableFields = [
            "title",
            "tags",
            "typekeywords",
            "type",
            "name",
            "owner",
        ];
        const groupFilterableFields = ["title", "typekeywords", "owner"];
        const filterableFields = [
            ...userFilterableFields,
            ...itemFilterableFields,
            ...groupFilterableFields,
        ];
        if (filterableFields.includes(key)) {
            result.filter = serializeStringOrArray("AND", key, opts.exact);
        }
        else {
            // Treat it the same as .all
            if (typeof opts.exact === "string") {
                if (!opts.all) {
                    opts.all = [];
                }
                if (typeof opts.all === "string") {
                    opts.all = [opts.all];
                }
                opts.all.push(opts.exact);
            }
            if (Array.isArray(opts.exact)) {
                if (!opts.all) {
                    opts.all = [];
                }
                if (typeof opts.all === "string") {
                    opts.all = [opts.all];
                }
                opts.all = opts.all.concat(opts.exact);
            }
        }
    }
    // Handle the other props
    if (opts.any) {
        result.q = serializeStringOrArray("OR", key, opts.any);
    }
    if (opts.all) {
        result.q =
            (result.q ? result.q + " AND " : "") +
                serializeStringOrArray("AND", key, opts.all);
    }
    if (opts.not) {
        // negate the entries if they are not
        result.q =
            (result.q ? result.q + " AND " : "") +
                serializeStringOrArray("OR", `-${key}`, opts.not);
    }
    return result;
}
/**
 * @private
 * Serialize a DateRange<number> into a Portal Query string
 * @param key
 * @param range
 * @returns
 */
function serializeDateRange(key, range) {
    return {
        q: `${key}:[${range.from} TO ${range.to}]`,
        filter: "",
    };
}
/**
 * @private
 * Serialize a `string` or `string[]` into a string
 * @param join
 * @param key
 * @param value
 * @returns
 */
function serializeStringOrArray(join, key, value) {
    let q = "";
    if (Array.isArray(value)) {
        q = `(${key}:"${value.join(`" ${join} ${key}:"`)}")`;
    }
    else {
        q = `${key}:"${value}"`;
    }
    return q;
}
/**
 * Create a `.next()` function for a type
 * @param request
 * @param nextStart
 * @param total
 * @param fn
 * @returns
 */
function getNextFunction(request, nextStart, total, fn) {
    const clonedRequest = cloneObject$1(request);
    // clone will not handle authentication so we do it manually
    if (request.authentication) {
        clonedRequest.authentication = UserSession.deserialize(request.authentication.serialize());
    }
    // figure out the start
    clonedRequest.start = nextStart > -1 ? nextStart : total + 1;
    return (authentication) => {
        if (authentication) {
            clonedRequest.authentication = authentication;
        }
        return fn(clonedRequest);
    };
}
/**
 * Construct a the full url to a group thumbnail
 *
 * - If the group has a thumbnail, construct the full url
 * - If the group is not public, append on the token
 * @param portalUrl
 * @param group
 * @param token
 * @returns
 */
function getGroupThumbnailUrl(portalUrl, group, token) {
    let thumbnailUrl = null;
    if (group.thumbnail) {
        thumbnailUrl = `${portalUrl}/community/groups/${group.id}/info/${group.thumbnail}`;
        if (token && group.access !== "public") {
            thumbnailUrl = `${thumbnailUrl}?token=${token}`;
        }
    }
    return thumbnailUrl;
}
/**
 * Construct a the full url to a user thumbnail
 *
 * - If the user has a thumbnail, construct the full url
 * - If the user is not public, append on the token
 * @param portalUrl
 * @param user
 * @param token
 * @returns
 */
function getUserThumbnailUrl(portalUrl, user, token) {
    let thumbnailUrl = null;
    if (user.thumbnail) {
        thumbnailUrl = `${portalUrl}/community/users/${user.username}/info/${user.thumbnail}`;
        if (token && user.access !== "public") {
            thumbnailUrl = `${thumbnailUrl}?token=${token}`;
        }
    }
    return thumbnailUrl;
}

// TODO: Implement $dataset
const ContentFilterExpansions = {
    $apps: [
        {
            type: {
                any: [
                    "Code Sample",
                    "Web Mapping Application",
                    "Mobile Application",
                    "Application",
                    "Desktop Application Template",
                    "Desktop Application",
                    "Operation View",
                    "Dashboard",
                    "Operations Dashboard Extension",
                    "Workforce Project",
                    "Insights Workbook",
                    "Insights Page",
                    "Insights Model",
                    "Hub Page",
                    "Hub Initiative",
                    "Hub Site Application",
                    "StoryMap",
                    "Web Experience",
                    "Web Experience Template",
                    "Form",
                ],
                not: [
                    "Code Attachment",
                    "Featured Items",
                    "Symbol Set",
                    "Color Set",
                    "Windows Viewer Add In",
                    "Windows Viewer Configuration",
                    "Map Area",
                    "Indoors Map Configuration",
                ],
            },
            typekeywords: {
                not: ["MapAreaPackage", "SMX"],
            },
        },
    ],
    $storymap: [
        {
            type: "StoryMap",
        },
        {
            type: "Web Mapping Application",
            typekeywords: ["Story Map"],
        },
    ],
    $dashboard: [
        {
            type: "Dashboard",
            typekeywords: {
                any: ["Dashboard"],
                not: ["ArcGIS Operation View", "Add In", "Extension"],
            },
        },
    ],
    $dataset: [],
    $experience: [
        {
            type: {
                any: ["Web Experience"],
                not: ["Web Experience Template"],
            },
        },
    ],
    $site: [
        {
            type: ["Hub Site Application", "Site Application"],
        },
        {
            type: ["Web Mapping Application"],
            typekeywords: ["hubSite"],
        },
    ],
    $initiative: [
        {
            type: {
                any: "Hub Initiative",
                not: "Hub Initiative Template",
            },
        },
    ],
    $document: [
        {
            typekeywords: {
                any: "Document",
                not: ["MapAreaPackage", "SMX"],
            },
            type: {
                any: [
                    "Image",
                    "Layout",
                    "Desktop Style",
                    "Project Template",
                    "Report Template",
                    "Pro Report",
                    "Statistical Data Collection",
                    "360 VR Experience",
                    "netCDF",
                    "PDF",
                    "CSV",
                    "Administrative Report",
                    "Raster function template",
                ],
                not: [
                    "Image Service",
                    "Explorer Document",
                    "Explorer Map",
                    "Globe Document",
                    "Scene Document",
                    "Code Attachment",
                    "Featured Items",
                    "Symbol Set",
                    "ColorSet",
                    "Windows Viewer Add In",
                    "Windows Viewer Configuration",
                    "Map Area",
                    "Indoors Map Configuration",
                ],
            },
        },
    ],
};
/**
 * @private
 * Convert portal search response to items
 * @param response
 * @returns
 */
function convertPortalResponseToFacets(response) {
    var _a;
    const result = [];
    if ((_a = response.aggregations) === null || _a === void 0 ? void 0 : _a.counts) {
        response.aggregations.counts.forEach((entry) => {
            const facet = {
                label: entry.fieldName,
                attribute: entry.fieldName,
                type: "multi-select",
            };
            const options = [];
            entry.fieldValues.forEach((fv) => {
                const filter = {
                    filterType: "content",
                };
                filter[entry.fieldName] = fv.value;
                const fo = {
                    label: fv.value,
                    value: fv.value,
                    count: fv.count,
                    selected: false,
                    filter,
                };
                options.push(fo);
            });
            facet.options = options;
            result.push(facet);
        });
    }
    return result;
}
/**
 * Merge `Filter<"content">` objects
 *
 * Useful in components which may get partial filters from a variety of
 * sub-components, which are then combined into a single filter prior
 * to executing the search.
 * @param filters
 * @returns
 */
function mergeContentFilter(filters) {
    // expand all the filters so all prop types are consistent
    const expanded = filters.map(expandContentFilter);
    // now we can merge based on fields
    const dateFields = ["created", "modified"];
    const specialFields = ["filterType", "subFilters", "term", ...dateFields];
    const result = expanded.reduce((acc, entry) => {
        // process fields
        Object.entries(entry).forEach(([key, value]) => {
            if (acc.hasOwnProperty(key)) {
                /* istanbul ignore else */
                if (!specialFields.includes(key)) {
                    acc[key] = mergeMatchOptions(acc[key], value);
                }
                else if (dateFields.includes(key)) {
                    acc[key] = mergeDateRange(acc[key], value);
                }
                else if (key === "term") {
                    acc[key] = `${acc[key]} ${value}`;
                }
                else if (key === "subFilters") {
                    acc[key] = mergeSubFilters(acc[key], value);
                }
            }
            else {
                acc[key] = cloneObject$1(value);
            }
        });
        return acc;
    }, {});
    result.filterType = "content";
    return result;
}
function mergeSubFilters(sf1, sf2) {
    // Simplistic implementation: we just merge the arrays
    // in the future we may try to de-dupe things as a safeguard
    return [...sf1, ...sf2];
}
/**
 * Prior to serialization into the query syntax for the backing APIs, we first expand [Filters](../Filter)
 *
 * Filter's can express their intent in a very terse form, but to ensure consistent structures
 * we expand them into their more verbose form.
 *
 * i.e. `title: "Water"` expands into `title: { any: ["Water"]}`
 *
 * - "well known" type values are expanded
 *    - i.e. `type: "$storymap"` expands into two `subFilter` entries
 * - Fields defined as `string | string[] | MatchOptions` will be converted to a `MatchOptions`
 * - RelativeDate fields are converted to DateRange<number>
 *
 * @param filter
 * @returns
 */
function expandContentFilter(filter) {
    // Expand filter.type first
    const expandedTypeFilter = expandTypeField(filter);
    // Expand subfilters
    // Guard - JS Clients could send in anything...
    if (Array.isArray(filter.subFilters)) {
        // Convert any strings into the coresponding ContentFilterDefinition
        expandedTypeFilter.subFilters = expandedTypeFilter.subFilters.reduce((acc, entry) => {
            if (typeof entry === "string") {
                // if the entry is not a key of ContentFilterExpansions
                // we just skip over it
                if (ContentFilterExpansions[entry]) {
                    acc = acc.concat(ContentFilterExpansions[entry]);
                }
            }
            else {
                acc.push(entry); // should be a ContentFilterDefinition
            }
            return acc;
        }, []);
    }
    // Convert all props into MatchOptions/DateRanges
    return convertContentDefinitionToFilter(expandedTypeFilter);
}
/**
 * @private
 * Expand from a well-known "type" into it's longer form
 *
 * i.e. `type: "$storymap"` expands into two subFilters entries
 *
 * @param filter
 * @returns
 */
function expandTypeField(filter) {
    const clone = cloneObject$1(filter);
    // ensure subFilters is defined as an array
    clone.subFilters = clone.subFilters || [];
    if (clone.type) {
        // if .type is an Array...
        if (Array.isArray(clone.type)) {
            // remove any well-known-keys and move their expansions into subfilters
            clone.type = clone.type.reduce((acc, entry) => {
                if (isWellKnownType(entry)) {
                    // working with dynamic objects in typescript requires some assertions
                    const key = entry;
                    clone.subFilters = clone.subFilters.concat(lookupTypeFilters(key));
                }
                else {
                    acc.push(entry);
                }
                return acc;
            }, []);
        }
        else if (isWellKnownType(clone.type)) {
            const key = clone.type;
            clone.subFilters = clone.subFilters.concat(lookupTypeFilters(key));
            delete clone.type;
        }
        else {
            // Future?: implement "expansions" inside MatchOptions
            // For now, we only attempt expansions for filter.type
            // if it's a string, or for strings inside an array
            // Unclear if it's of value to allow short-cuts inside MatchOptions
        }
    }
    return clone;
}
/**
 * Is the argument a well-known type "key"
 *
 * Accepts `string`, `string[]` or `IMatchOptions`
 * but only string values can possibly be properties
 * on `ContentFilterExpansions`
 * @param key
 * @returns
 */
function isWellKnownType(key) {
    let result = false;
    if (typeof key === "string") {
        result = key in ContentFilterExpansions;
    }
    return result;
}
function lookupTypeFilters(key) {
    return ContentFilterExpansions[key];
}
/**
 * @private
 * Convert a `ContentFilterDefinition` to a `ContentFilter`
 *
 * ContentFilter is a narrower version of ContentFilterDefinition, without
 * the union types. Using a ContentFilter makes working with the structure
 * in typescript much easier.
 *
 * @param filter
 * @returns
 */
function convertContentDefinitionToFilter(filter) {
    const result = {};
    if (filter.term) {
        result.term = filter.term;
    }
    const dateProps = ["created", "modified"];
    // Some properties should not get converted to MatchOptions
    const specialProps = ["filterType", "subFilters", "term", ...dateProps];
    // Do the conversion
    Object.entries(filter).forEach(([key, value]) => {
        if (!specialProps.includes(key)) {
            result[key] = valueToMatchOptions(value);
        }
    });
    // Special Cases
    // subFilters; Array of ContentFilterDefinitions
    if (filter.subFilters && Array.isArray(filter.subFilters)) {
        // downcast - would be nice to skip this or use some other constuct
        const sf = filter.subFilters;
        result.subFilters = sf.map(convertContentDefinitionToFilter);
    }
    // Dates; Ensure they are all DateRange<number>
    dateProps.forEach((fld) => {
        if (filter[fld]) {
            if (filter[fld].type === "relative-date") {
                result[fld] = relativeDateToDateRange(filter[fld]);
            }
            else {
                result[fld] = cloneObject$1(filter[fld]);
            }
        }
    });
    return result;
}
/**
 * @private
 * Serialize a `ContentFilter` into an `ISearchOptions` for use with `searchItems`
 * @param filter
 * @returns
 */
function serializeContentFilterForPortal(filter) {
    let searchOptions = convertContentFilterToSearchOptions(filter);
    if (filter.subFilters) {
        const subFilterOptions = filter.subFilters.reduce((acc, entry) => {
            // Next guard is present b/c this can be used from javascript
            // but our tests are written in typescript which prevents us
            // from hitting the else
            /* istanbul ignore else */
            if (typeof entry === "object") {
                acc = mergeSearchOptions(acc, convertContentFilterToSearchOptions(entry), "OR");
            }
            return acc;
        }, { q: "", filter: "" });
        // merge with searchOptions using AND
        searchOptions = mergeSearchOptions(searchOptions, subFilterOptions, "AND");
    }
    // term is always last, and pre-pended on searchOptions.q
    if (filter.term) {
        searchOptions.q = `${filter.term} ${searchOptions.q}`.trim();
    }
    return searchOptions;
}
/**
 * @private
 * Convert a ContentFilter to a SearchOptions
 *
 * @param filter
 * @returns
 */
function convertContentFilterToSearchOptions(filter) {
    let result = {
        q: "",
        filter: "",
    };
    const dateProps = ["created", "modified"];
    const specialProps = ["filterType", "subFilters", "term", ...dateProps];
    Object.entries(filter).forEach(([key, value]) => {
        // MatchOptions may go into either q or filter
        if (!specialProps.includes(key)) {
            result = mergeSearchOptions(result, serializeMatchOptions(key, value), "AND");
        }
        // Dates only go into q
        if (dateProps.includes(key)) {
            result = mergeSearchOptions(result, serializeDateRange(key, value), "AND");
        }
    });
    return result;
}

/**
 *
 * Merge `Filter<"group">` objects
 *
 * Useful in components which may get partial filters from a variety of
 * sub-components, which are then combined into a single filter prior
 * to executing the search.
 * @param filters
 * @returns
 */
function mergeGroupFilters(filters) {
    // expand all the filters so all prop types are consistent
    const expanded = filters.map(expandGroupFilter);
    // now we can merge based on fields
    const dateFields = ["created", "modified"];
    const specialFields = ["filterType", "term", ...dateFields];
    // acc is initialized as Filter<group> but also needs it
    // in the function signature... for reasons?!
    const result = expanded.reduce((acc, entry) => {
        // process fields
        Object.entries(entry).forEach(([key, value]) => {
            // Note: getProp/setProp are used to get around
            // typescript issues with string indexing
            if (acc.hasOwnProperty(key)) {
                const existingValue = getProp(acc, key);
                // if the key is not to a special field
                if (!specialFields.includes(key)) {
                    // treat as an IMatchOptions
                    setProp(key, mergeMatchOptions(existingValue, value), acc);
                }
                else if (dateFields.includes(key)) {
                    // treat as IDateRange
                    setProp(key, mergeDateRange(existingValue, value), acc);
                }
                else if (key === "term") {
                    // append terms
                    acc[key] = `${acc[key]} ${value}`;
                }
            }
            else {
                // Acc does not have an entry for this yet
                // so just clone it
                setProp(key, cloneObject$1(value), acc);
            }
        });
        return acc;
    }, {
        filterType: "group",
    });
    return result;
}
/**
 * Prior to serialization into the query syntax for the backing APIs, we first expand [Filters](../Filter)
 *
 * Filter's can express their intent in a very terse form, but to ensure consistent structures
 * we expand them into their more verbose form.
 *
 * i.e. `title: "Water"` expands into `title: { any: ["Water"]}`
 *
 * - Fields defined as `string | string[] | MatchOptions` will be converted to a `MatchOptions`
 * - RelativeDate fields are converted to DateRange<number>
 *
 * @param filter
 * @returns
 */
function expandGroupFilter(filter) {
    const result = {};
    const dateProps = ["created", "modified"];
    // Some properties should not get converted to MatchOptions
    const specialProps = ["term", "searchUserAccess", ...dateProps];
    // Do the conversion
    Object.entries(filter).forEach(([key, value]) => {
        // handle Matchish fields
        if (!specialProps.includes(key)) {
            // setProp side-steps typescript complaining
            setProp(key, valueToMatchOptions(value), result);
        }
        // Handle date fields
        if (dateProps.includes(key)) {
            const dateFieldValue = cloneObject$1(getProp(filter, key));
            if (getProp(filter, `${key}.type`) === "relative-date") {
                setProp(key, relativeDateToDateRange(dateFieldValue), result);
            }
            else {
                setProp(key, dateFieldValue, result);
            }
        }
    });
    // searchUserAccess is boolean, so we check if the prop exists
    // vs checking if the value is truthy
    if (filter.hasOwnProperty("searchUserAccess")) {
        result.searchUserAccess = filter.searchUserAccess;
    }
    if (filter.term) {
        result.term = filter.term;
    }
    return result;
}
/**
 * @private
 * Serialize an `IGroupFilterDefinition` into an `ISearchOptions` for use
 * with `searchGroups`
 * @param filter
 * @returns
 */
function serializeGroupFilterForPortal(filter) {
    let result = {
        q: "",
        filter: "",
    };
    const dateProps = ["created", "modified"];
    const specialProps = ["term", "searchUserAccess", "filterType", ...dateProps];
    Object.entries(filter).forEach(([key, value]) => {
        // MatchOptions fields
        if (!specialProps.includes(key)) {
            result = mergeSearchOptions(result, serializeMatchOptions(key, value), "AND");
        }
        // Dates only go into q
        if (dateProps.includes(key)) {
            result = mergeSearchOptions(result, serializeDateRange(key, value), "AND");
        }
    });
    // searchUserAccess is also a top-level property
    if (filter.hasOwnProperty("searchUserAccess")) {
        result.searchUserAccess = filter.searchUserAccess;
    }
    // add the term
    if (filter.term) {
        result.q = `${filter.term} ${result.q}`.trim();
    }
    return result;
}

/**
 *
 * Merge `Filter<"user">` objects
 *
 * Useful in components which may get partial filters from a variety of
 * sub-components, which are then combined into a single filter prior
 * to executing the search.
 * @param filters
 * @returns
 */
function mergeUserFilters(filters) {
    // expand all the filters so all prop types are consistent
    const expanded = filters.map(expandUserFilter);
    // now we can merge based on fields
    const dateFields = ["created", "modified", "lastlogin"];
    const specialFields = ["disabled", "term", "filterType", ...dateFields];
    // acc is initialized as Filter<group> but also needs it
    // in the function signature... for reasons?!
    const result = expanded.reduce((acc, entry) => {
        // process fields
        Object.entries(entry).forEach(([key, value]) => {
            // Note: getProp/setProp are used to get around
            // typescript issues with string indexing
            if (acc.hasOwnProperty(key)) {
                const existingValue = getProp(acc, key);
                // if the key is not to a special field
                if (!specialFields.includes(key)) {
                    // treat as an IMatchOptions
                    setProp(key, mergeMatchOptions(existingValue, value), acc);
                }
                else if (dateFields.includes(key)) {
                    // treat as IDateRange
                    setProp(key, mergeDateRange(existingValue, value), acc);
                }
                else if (key === "term") {
                    // append terms
                    acc[key] = `${acc[key]} ${value}`;
                }
            }
            else {
                // Acc does not have an entry for this yet
                // so just clone it
                setProp(key, cloneObject$1(value), acc);
            }
        });
        return acc;
    }, {
        filterType: "user",
    });
    return result;
}
/**
 * Prior to serialization into the query syntax for the backing APIs, we first expand [Filters](../Filter)
 *
 * Filter's can express their intent in a very terse form, but to ensure consistent structures
 * we expand them into their more verbose form.
 *
 * i.e. `firstname: "John"` expands into `firstname: { any: ["John"]}`
 *
 * - Fields defined as `string | string[] | MatchOptions` will be converted to a `MatchOptions`
 * - RelativeDate fields are converted to DateRange<number>
 * @param filter
 * @returns
 */
function expandUserFilter(filter) {
    const result = {};
    const dateProps = ["created", "modified", "lastlogin"];
    const specialProps = ["disabled", "term", ...dateProps];
    Object.entries(filter).forEach(([key, value]) => {
        // handle Matchish fields
        if (!specialProps.includes(key)) {
            // setProp side-steps typescript complaining
            setProp(key, valueToMatchOptions(value), result);
        }
        // Handle date fields
        if (dateProps.includes(key)) {
            const dateFieldValue = cloneObject$1(getProp(filter, key));
            if (getProp(filter, `${key}.type`) === "relative-date") {
                setProp(key, relativeDateToDateRange(dateFieldValue), result);
            }
            else {
                setProp(key, dateFieldValue, result);
            }
        }
    });
    // disabled is boolean, so we check if the prop exists
    // vs checking if the value is truthy
    if (filter.hasOwnProperty("disabled")) {
        result.disabled = filter.disabled;
    }
    if (filter.term) {
        result.term = filter.term;
    }
    return result;
}
/**
 * @private
 * Serialize an `IUserFilterDefinition` into an `ISearchOptions` for use
 * with `searchUsers`
 * @param filter
 * @returns
 */
function serializeUserFilterForPortal(filter) {
    let result = {
        q: "",
        filter: "",
    };
    const dateProps = ["created", "modified", "lastlogin"];
    const specialProps = ["term", "filterType", ...dateProps];
    Object.entries(filter).forEach(([key, value]) => {
        // MatchOptions fields
        if (!specialProps.includes(key)) {
            result = mergeSearchOptions(result, serializeMatchOptions(key, value), "AND");
        }
        // Dates only go into q
        if (dateProps.includes(key)) {
            result = mergeSearchOptions(result, serializeDateRange(key, value), "AND");
        }
    });
    // disabled is also a top-level property
    if (filter.hasOwnProperty("disabled")) {
        result.disabled = filter.disabled;
    }
    // add the term
    if (filter.term) {
        // Note: this is slightly different from other types
        result.q = `(${filter.term}) ${result.q}`.trim();
    }
    return result;
}

/**
 * Search for content via the Portal or Hub API
 * @param filter
 * @param options
 */
async function _searchContent(filter, options) {
    var _a;
    // expand filter so we can serialize to either api
    const expanded = expandContentFilter(filter);
    // API
    const api = expandApi(options.api || "arcgis");
    let searchPromise;
    // map over the apis, depending on the type we issue the queries
    // const searchPromises = apis.map((api) => {
    // Portal Search
    if (api.type === "arcgis") {
        // serialize for portal
        const so = serializeContentFilterForPortal(expanded);
        // pass auth forward
        if (options.authentication) {
            so.authentication = options.authentication;
        }
        else {
            so.portal = `${api.url}/sharing/rest`;
        }
        // Aggregations
        if ((_a = options.aggregations) === null || _a === void 0 ? void 0 : _a.length) {
            so.countFields = options.aggregations.join(",");
            so.countSize = 200;
        }
        // copy over various options
        // TODO: Dry this up - typscript makes this... inconvenient
        if (options.num) {
            so.num = options.num;
        }
        if (options.sortField) {
            so.sortField = options.sortField;
        }
        if (options.sortOrder) {
            so.sortOrder = options.sortOrder;
        }
        if (options.site) {
            so.site = cloneObject$1(options.site);
        }
        searchPromise = searchPortal(so);
    }
    else {
        // Hub API Search
        // TODO: Implement hub api content search
        searchPromise = Promise.resolve({
            total: 0,
            results: [],
            facets: [],
            hasNext: false,
            next: () => {
                Promise.resolve(null);
            },
        });
    }
    // });
    // return for results
    return searchPromise;
}
/**
 * Internal portal search, which then converts items to Content, and
 * if a Site was passed, also sets urls
 *
 * @param searchOptions
 * @param site
 * @returns
 */
function searchPortal(searchOptions) {
    return searchItems(searchOptions).then((resp) => {
        const hasNext = resp.nextStart > -1;
        let content = resp.results.map(itemToContent);
        if (searchOptions.site) {
            content = content.map((entry) => setContentSiteUrls(entry, searchOptions.site));
        }
        // convert aggregations into facets
        const facets = convertPortalResponseToFacets(resp);
        return {
            total: resp.total,
            results: content,
            facets,
            hasNext,
            next: getNextFunction(searchOptions, resp.nextStart, resp.total, searchPortal),
        };
    });
}

/**
 * Search Groups using Filter<"group">
 *
 * Currently just returns ISearchResult<IGroup>
 * @param filter
 * @param options
 * @returns
 */
async function _searchGroups(filter, options) {
    var _a;
    // expand filter so we can serialize to either api
    const expanded = expandGroupFilter(filter);
    // API
    const api = expandApi(options.api || "arcgis");
    if (api.type === "arcgis") {
        const so = serializeGroupFilterForPortal(expanded);
        let token = "";
        // if we have auth, pass it forward
        // otherwise set the portal property
        if (options.authentication) {
            so.authentication = options.authentication;
            const us = options.authentication;
            token = us.token;
        }
        else {
            so.portal = `${api.url}/sharing/rest`;
        }
        // TODO: Dry this up - typscript makes this... inconvenient
        if (options.num) {
            so.num = options.num;
        }
        if (options.sortField) {
            so.sortField = options.sortField;
        }
        if (options.sortOrder) {
            so.sortOrder = options.sortOrder;
        }
        let portalUrl = `${api.url}/sharing/rest`;
        if ((_a = so.authentication) === null || _a === void 0 ? void 0 : _a.portal) {
            portalUrl = so.authentication.portal;
        }
        if (options.site) {
            so.site = cloneObject$1(options.site);
        }
        return searchPortalGroups(so);
    }
    else {
        throw new Error("_searchGroups is not implemented for non-arcgis apis");
    }
}
/**
 * Internal function that searches for groups using the ArcGIS Portal API
 * @param searchOptions
 * @returns
 */
function searchPortalGroups(searchOptions) {
    var _a;
    const teamLinkify = (group) => {
        group.siteTeamUrl = `${searchOptions.site.item.url}/teams/${group.id}/about`;
        return group;
    };
    const portalUrl = ((_a = searchOptions.authentication) === null || _a === void 0 ? void 0 : _a.portal) ||
        "https://www.arcgis.com/sharing/rest";
    let token;
    if (searchOptions.authentication) {
        const us = searchOptions.authentication;
        token = us.token;
    }
    const thumbnailify = (group) => {
        group.thumbnailUrl = getGroupThumbnailUrl(portalUrl, group, token);
        return group;
    };
    // execute the search
    return searchGroups(searchOptions).then((response) => {
        var _a, _b;
        const hasNext = response.nextStart > -1;
        // upgrade thumbnail url
        let results = response.results.map(thumbnailify);
        // generate the site team url if site url is provided
        if ((_b = (_a = searchOptions.site) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.url) {
            results = response.results.map(teamLinkify);
        }
        return {
            hasNext,
            total: response.total,
            results,
            next: getNextFunction(searchOptions, response.nextStart, response.total, searchPortalGroups),
        };
    });
}

/**
 * Search for Users via the Portal API.
 *
 * **Note** Authentication is required
 *
 * Note: in the future, there may be options to search via
 * a Hub specific API
 * @param filter
 * @param options
 * @returns
 */
async function _searchUsers(filter, options) {
    // JS Clients may not pass in authentication
    if (!options.authentication) {
        throw new Error("Authentication required to search for users.");
    }
    // expand filter so we can serialize to either api
    const expanded = expandUserFilter(filter);
    // API
    const api = expandApi(options.api || "arcgis");
    if (api.type === "arcgis") {
        const searchOptions = serializeUserFilterForPortal(expanded);
        // carry the auth forward
        searchOptions.authentication = options.authentication;
        // TODO: Dry this up - typscript makes this... inconvenient
        if (options.num) {
            searchOptions.num = options.num;
        }
        if (options.sortField) {
            searchOptions.sortField = options.sortField;
        }
        if (options.sortOrder) {
            searchOptions.sortOrder = options.sortOrder;
        }
        if (options.site) {
            searchOptions.site = cloneObject$1(options.site);
        }
        return searchPortalUsers(searchOptions);
    }
    else {
        throw new Error("_searchUsers is not implemented for non-arcgis apis");
    }
}
/**
 * Internal function that executes the user search along with
 * some simple enrichments
 * @param searchOptions
 * @returns
 */
function searchPortalUsers(searchOptions) {
    const portalUrl = searchOptions.authentication.portal;
    const token = searchOptions.authentication.token;
    // Partially applied functions for mapping over the results
    const userLinkify = (user) => {
        user.profileUrl = `${searchOptions.site.item.url}/people/${user.username}/profile`;
        return user;
    };
    const thumbnailify = (user) => {
        if (user.thumbnail) {
            user.thumbnailUrl = getUserThumbnailUrl(portalUrl, user, token);
        }
        return user;
    };
    return searchUsers(searchOptions).then((response) => {
        var _a, _b;
        const hasNext = response.nextStart > -1;
        // upgrade thumbnail url
        let results = response.results.map(thumbnailify);
        // generate the site team url if site url is provided
        if ((_b = (_a = searchOptions.site) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.url) {
            results = response.results.map(userLinkify);
        }
        return {
            hasNext,
            total: response.total,
            results,
            next: getNextFunction(searchOptions, response.nextStart, response.total, searchPortalUsers),
        };
    });
}

/**
 * Parse a response object, and throw if it contains an error.
 * Just a wrapper to hide some platform idiosyncracies
 * @param {Response} response Response object to parse
 * @private
 */
async function _checkStatusAndParseJson(response) {
    if (response.status >= 200 && response.status < 300) {
        // don't try to parse the body if it's empty
        // if (response.body) { // the fetch polyfill for IE... does not expose a body property... :(
        return response.json();
        // }
    }
    else {
        // we're gonna throw, but we need to construct the error
        return response.json().then((json) => {
            if (json.error) {
                const error = new Error(`${json.error.title} :: ${json.error.detail} :: ${response.status}`);
                throw error;
            }
            else {
                throw new Error(`Got ${response.status} ${response.statusText}`);
            }
        });
    }
}

/**
 * Construct the auth header from a hub request options
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _getAuthHeader(hubRequestOptions) {
    const result = {};
    const token = getProp(hubRequestOptions, "authentication.token");
    if (token) {
        result.Authorization = token;
    }
    return result;
}

/**
 * Extract the domain service from the request options
 * @param {string} hubApiUrl
 * @private
 */
function _getDomainServiceUrl(hubApiUrl) {
    const base = hubApiUrl || "https://hub.arcgis.com";
    return `${base}/api/v3/domains`;
}

/**
 * Lookup a domain in Portal
 * @param {string} hostname to locate the site for
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _lookupPortal(hostname, requestOptions) {
    // for portal we search for a site w/ `hubsubdomain|<domain>` type keyword
    let subdomain = hostname;
    // if this subdomain has a hash in it, knock that off
    if (hostname.indexOf("#/") > -1) {
        subdomain = hostname.split("#/")[1];
    }
    const queryTerm = `hubsubdomain|${subdomain}`;
    const opts = Object.assign({
        q: `typekeywords: ${queryTerm}`,
    }, requestOptions);
    return searchItems(opts)
        .then((res) => {
        // since the search api stems the terms, we need to verify
        // by looking at the results
        return res.results.filter((r) => {
            return includes(r.typeKeywords, queryTerm);
        })[0];
    })
        .then((site) => {
        if (!site)
            throw new Error("site not found");
        return {
            hostname: site.url,
            siteId: site.id,
        };
    });
}

/**
 * Create an entry in the domain system
 * @param {IHubDomain} domainEntry Domain hash to be stored
 * @param {IHubRequestOptions} hubRequestOptions
 */
function addDomain(domainEntry, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`addDomain is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = _getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}`;
    // handle case of siteTitle being numeric
    const title = domainEntry.siteTitle;
    if (typeof title === "number") {
        domainEntry.siteTitle = title.toString();
    }
    return fetch(url, {
        method: "POST",
        headers,
        mode: "cors",
        body: JSON.stringify(domainEntry),
    }).then(_checkStatusAndParseJson);
}

/**
 * Check if a domain entry exists. Different from lookupDomain
 * in that this will return true/false, where as lookupDomain will
 * return the domain entry or throw. However, lookupDomain can work
 * with ArcGIS Enterprise.
 * Will throw if used in Portal.
 * @param {string} hostname Domain entry to check for
 * @param {IHubRequestOptions} hubRequestOptions
 */
function domainExists(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`domainExists is not available in ArcGIS Enterprise.`);
    }
    hostname = stripProtocol(hostname);
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${hostname}`;
    const headers = _getAuthHeader(hubRequestOptions);
    return fetch(url, { method: "GET", headers, mode: "cors" }).then((response) => response.status !== 404);
}

/**
 * Check if an item exists with the specified domain keyword
 * @param {String} hostname to check for
 * @param {IHubRequestOptions} hubRequestOptions
 */
function domainExistsPortal(hostname, hubRequestOptions) {
    return _lookupPortal(hostname, hubRequestOptions)
        .then((_) => {
        return true;
    })
        .catch((_) => {
        return false;
    });
}

/**
 * Get a list
 * @param {string} siteId Item id of the Site
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getDomainsForSite(siteId, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve([]);
    }
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}?siteId=${siteId}`;
    const headers = _getAuthHeader(hubRequestOptions);
    return fetch(url, { method: "GET", headers, mode: "cors" })
        .then(_checkStatusAndParseJson)
        .catch((err) => {
        throw Error(`Error in getDomainsForSite ${err}`);
    });
}

/**
 * Ensure a unique domain name by checking for and incrementing
 * a subdomain
 * @param {String} subdomain Subdomain to ensure is unique
 * @param {String} baseHostname base hostname
 * @param hubRequestOptions
 * @param {Number} step Step number
 */
function getUniqueDomainName(subdomain, baseHostname, hubRequestOptions, step = 0) {
    let combinedName = subdomain;
    if (step) {
        combinedName = subdomain + "-" + step;
    }
    const hostname = `${combinedName}-${baseHostname}`;
    return domainExists(hostname, hubRequestOptions).then((exists) => {
        // if result === true, then we need to step the name...
        if (exists) {
            const nextStep = step + 1;
            return getUniqueDomainName(subdomain, baseHostname, hubRequestOptions, nextStep);
        }
        else {
            return combinedName;
        }
    });
}

/**
 * Ensure a unique domain name by checking for and incrementing
 * a subdomain
 * @param {String} subdomain Subdomain to ensure is unique
 * @param {IHubRequestOptions} hubRequestOptions
 * @param {*} step Step number
 */
function getUniqueDomainNamePortal(subdomain, hubRequestOptions, step = 0) {
    let combinedName = subdomain;
    if (step) {
        combinedName = subdomain + "-" + step;
    }
    // now we search for existing items w/ this...
    return domainExistsPortal(combinedName, hubRequestOptions).then((exists) => {
        if (exists) {
            const nextStep = step + 1;
            return getUniqueDomainNamePortal(subdomain, hubRequestOptions, nextStep);
        }
        else {
            return combinedName;
        }
    });
}

/**
 * Determine if a domain entry belongs to a legacy site.
 * This is used to allow customers to "reclaim" domains that
 * were associated with legacy sites which can no longer be
 * edited.
 * @param {IHubDomain} domainEntry Domain Info record
 */
function isDomainForLegacySite(domainEntry) {
    return !isGuid(domainEntry.siteId);
}

/**
 * Fetch a the information about a domain.
 * Different implementation for Portal vs AGO
 * @param {string} hostname of domain record to locate
 * @param {IHubRequestOptions} hubRequestOptions
 */
function lookupDomain(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return _lookupPortal(hostname, hubRequestOptions);
    }
    else {
        const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${hostname}`;
        const headers = _getAuthHeader(hubRequestOptions);
        return fetch(url, { method: "GET", headers, mode: "cors" }).then(_checkStatusAndParseJson);
    }
}

/**
 * Check to see if a domain is in use by any site other than the
 * one passed in. This is used in various validators while the
 * user is editing properties of the site.
 * @param {string} hostname to check
 * @param {string} siteId Site Id we are checking for
 * @param {IHubRequestOptions} hubRequestOptions
 */
function isDomainUsedElsewhere(hostname, siteId, hubRequestOptions) {
    return lookupDomain(hostname, hubRequestOptions)
        .then((domainEntry) => {
        return domainEntry.siteId !== siteId;
    })
        .catch(() => {
        // domain entry not found, ergo not used on another site
        return false;
    });
}

/**
 * Validate a custom domain
 * @param {string} hostname to validate
 * @param {IHubRequestOptions} hubRequestOptions
 */
function isValidDomain(hostname, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`isValidDomain is not available in ArcGIS Enterprise.`);
    }
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/validate?hostname=${hostname}`;
    const headers = _getAuthHeader(hubRequestOptions);
    return fetch(url, { method: "GET", headers, mode: "cors" })
        .then((response) => {
        return response.json();
    })
        .catch((e) => {
        return {
            success: false,
            input: hostname,
            error: {
                code: 400,
                detail: e,
                message: "lookupFailed",
            },
        };
    });
}

/**
 * Remove a domain entry.
 * User must be a member of the org that owns the domain entry.
 * @param {int} domainId Id of the domain entry to remove
 * @param {IHubRequestOptions} hubRequestOptions`dom
 */
function removeDomain(domainId, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`removeDomain is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = _getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${domainId}`;
    return fetch(url, { method: "DELETE", headers, mode: "cors" }).then(_checkStatusAndParseJson);
}

/**
 * Update an entry in the domain system
 * @param {IHubDomain} domainEntry  Doman object to be updated
 * @param {IHubRequestOptions} hubRequestOptions
 */
function updateDomain(domainEntry, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        throw new Error(`updateDomain is not available in ArcGIS Enterprise. Instead, edit the hubdomain typekeyword on the item`);
    }
    const headers = _getAuthHeader(hubRequestOptions);
    headers["Content-Type"] = "application/json";
    const url = `${_getDomainServiceUrl(hubRequestOptions.hubApiUrl)}/${domainEntry.id}`;
    // handle case of siteTitle being numeric
    const title = domainEntry.siteTitle;
    if (typeof title === "number") {
        domainEntry.siteTitle = title.toString();
    }
    return fetch(url, {
        method: "PUT",
        headers,
        mode: "cors",
        body: JSON.stringify(domainEntry),
    }).then(_checkStatusAndParseJson);
}

/**
 * Ensure that a subdomain is not greater than 63 characters in length
 * Subdomains are prep-ended on the org's url key, and the combined
 * length can not exceed 63 chars as per rules of domains.
 * If the requested subdomain + the url key is > 63 chars, we
 * strip off the last 6 chars and replace that w/ random characeters
 * This was an actual reported bug.
 * @param {String} subdomain Proposed subdomain
 * @param {String} urlKey Org url key
 * @private
 */
function _ensureSafeDomainLength(subdomain, urlKey) {
    let result = cloneObject$1(subdomain);
    let max = 63;
    if (urlKey)
        max = max - (urlKey.length + 1);
    if (result.length > max) {
        result = `${result.slice(0, max - 6)}-${generateRandomString(5)}`;
    }
    return result;
}

/**
 * Given a subdomain, ensure that we have a unique hostname
 * incrementing if needed
 * @param {String} subdomain Subdomain to unique-ify
 * @param {IHubRequestOptions} hubRequestOptions
 */
function ensureUniqueDomainName(subdomain, hubRequestOptions) {
    let prms;
    if (hubRequestOptions.isPortal) {
        prms = getUniqueDomainNamePortal(subdomain, hubRequestOptions);
    }
    else {
        const baseDomain = `${hubRequestOptions.portalSelf.urlKey}.${stripProtocol(getHubApiUrl(hubRequestOptions))}`;
        prms = getUniqueDomainName(subdomain, baseDomain, hubRequestOptions);
    }
    return prms.then((uniqueDomain) => {
        return _ensureSafeDomainLength(uniqueDomain, hubRequestOptions.portalSelf.urlKey);
    });
}

/**
 * Get a Site Model by it's Item Id, and apply schema upgrades
 * @param {String} id Site Item Id
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getSiteById(id, hubRequestOptions) {
    return getModel(id, hubRequestOptions).then(upgradeSiteSchema);
}

/**
 * Builds a draft with a subset of the model properties
 * @param {*} model - item model
 * @param {*} includeList - list of property paths to include in draft object
 */
function buildDraft(model, includeList) {
    return mergeObjects(model, {}, includeList);
}

/**
 * Add telemetry config object
 * @private
 * @param {object} model Site Model
 * @returns {object}
 */
function _ensureTelemetry(model) {
    if (getProp(model, "item.properties.schemaVersion") >= 1.4)
        return model;
    const clone = cloneObject$1(model);
    const gacode = getProp(clone, "data.values.gacode");
    clone.data.values.telemetry = {
        consentNotice: {
            isTheme: true,
            consentText: "",
            policyURL: "",
        },
        customAnalytics: {
            ga: {
                customerTracker: {
                    enabled: Boolean(gacode),
                    id: gacode,
                },
            },
        },
    };
    deleteProp(clone, "data.values.gacode");
    setProp("item.properties.schemaVersion", 1.4, clone);
    return clone;
}

const SITE_SCHEMA_VERSION = 1.5;

/**
 * Apply the first schema version to the item
 * @param {Object} model Site Model
 * @private
 */
function _applySiteSchema(model) {
    // if this has already been thru this step... skip it...
    if (getProp(model, "item.properties.schemaVersion") >= 1)
        return model;
    const clone = cloneObject$1(model);
    // proactively purge old properties
    ["groupId", "title"].forEach((prop) => {
        delete clone.data.values[prop];
    });
    // ensure item.properties
    if (!clone.item.properties) {
        clone.item.properties = {};
    }
    clone.item.properties.schemaVersion = 1;
    // Groups!
    if (clone.data.values.groups && Array.isArray(clone.data.values.groups)) {
        // we have some groups arrays in prod where the contents are a mix of strings and objects.
        // we need to ensure this is just an array of groupIds...
        const groupIds = clone.data.values.groups
            .map((entry) => {
            if (typeof entry === "object") {
                return entry.id;
            }
            else {
                return entry;
            }
        })
            .filter((entry) => !!entry);
        // now assign this back to the groups
        clone.data.values.groups = groupIds;
    }
    return clone;
}

/**
 * Enforce lowercase domains
 * @param {Object} model Site Model
 * @private
 */
function _enforceLowercaseDomains(model) {
    // exit if this has been applied...
    if (getProp(model, "item.properties.schemaVersion") >= 1.1)
        return model;
    const clone = cloneObject$1(model);
    // all the possible domain properties must be lower case
    [
        "subdomain",
        "defaultHostname",
        "internalUrl",
        "customHostname",
        "externalUrl",
    ].forEach((prop) => {
        if (clone.data.values[prop] &&
            typeof clone.data.values[prop] === "string") {
            clone.data.values[prop] = clone.data.values[prop].toLowerCase();
        }
    });
    // bump the schemaVersion
    clone.item.properties.schemaVersion = 1.1;
    return clone;
}

/**
 * Move the data.values.groups array into the
 * data.catalog object
 * @param {Object} model Site Model
 * @private
 */
function _ensureCatalog(model) {
    // early exit
    if (getProp(model, "item.properties.schemaVersion") >= 1.2)
        return model;
    const clone = cloneObject$1(model);
    const catalog = getProp(clone, "data.catalog") || {};
    if (getProp(clone, "data.values.groups")) {
        catalog.groups = cloneObject$1(clone.data.values.groups);
        delete clone.data.values.groups;
    }
    clone.data.catalog = catalog;
    // bump the schemaVersion
    clone.item.properties.schemaVersion = 1.2;
    return clone;
}

/**
 * Remove any non-guid entries from the data catalog groups array
 * @param {object} model Site Model
 * @private
 */
function _purgeNonGuidsFromCatalog(model) {
    if (getProp(model, "item.properties.schemaVersion") >= 1.3)
        return model;
    const clone = cloneObject$1(model);
    const groups = getProp(clone, "data.catalog.groups") || [];
    clone.data.catalog.groups = groups.filter(isGuid);
    clone.item.properties.schemaVersion = 1.3;
    return clone;
}

/**
 * Migrates the site so it can store configurations for multiple feed formats
 * (dcat-us-1.1, dcat-ap-2.0.1, etc.). If the site has an existing custom
 * configuration for dcat-us 1.1, a copy of that configuration will be modified
 * to use values from the v3 api instead of values from the index.
 *
 * Structural Impacts:
 * - site.data.feeds will be added.
 * - site.data.feeds.dcatUS11 will be added if site.data.values.dcatConfig exists.
 *
 * @param {object} model Site Model
 * @private
 */
function _migrateFeedConfig(model) {
    if (getProp(model, "item.properties.schemaVersion") >= 1.5)
        return model;
    const clone = cloneObject$1(model);
    const oldDcatUS11Config = clone.data.values.dcatConfig;
    clone.data.feeds = {};
    if (oldDcatUS11Config) {
        clone.data.feeds.dcatUS11 = _migrateToV3Values(oldDcatUS11Config);
    }
    clone.item.properties.schemaVersion = 1.5;
    return clone;
}
const indexValueToV3Value = {
    // Defaults
    "{{default.name}}": "{{name}}",
    "{{default.description}}": "{{description}}",
    "{{item.tags}}": "{{tags}}",
    "{{item.created:toISO}}": "{{created:toISO}}",
    "{{item.modified:toISO}}": "{{modified:toISO}}",
    "{{default.source.source}}": "{{source}}",
    "{{item.owner}}": "{{owner}}",
    "{{org.portalProperties.links.contactUs.url}}": "{{orgContactEmail}}",
    // Custom Values
    "{{org.name}}": "{{orgName}}",
    "{{item.categories}}": "{{categories}}",
    "{{item.licenseInfo}}": "{{licenseInfo}}",
    "{{item.modified}}": "{{modified}}",
    "{{enrichments.categories}}": "{{categories}}",
    "{{default.id}}": "{{id}}",
    "{{item.licenseInfo || No License}}": "{{licenseInfo || No License}}",
    "{{org.portalProperties.links.contactUs.url || mailto:data@tempe.gov}}": "{{orgContactEmail || mailto:data@tempe.gov}}",
    "{{default.description || No Description}}": "{{description || No Description}}",
    "{{item.id}}": "{{id}}",
};
function _migrateToV3Values(originalConfig) {
    let migratedConfigString = JSON.stringify(originalConfig);
    const supportedIndexValues = Object.keys(indexValueToV3Value);
    supportedIndexValues.forEach((indexValue) => {
        // Replace all occurrences of indexValue with the corresponding v3Value
        const v3Value = indexValueToV3Value[indexValue];
        migratedConfigString = migratedConfigString.split(indexValue).join(v3Value);
    });
    return JSON.parse(migratedConfigString);
}

/**
 * Upgrades the schema upgrades
 * @param model IModel
 */
function upgradeSiteSchema(model) {
    if (getProp(model, "item.properties.schemaVersion") === SITE_SCHEMA_VERSION) {
        return model;
    }
    else {
        // apply upgrade functions in order...
        model = _applySiteSchema(model);
        model = _enforceLowercaseDomains(model);
        model = _ensureCatalog(model);
        model = _purgeNonGuidsFromCatalog(model);
        model = _ensureTelemetry(model);
        model = _migrateFeedConfig(model);
        return model;
    }
}

/**
 * Returns site model given various kinds of identifier
 *
 * @param identifier - a site item ID, site hostname, enterprise site slug, or full site URL
 * @param hubRequestOptions
 */
function fetchSite(identifier, hubRequestOptions) {
    let prms;
    if (isGuid(identifier)) {
        prms = getSiteById(identifier, hubRequestOptions);
    }
    else {
        let hostnameOrSlug = identifier;
        // get down the the hostname
        hostnameOrSlug = stripProtocol(hostnameOrSlug);
        hostnameOrSlug = hostnameOrSlug.split("/")[0];
        prms = lookupDomain(hostnameOrSlug, hubRequestOptions).then(({ siteId }) => getSiteById(siteId, hubRequestOptions));
    }
    return prms;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/**
 * Locales supported by the hub
 */
const HUB_LOCALES = [
    "ar",
    "bs",
    "ca",
    "cs",
    "da",
    "de",
    "en",
    "es",
    "et",
    "el",
    "fi",
    "fr",
    "hr",
    "he",
    "hu",
    "it",
    "id",
    "ja",
    "ko",
    "lt",
    "lv",
    "nb",
    "nl",
    "pl",
    "pt",
    "pt-br",
    "pt-pt",
    "ro",
    "ru",
    "sl",
    "sr",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh",
    "zh-cn",
    "zh-tw",
    "zh-hk"
];

/**
 * Convert a requested locale into a locale we support.
 * i.e. en-ca => en
 * If the requested locale is not available, en will be returned
 * @param {string} requestedLocale Locale we want
 */
function convertToWellKnownLocale(requestedLocale = "en") {
    let wellKnownKey = "en";
    // ensure downcase
    requestedLocale = requestedLocale.toLowerCase();
    // see if it's in the hub translations as-is
    if (HUB_LOCALES.indexOf(requestedLocale) > -1) {
        wellKnownKey = requestedLocale;
    }
    else {
        // if we split the requested locale, see if we have the root in the list
        const parts = requestedLocale.split("-");
        if (parts.length > 1 && HUB_LOCALES.indexOf(parts[0]) > -1) {
            wellKnownKey = parts[0];
        }
    }
    return wellKnownKey;
}

/**
 * Fetch the Hub translation file for a given locale
 * These are all public urls and should never require auth/tokens etc
 * @param {String} locale Locale code - i.e. `es`
 * @param {Object} portal Portal Self
 */
function fetchHubTranslation(locale, portal, mode = "cors") {
    const assetBase = getHubLocaleAssetUrl(portal);
    const url = `${assetBase}/locales/${locale}.json`.toLocaleLowerCase();
    // to support web-tier auth, we must always send same-origin credentials
    const options = {
        method: "GET",
        credentials: "same-origin",
        mode
    };
    return fetch(url, options)
        .then(response => response.json())
        .catch(err => {
        throw Error(`Attempt to fetch locale ${locale} from ${url} failed: ${JSON.stringify(err)}`);
    });
}

/**
 * Return the culture from the Hub Request Options
 * In priority order: user.culture, portal.culture, en-us
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getCulture(hubRequestOptions) {
    return (getProp(hubRequestOptions, "portalSelf.user.culture") ||
        getProp(hubRequestOptions, "portalSelf.culture") ||
        "en-us");
}

/**
 * remote server error
 */
class RemoteServerError extends Error {
    constructor(message, url, status) {
        super(message);
        this.status = status;
        this.url = url;
    }
}
/**
 * ```js
 * import { hubApiRequest } from "@esri/hub-common";
 * //
 * hubApiRequest(
 *   "/datasets",
 *   requestOptions
 * })
 *   .then(response);
 * ```
 * make a request to the Hub API
 * @param route API route
 * @param requestOptions request options
 */
function hubApiRequest(route, requestOptions) {
    // merge in default request options
    const options = Object.assign({ 
        // why do we default to GET w/ our API?
        httpMethod: "GET" }, requestOptions);
    // use fetch override if any
    const _fetch = options.fetch || fetch;
    // merge in default headers
    const headers = Object.assign({ "Content-Type": "application/json" }, options.headers);
    // build query params/body based on requestOptions.params
    let query;
    let body;
    if (options.httpMethod === "GET") {
        // pass params in query string
        query = options.params;
    }
    else {
        // pass params in request body
        body = JSON.stringify(options.params);
    }
    // build Hub API URL
    const url = buildUrl({
        host: getHubApiUrl(options),
        path: `/api/v3/${route}`.replace(/\/\//g, "/"),
        query,
    });
    return _fetch(url, {
        method: options.httpMethod,
        headers,
        body,
    }).then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
        else {
            throw new RemoteServerError(resp.statusText, url, resp.status);
        }
    });
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Gets the primary input Feature Service for the given
 * Form ID. This will be the Fieldworker view, if it exists,
 * otherwise the source Feature Service.
 * @param {string} formId The Form ID
 * @param requestOptions The request options
 * @returns {Promise<IModel>}
 */
const getInputFeatureServiceModel = (formId, requestOptions) => {
    return getRelatedItems(Object.assign({ id: formId, relationshipType: "Survey2Service", direction: "forward" }, requestOptions)).then(({ relatedItems: [featureService] }) => {
        let model;
        if (featureService) {
            model = { item: featureService };
        }
        return model;
    });
};

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Fetches a Survey's source Feature Service from a given
 * Fieldworker View ID
 * @param {string} fieldworkerId The Fieldworker View ID
 * @param {IRequestOptions} requestOptions The request options
 * @returns {Promise<IModel>}
 */
const getSourceFeatureServiceModelFromFieldworker = (fieldworkerId, requestOptions) => {
    return getRelatedItems(Object.assign({ id: fieldworkerId, relationshipType: "Service2Data", direction: "forward" }, requestOptions)).then(({ relatedItems: [featureService] }) => {
        let model;
        if (featureService) {
            model = { item: featureService };
        }
        return model;
    });
};

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Fetches a Survey's Stakeholder View for a given
 * Form ID
 * @param {string} formId A Form ID
 * @param {IRequestOptions} requestOptions The request options
 * @returns {Promise<IModel>}
 */
const getStakeholderModel = (formId, requestOptions) => {
    return getRelatedItems(Object.assign({ id: formId, relationshipType: "Survey2Data", direction: "forward" }, requestOptions)).then(({ relatedItems: [stakeholderView] }) => {
        let model;
        if (stakeholderView) {
            model = { item: stakeholderView };
        }
        return model;
    });
};

/**
 * Determines if the provided Feature Service item is a
 * Fieldworker View
 * @param {IItem} featureServiceItem
 * @returns {boolean}
 */
function isFieldworkerView(featureServiceItem) {
    const hasTypekeyword = (typeKeyword) => featureServiceItem.typeKeywords.indexOf(typeKeyword) > -1;
    // Survey123 only recently added the "FieldworkerView" typekeyword
    let isFieldworker = hasTypekeyword("FieldworkerView");
    // we should support previously created fieldworkers too
    if (!isFieldworker) {
        const hasExpectedTypeKeywords = [
            "Survey123",
            "Feature Service",
            "View Service",
        ].every(hasTypekeyword);
        isFieldworker =
            hasExpectedTypeKeywords && !hasTypekeyword("StakeholderView");
    }
    return isFieldworker;
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Builds a dictionary of Survey items for the given Form model
 * @param {string} formId The Form ID of the survey
 * @param {IRequestOptions} requestOptions The request options
 * @returns {Promise<IGetSurveyModelsResponse>}
 */
const getSurveyModels = (formItemOrId, requestOptions) => {
    let fieldworker;
    let stakeholder;
    const getForm = () => typeof formItemOrId === "string"
        ? getItem(formItemOrId, requestOptions)
        : Promise.resolve(formItemOrId);
    return getForm().then((form) => {
        const promises = [
            // the primary input will be the fieldworker (if it exists), otherwise
            // the source feature service.
            getInputFeatureServiceModel(form.id, requestOptions),
            getStakeholderModel(form.id, requestOptions),
        ];
        return Promise.all(promises)
            .then(([featureServiceOrFieldworkerModelResult, stakeholderResult]) => {
            stakeholder = stakeholderResult;
            if (featureServiceOrFieldworkerModelResult &&
                isFieldworkerView(featureServiceOrFieldworkerModelResult.item)) {
                fieldworker = featureServiceOrFieldworkerModelResult;
                // if the primary input is the fieldworker, fetch
                // the source feature service
                return getSourceFeatureServiceModelFromFieldworker(fieldworker.item.id, requestOptions);
            }
            else {
                return featureServiceOrFieldworkerModelResult;
            }
        })
            .then((featureService) => {
            return {
                form: { item: form },
                featureService,
                fieldworker,
                stakeholder,
            };
        });
    });
};

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Allows an application to track a series of operations, storing information
 * about the arguments passes in and the results returned
 *
 * ```js
 * import { OperationStack } from '@esri/solution-common';
 *
 * const stack = new OperationStack();
 *
 * // start an operation by type
 * const id = stack.start('getItem');
 * //.. work happens...
 * stack.finish(id);
 *
 * // start an operation with an Operation object
 * stack.start({
 *   id: 'createItem_1',
 *   type: 'createItem',
 *   inputs: {
 *    item: {...truncated...},
 *    portal: 'https://www.arcgis.com',
 *    username: 'jsmith'
 *   },
 * });
 * // make the call
 * stack.finish('createItem_1', {newItemId: '00cf213'});
 *
 * // later you can get that information back out of the stack
 * const prevOp = stack.getOperation('createItem_1);
 *
 * // and if you need to roll back you can use the
 * // .cleanup and .output properties to help orchestrate
 *
 * ```
 *
 *
 * Can be used to implement "atomic" operations in an environment that does not
 * have this as a core feature
 */
class OperationStack {
    /**
     * Creates an instance of OperationStack.
     * @memberof OperationStack
     */
    constructor() {
        this.operations = [];
    }
    /**
     * Start an Operation
     *
     * ```js
     * const stack = new OperationStack();
     * stack.startOperation({
     *  id: 'get-bc3',
     *  type: 'getItem',
     *  cleanup: 'n/a',
     *  inputs: {
     *    id: 'bc3',
     *    owner: 'vader'
     *  }
     * });
     * // do work
     * stack.finish('get-bc3');
     * ```
     *
     *
     * @param {IOperation} operation
     * @memberof OperationStack
     */
    startOperation(operation) {
        const op = cloneObject$1(operation);
        op.startedAt = new Date().getTime();
        op.state = "working";
        this.operations.push(op);
    }
    /**
     * Start an operation without requiring a full operation
     *
     * ```js
     * const opId = stack.start('getItems');
     * //...work happens
     * stack.finish(opId);
     * ```
     *
     * @param {string} type Type of the operation. i.e. getItem
     * @param {Record<string, unknown>} [params] optionally pass in id, inputs, cleanup
     * @returns {string} Identifier of the new stack entry
     * @memberof OperationStack
     */
    start(type, params) {
        const op = {
            type,
            id: getWithDefault$1(params, "id", createId(`${type}_`)),
            inputs: getWithDefault$1(params, "inputs", {}),
            cleanup: getWithDefault$1(params, "cleanup", "n/a"),
            startedAt: new Date().getTime(),
            state: "working"
        };
        this.operations.push(op);
        return op.id;
    }
    /**
     * Returns a reference to an Operation
     *
     * @param {string} id Unique Identifier
     * @returns {Operation}
     * @memberof OperationStack
     */
    getOperation(id) {
        return this.operations.find(o => o.id === id);
    }
    /**
     * Returns reference to the operations array
     *
     * @returns {Operation[]}
     * @memberof OperationStack
     */
    getOperations() {
        return this.operations;
    }
    /**
     * Inform the stack that an operation has finished.
     *
     * This will append in a duration property, and mark
     * the state as 'completed'.
     *
     * @param {string} id Unique identifier of the Operation
     * @param {Record<string, unknown>} [options] outputs
     * @memberof OperationStack
     */
    finish(id, options) {
        const op = this.getOperation(id);
        if (op) {
            op.duration = new Date().getTime() - op.startedAt;
            op.state = "completed";
            if (options) {
                op.output = cloneObject$1(options);
            }
        }
        else {
            throw new Error(`No operation with id ${id} present in stack`);
        }
    }
    /**
     * Merge a serialized operation stack into
     * a stack instance
     *
     * ```js
     *    import { OperationStack } from '@esri/solution-common';
     *    function someFunction() {
     *      const stack = new OperationStack();
     *      stack.start('getItem', {id: 'get-bc3'});
     *      // do some work...
     *      stack.finish('get-bc3');
     *
     *      const itm = {title: 'Fake Item', type: 'Web Map'};
     *      // create an entry for the function we are about to call...
     *      stack.start('createItem', {id: 'createItem_01', inputs: {item: itm}});
     *      // call a function that does work, and has it's own stack
     *      // and returns a serialized version as part of it's results
     *      return createItem(itm)
     *      .then((result) => {
     *        // tell the stack the last operation finished...
     *        stack.finish('createItem_01');
     *        // merge in the stack from the function we called
     *        stack.merge(result.stack);
     *        // > stack.getCompleted().length === 3
     *      });
     *    }
     *
     *    function createItem (itm) {
     *      const otherStack = new OperationStack();
     *      const id = otherStack.start('createItem');
     *      // make calls to create item etc
     *      otherStack.finish(id, {itemId: newItem.id});
     *      otherStack.start('protectItem', {id: 'protect-00c'});
     *      // make call to protect item...
     *      otherStack.finish('protect-00c');
     *      // all done... return a result with a stack
     *      return Promise.resolve({
     *        success:true,
     *        stack: otherStack.serialize()
     *      });
     *    }
     * ```
     *
     *  Typically used to create a comprehensive list of operations
     *  when a function returns a `SerializedOperationStack` as part of
     *  it's response
     *
     *
     * @param {ISerializedOperationStack} stack
     * @memberof OperationStack
     */
    merge(stack) {
        this.operations = [...this.operations, ...stack.operations];
    }
    /**
     * Get a list of the completed operations
     *
     * @returns {IOperation[]}
     * @memberof OperationStack
     */
    getCompleted() {
        return cloneObject$1(this.operations.filter(e => e.state === "completed"));
    }
    /**
     *  Return an array of working operations
     *
     * @returns {IOperation[]}
     * @memberof OperationStack
     */
    getWorking() {
        return cloneObject$1(this.operations.filter(e => e.state === "working"));
    }
    /**
     * Serialize the completed operations into a set of
     * human readable messages, sorted by the startedAt timestamp
     *
     *
     * @returns {string}
     * @memberof IOperationStack
     */
    toString() {
        // sort the operations by StartedAt
        const allOps = this.operations.sort((a, b) => {
            if (a.startedAt < b.startedAt) {
                return -1;
            }
            if (b.startedAt < a.startedAt) {
                return 1;
            }
            return 0;
        });
        return allOps.map(getOperationMessage).join("\n");
    }
    /**
     * Serialize the stack into simple objects
     *
     * @returns {ISerializedOperationStack}
     * @memberof OperationStack
     */
    serialize() {
        return {
            operations: cloneObject$1(this.getOperations())
        };
    }
}
function getOperationMessage(op) {
    let msg = `${op.startedAt} : Operation ${op.id} started with inputs ${JSON.stringify(op.inputs)} but was not completed`;
    if (op.state === "completed") {
        msg = `${op.startedAt} : Operation ${op.id} took ${op.duration} ms with inputs ${JSON.stringify(op.inputs)} and output ${op.output ? JSON.stringify(op.output) : "n/a"}`;
    }
    return msg;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

export { withoutByProp as $, createOperationPipeline as A, getFamily as B, normalizeItemType as C, isSlug as D, addContextToSlug as E, hubApiRequest as F, parseDatasetId as G, mergeObjects as H, getItemHubId as I, camelize as J, buildUrl as K, Logger as L, addUsersToGroup as M, without as N, OperationStack as O, getWithDefault$1 as P, getHubProduct as Q, RemoteServerError as R, getSubscriptionType as S, getCulture as T, convertToWellKnownLocale as U, fetchHubTranslation as V, emailOrgUsers as W, autoAddUsers as X, inviteUsers as Y, getModelFromOptions as Z, _searchContent as _, abab as a, maybePush as a0, failSafeUpdate as a1, failSafe as a2, unshareItemFromGroups as a3, getModel as a4, mapBy as a5, unprotectModel as a6, serializeModel as a7, deepSet as a8, ensureUniqueString as a9, extend as aA, ensureUniqueDomainName as aB, stripProtocol as aC, upgradeSiteSchema as aD, batch as aE, getPortalUrl as aF, upgradeProtocol as aG, _searchGroups as aH, mergeGroupFilters as aI, capitalize as aJ, getExportItemTypeKeyword as aK, getExportLayerTypeKeyword as aL, getSpatialRefTypeKeyword as aM, buildExistingExportsPortalQuery as aN, slugify as aa, shareItemToGroups as ab, uploadResourcesFromUrl as ac, propifyString as ad, createId as ae, normalizeSolutionTemplateItem as af, replaceItemId as ag, getItemAssets as ah, addSolutionResourceUrlToAssets as ai, interpolate as aj, getSiteById as ak, buildDraft as al, objectToJsonBlob as am, SITE_SCHEMA_VERSION as an, _ensureTelemetry as ao, _getDomainServiceUrl as ap, _unprotectAndRemoveGroup as aq, _unprotectAndRemoveItem as ar, getDomainsForSite as as, removeDomain as at, addDomain as au, _getHttpAndHttpsUris as av, unique as aw, isGuid as ax, interpolateItemId as ay, removeEmptyProps as az, getHubApiUrl as b, cloneObject$1 as c, datasetToContent as d, getPortalApiUrl as e, fetchSite as f, getProp as g, hubApiSearch as h, itemToContent as i, categories as j, getCategory as k, addDays as l, mergeContentFilter as m, getTypes as n, chunkArray as o, getTypeCategories as p, getLayerIdFromUrl as q, isNil as r, setContentSiteUrls as s, isFeatureService as t, includes as u, isMapOrFeatureServerUrl as v, getItemHomeUrl as w, getItemApiUrl as x, getItemDataUrl as y, getItemThumbnailUrl as z };
