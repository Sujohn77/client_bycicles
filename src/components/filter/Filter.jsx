import { Input, Select, MenuItem, FormHelperText } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./filter.module.scss";
import PropTypes from "prop-types";
import { IntervalPopover } from "./IntervalPopover";

const Filter = ({ labelText, type, values = [], className = "" }) => {
    const [showPopover, setShowPopover] = useState(false); // show block for setting interval;
    const [filterValue, setFilterValue] = useState("");
    const [fromValue, setValueFrom] = useState(null);
    const [toValue, setValueTo] = useState(null);

    const reset = () => {
        setValueFrom(null);
        setValueTo(null);
        setFilterValue(null);
    };

    const options = values.map((value, key) => (
        <MenuItem key={key} classes={{ root: styles.root }} value={value}>
            {value}
        </MenuItem>
    ));

    const filterBlock = type => {
        switch (type) {
            case "select":
                return (
                    <Select type={type} className={`w-100`}>
                        {options}
                    </Select>
                );
            case "text":
                return (
                    <div>
                        <div className={styles.input} onClick={() => setShowPopover(true)}>
                            {filterValue}
                            <span onClick={reset}>Х</span>
                        </div>
                        {showPopover && (
                            <IntervalPopover
                                fromValue={fromValue}
                                toValue={toValue}
                                setValueFrom={setValueFrom}
                                setValueTo={setValueTo}
                                setFilterValue={setFilterValue}
                                onClose={() => {
                                    debugger;
                                    setShowPopover(false);
                                }}
                            />
                        )}
                    </div>
                );
            default:
        }
    };

    return (
        <div className={styles.date__container}>
            <p>{labelText}</p>
            {filterBlock(type)}
        </div>
    );
};

Filter.propTypes = {
    labelText: PropTypes.string
};

export default Filter;
