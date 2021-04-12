/**
 * Created by kyckyc on 11.02.19.
 */

import { notBool } from '../const';

export const checkBool = (value) => {
    if (typeof value !== 'boolean') {
        return [notBool];
    }
    return [];
};
