/**
 * Created by kyckyc on 05.03.19.
 */

/**
 *
 * @param value - Could be Event or Value.
 * @param type - field type [int, float, bool, string]
 * @param fallbackValue
 */
export const castValueToType = (value, type, fallbackValue = null) => {
    // console.debug(`Convert: '${value}' to ${type}`);
    if (!!value && value.target) {
        value = value.target.value;
    }
    if (getType(value) === 'null') {
        return value;
    }
    switch (type) {
        case 'int':
            value = parseInt(value);
            if (isNaN(value)) {
                value = fallbackValue !== null ? fallbackValue : '';
            }
            break;
        case 'float':
            value = parseFloat(value).toFixed(1);
            if (isNaN(value)) {
                value = fallbackValue !== null ? fallbackValue : '';
            }
            break;
        case 'bool':
            if (typeof value !== 'boolean') {
                value = value === 'true';
            }
            break;
        case 'string':
            value = value.replace(/^\s+|\s+$/g, '');
    }
    return value;
};

const TYPES = {
    undefined: 'undefined',
    number: 'number',
    boolean: 'boolean',
    string: 'string',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error',
};

/**
 *
 * @param {*} object
 */
export function getType(o) {
    return TYPES[typeof o] || TYPES[Object.prototype.toString.call(o)] || (o ? 'object' : 'null');
}
