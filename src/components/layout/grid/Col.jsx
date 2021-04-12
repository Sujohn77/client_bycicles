/**
 * Created by kyckyc on 04.10.17.
 */
import React from 'react';
import classNames from 'classnames';

export const Col = ({
    id = null,
    children,
    className = null,
    column = false,
    gutters = true,
    xs = null,
    sm = null,
    md = null,
    lg = null,
    xl = null,
    wrap = false,
    display = 'block',
}) => {
    let _classes = {
        'flex-column': column,
        'no-gutters': !gutters,
        'flex-wrap': wrap,
        col: !xs && !sm && !md && !lg,
        [className]: className != null,
    };

    let wasNoneBlock = false;
    if (xs !== null) {
        if (xs !== 'none') {
            _classes[`col-${xs}`] = true;
        } else {
            _classes['d-none'] = true;
            wasNoneBlock = true;
        }
    }

    Object.entries({
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,
    }).forEach(([size, value]) => {
        if (value !== null) {
            if (value !== 'none') {
                _classes[`col-${size}-${value}`] = true;
                if (wasNoneBlock) {
                    _classes[`d-${size}-${display}`] = true;
                }
            } else {
                _classes[`d-${size}-none`] = true;
                wasNoneBlock = true;
            }
        }
    });
    return (
        <div className={classNames(_classes)} id={id}>
            {children}
        </div>
    );
};
