import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./buttons.module.scss";
import classNames from "classnames";

export const SelectButton = ({ options, label }) => {
    debugger;
    const [activeClass, setActiveClass] = useState(false);
    return (
        <div className={classNames({ [styles.showSelect]: activeClass }, styles.select__button)}>
            <div onClick={() => options.length > 0 && setActiveClass(true)}>{label}</div>
            {options && (
                <select>
                    {options.map(opt => (
                        <option value={opt}>{opt}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

SelectButton.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SelectButton);
