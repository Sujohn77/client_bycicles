/**
 * Created by kyckyc on 06.10.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 *
 * @param className
 * @param children
 * @param id
 * @param style
 * @param compact
 * @return {*}
 * @constructor
 */
export const Row = ({ className = null, children, id, style, compact = false }) => {
    let classes = classNames({
        row: true,
        compact: compact,
        [className]: className != null,
    });
    return (
        <div className={classes} id={id} style={style}>
            {children}
        </div>
    );
};

Row.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.object,
    compact: PropTypes.bool,
};
