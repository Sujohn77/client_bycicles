import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./buttons.module.scss";
import classNames from "classnames";

export const SelectButton = ({ options, label }) => {
    const nodeRef = useRef(null);

    const [activeClass, setActiveClass] = useState(false);

    useEffect(() => {
        const hideSelect = e => {
            if (!nodeRef.current.contains(e.target)) {
                setActiveClass(false);
            }
        };
        document.addEventListener("click", hideSelect);
        return () => {
            document.removeEventListener("click", hideSelect);
        };
    }, []);
    return (
        <div ref={nodeRef} className={classNames({ [styles.showSelect]: activeClass }, styles.select__button)}>
            <div onClick={() => options.length > 0 && setActiveClass(true)}>{label}</div>
            {options && (
                <select>
                    {options.map((opt, key) => (
                        <option key={key} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

SelectButton.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SelectButton);
