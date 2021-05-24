import classNames from "classnames";
import React from "react";
import styles from "./input.module.scss";

const FormsControl = ({ meta, children, input, labelText }) => {
    let hasError = meta.error && meta.touched && !meta.active;
    return (
        <div className={styles.input__block}>
            {children}
            <label name={input.name} htmlFor="">
                {labelText}
            </label>
            {hasError && <span className={`${styles.error} error`}>{meta.error}</span>}
        </div>
    );
};

export const Input = props => {
    const { input, meta, child, ...restProps } = props;

    return (
        <FormsControl {...props}>
            <input {...input} {...restProps} />
        </FormsControl>
    );
};

export const Textarea = props => {
    const { input, meta, child, ...restProps } = props;
    return (
        <FormsControl {...props}>
            <textarea {...input} {...restProps} />
        </FormsControl>
    );
};

export const Select = props => {
    const { input, opts, meta, child, ...restProps } = props;
    const { value, ...selectProps } = input;
    let selectedValue = input.value;

    if (Number.isInteger(+input.value) && opts.length > input.value) {
        selectedValue = opts[input.value];
    } else if (typeof input.value !== "string") {
        return <div />;
    }

    return (
        <FormsControl className={styles.formControl} {...props}>
            <select value={selectedValue} {...selectProps}>
                {opts.map((value, key) => (
                    <option key={key} selected={value === selectedValue} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </FormsControl>
    );
};
