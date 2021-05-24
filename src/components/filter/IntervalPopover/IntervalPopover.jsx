import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./popover.module.scss";

import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "modules/DatePicker/Datepicker";
import { Input } from "@material-ui/core";

const checkValues = (first, sec) => {
    if (first) return first;
    if (sec) return sec;
    return false;
};

const IntervalPopover = ({ onClose, setFilterValue, toValue, fromValue, setValueFrom, setValueTo, type }) => {
    const ref = useRef(null);
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        const fromVal = fromValue;
        const toVal = toValue;
        if (fromVal && toVal) {
            setFilterValue(fromVal + "-" + toVal);
        } else if (fromVal) {
            setFilterValue(fromVal);
        } else {
            setFilterValue(toVal);
        }
    }, [toValue, fromValue]);

    const onChangeFrom = value => {
        if (type === "text") {
            value = value.currentTarget.value;
        }
        setValueFrom(value);
    };

    const onChangeTo = value => {
        if (type === "text") {
            value = value.currentTarget.value;
        }
        setValueTo(value);
    };

    const onClick = e => {
        if (firstRender && !ref.current.contains(e.target) && !e.target.className.includes("sc")) {
            onClose();
        } else {
            setFirstRender(true);
        }
    };

    useEffect(() => {
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);
        };
    }, [firstRender]);

    return (
        <div ref={ref} className={styles.tooltip} role="">
            <div>
                <p>От</p>
                <div>
                    {type === "text" && <Input label="От" value={fromValue} onChange={onChangeFrom} />}
                    {type === "date" && <Datepicker label="От" value={fromValue} onDateChanged={onChangeFrom} />}
                </div>
            </div>
            <div>
                <p>До</p>
                <div>
                    {type === "text" && <Input label="До" value={toValue} onChange={onChangeTo} />}
                    {type === "date" && <Datepicker label="До" value={toValue} onDateChanged={onChangeTo} />}
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
