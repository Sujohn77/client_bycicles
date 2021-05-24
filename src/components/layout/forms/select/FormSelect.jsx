import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

/** <select>

 * @augments {React.Component<Props, State>}
 * @param {boolean=false} big - should be bigger, to match height of ItemSelector
 * @return {React.Component}
 */
export const FormSelect = ({
    id,
    onBlur = null,
    onChange = null,
    readOnly = false,
    children,
    className,
    value,
    disabled = false,
    big = false
}) => {
    let opts = {};
    if (onChange !== null) {
        opts["onChange"] = onChange;
    }
    if (onBlur !== null) {
        opts["onBlur"] = onBlur;
    }
    if (readOnly) {
        opts["readOnly"] = "readOnly";
    }

    return (
        <select
            id={id}
            value={value}
            className={classNames({ [className]: !!className })}
            disabled={disabled}
            {...opts}
        >
            {children}
        </select>
    );
};

FormSelect.propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string
};
