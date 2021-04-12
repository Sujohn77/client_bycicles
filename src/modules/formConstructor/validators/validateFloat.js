/**
 * Created by kyckyc on 11.02.19.
 */

import { notNumber } from '../const';

export const checkFloat = (value) => {
    if (isNaN(parseInt(value, 10)) || isNaN(+value)) {
        return [notNumber];
    }
    return [];
};
