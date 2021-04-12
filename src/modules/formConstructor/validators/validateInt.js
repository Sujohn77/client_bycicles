/**
 * Created by kyckyc on 11.02.19.
 */

import { notInt, notNumber } from '../const';

export const checkInt = (value) => {
    if (isNaN(parseInt(value, 10)) || isNaN(+value)) {
        return [notNumber];
    } if (!(value % 1 === 0)) {
        return [notInt];
    }
    return [];
};
