/**
 * Created by kyckyc on 12.02.19.
 */

import { filedRequired } from '../const';

/**
 * Check field correctly filled.
 * @param value
 * @returns {array} of errors or empty array;
 */
export const checkRequirement = (value, type) => {
    if (value === undefined || (type !== 'string' && /^\s*$/.test(value))) {
        return [filedRequired];
    }
    return [];
};
