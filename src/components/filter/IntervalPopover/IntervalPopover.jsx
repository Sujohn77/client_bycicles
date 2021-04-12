import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./popover.module.scss";
import { Input } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "modules/DatePicker/Datepicker";

const checkValues = (first, sec) => {
    if (first) return first;
    if (sec) return sec;
    return false;
};

const IntervalPopover = ({ onClose, setFilterValue, toValue, fromValue, setValueFrom, setValueTo }) => {
    const ref = useRef(null);
    const [firstRender, setFirstRender] = useState(false);
    const onChange = ({ from, to }) => {
        const fromVal = checkValues(fromValue, from);
        const toVal = checkValues(toValue, to);
        if (fromVal && toVal) {
            setFilterValue(fromVal + "-" + toVal);
        } else if (fromVal) {
            setFilterValue(fromVal);
        } else {
            setFilterValue(toVal);
        }
    };

    const onChangeFrom = value => {
        setValueFrom(value);
        onChange({ from: value, to: toValue });
    };

    const onChangeTo = value => {
        setValueTo(value);
        onChange({ from: fromValue, to: value });
    };

    useEffect(() => {
        document.addEventListener("click", e => {
            if (firstRender && !ref.current.contains(e.target)) {
                onClose();
            } else {
                setFirstRender(true);
            }
        });
    }, [firstRender]);

    return (
        <div ref={ref} className={styles.tooltip} role="">
            <div>
                <p>От</p>
                <div>
                    <Datepicker label="От" value={fromValue} onDateChanged={onChangeFrom} />
                </div>
                <p>До</p>
                <div>
                    <Datepicker label="До" value={toValue} onDateChanged={onChangeTo} />
                </div>
            </div>
            <div className={styles.arrow}></div>
        </div>
    );
};

IntervalPopover.propTypes = {
    onClose: PropTypes.func
};

export default IntervalPopover;
