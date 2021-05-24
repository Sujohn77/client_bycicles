import React, { Component } from "react";

import { placeHolders } from "constants";
import { Input } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import СreateTrip from "components/createTrip/СreateTrip";
import PropTypes from "prop-types";
import styles from "./dataGrid.module.scss";

import { connect } from "react-redux";

import { apiRoot } from "constants";
import SearchRow from "components/searchRow/SearchRow";
import { difficulties } from "../../constants";
import СreateGuide from "../../components/createGuide/СreateGuide";

class DataGrid extends Component {
    edit(item) {
        this.props.setCreateLine(true);
        this.props.editItem(item);
    }

    render() {
        let {
            columns,
            rows,
            createLine,
            deleteItem,
            setCreateLine,
            filters,
            setFilters,
            renderCell,
            searchColumns,
            type,
            pageSize,
            currentPage
        } = this.props;
        let attrArray = [];

        columns = columns.map((col, key) => {
            attrArray.push(col.field);
            return <th key={key}>{col.headerName}</th>;
        });

        rows =
            rows &&
            rows.map((row, rowKey) => {
                return (
                    <tr key={row._id}>
                        {attrArray.map((attr, colKey) => {
                            if (attr === "actions") {
                                return (
                                    <td key={row._id + colKey} className={styles.actions}>
                                        <div className={styles.success}>
                                            <EditIcon onClick={() => this.edit(row)} />
                                        </div>
                                        <div
                                            className={styles.danger}
                                            onClick={() => deleteItem({ id: row._id }, currentPage, pageSize)}
                                        >
                                            <DeleteIcon />
                                        </div>
                                    </td>
                                );
                            }

                            return renderCell(row, attr, row._id + colKey, rowKey);
                        })}
                    </tr>
                );
            });

        return (
            <table className={styles.edit__table}>
                <thead>
                    <tr>{columns}</tr>
                </thead>
                <tbody>
                    {filters && (
                        <SearchRow type={type} filters={filters} setFilters={setFilters} columns={searchColumns} />
                    )}
                    {createLine && type === "hike" && <СreateTrip setCreateLine={setCreateLine} />}
                    {createLine && type === "guide" && (
                        <СreateGuide setCreateLine={setCreateLine} pageSize={pageSize} currentPage={currentPage} />
                    )}
                    {rows}
                </tbody>
            </table>
        );
    }
}

DataGrid.propTypes = {
    renderCell: PropTypes.func
};

export default DataGrid;
