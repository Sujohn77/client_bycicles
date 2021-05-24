import { Input, Select, MenuItem, FormHelperText } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./filter.module.scss";
import PropTypes from "prop-types";
import { IntervalPopover } from "./IntervalPopover";
import Datepicker from "modules/DatePicker/Datepicker";
const Filter = ({ labelText, name, type, values = [], className = "", setFilters, filters, disabled = false }) => {
    const [showPopover, setShowPopover] = useState(false); // show block for setting interval;
    const [filterValue, setFilterValue] = useState("");
    const [fromValue, setValueFrom] = useState("");
    const [toValue, setValueTo] = useState("");

    const reset = () => {
        setValueFrom(null);
        setValueTo(null);
        setFilterValue(null);
    };

    useEffect(() => {
        let updatedFilters = {};
        if (filterValue === "") {
            let { [name]: emit, ...updatedFiltersData } = filters.data;
            updatedFilters = {
                ...updatedFilters,
                data: updatedFiltersData,
                ids: filters.ids
            };
        } else if (type.indexOf("interval") !== -1) {
            updatedFilters = {
                ...filters,
                data: {
                    ...filters.data,
                    [name]: {
                        type: "interval",
                        from: fromValue,
                        to: toValue
                    }
                },
                ids: [...new Set([...filters.ids, name])]
            };
        } else {
            updatedFilters = {
                ...filters,
                data: {
                    ...filters.data,
                    [name]: {
                        value: filterValue
                    }
                },
                ids: [...new Set([...filters.ids, name])]
            };
        }

        setFilters(updatedFilters);
    }, [filterValue]);

    const options = values.map((value, key) => (
        <MenuItem key={key} classes={{ root: styles.root }} value={value}>
            {value}
        </MenuItem>
    ));

    const filterBlock = type => {
        type = type.split(".");

        switch (type[type.length - 1]) {
            case "text":
                return (
                    <Input
                        disabled={disabled}
                        type={type[type.length - 1]}
                        className={`w-100`}
                        value={filterValue}
                        onChange={e => setFilterValue(e.target.value)}
                    />
                );
            case "select":
                return (
                    <Select
                        value={filterValue}
                        type={type[type.length - 1]}
                        className={`w-100`}
                        onChange={e => setFilterValue(e.target.value)}
                    >
                        {options}
                    </Select>
                );
            case "interval":
                return (
                    <div>
                        <div className={styles.input} onClick={() => setShowPopover(true)}>
                            {filterValue}
                            <span onClick={reset}>Х</span>
                        </div>
                        {showPopover && (
                            <IntervalPopover
                                type={type[type.length - 2]}
                                fromValue={fromValue}
                                toValue={toValue}
                                setValueFrom={setValueFrom}
                                setValueTo={setValueTo}
                                setFilterValue={setFilterValue}
                                onClose={() => {
                                    setShowPopover(false);
                                }}
                            />
                        )}
                    </div>
                );
            case "date":
                return <Datepicker value={filterValue} onDateChanged={setFilterValue} />;
            default:
                return <div>Wrong filter type</div>;
        }
    };

    return (
        <div className={styles.filter__container}>
            {labelText && <p>{labelText}</p>}
            {filterBlock(type)}
        </div>
    );
};

Filter.propTypes = {
    labelText: PropTypes.string
};

export default Filter;
