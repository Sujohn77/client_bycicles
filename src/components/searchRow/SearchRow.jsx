import React, { useEffect } from "react";
import { difficulties, guides, placeHolders, routes } from "constants";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

import styles from "./createTrip.module.scss";
import { getGuidesByNames } from "routes/guides/selectors";

import Filter from "../filter/Filter";

const SearchRow = ({ routeNames, filters, setFilters, searchRow, updateHikes, columns, type }) => {
    let filterColumns = columns.map((filter, key) => (
        <td key={key}>
            <Filter
                type={filter.type}
                name={filter.name}
                values={filter.values}
                filters={filters}
                setFilters={setFilters}
            />
        </td>
    ));
    let emptyCells = [];
    let cellLength = 12;
    if (type === "guide" || type === "tourist") {
        cellLength = 5;
    }

    for (let index = filterColumns.length; index < cellLength; index++) {
        emptyCells.push(<td key={index}></td>);
    }
    return (
        <tr>
            {filterColumns}
            {emptyCells.map(cell => cell)}
        </tr>
    );
};

export default SearchRow;
