import React, { Component } from "react";

import { placeHolders } from "constants";
import { Input } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import СreateTrip from "components/createTrip/СreateTrip";

import styles from "./dataGrid.module.scss";
import { deleteTrip } from "../../components/createTrip/actions";
import { connect } from "react-redux";

@connect(null, { deleteTrip })
class DataGrid extends Component {
    renderCell(value, attr, key) {
        if (attr === "id") {
            return <td key={key}>{key + 1}</td>;
        }
        if (attr === "img" && value) {
            return (
                <td className={styles.photo__cell} key={key}>
                    <img src={`http://localhost:3001/${value}`} alt="" />
                </td>
            );
        }
        if (value || value === 0) {
            return <td key={key}>{value}</td>;
        }
        return <td key={key}>"-"</td>;
    }

    render() {
        let { columns, rows, createLine, deleteTrip, setCreateLine } = this.props;
        let attrArray = [];
        columns = columns.map((col, key) => {
            attrArray.push(col.field);
            return <th key={key}>{col.headerName}</th>;
        });

        rows = rows.map((col, key1) => {
            return (
                <tr key={col.id}>
                    {attrArray.map((attr, key2) => {
                        if (attr === "actions") {
                            return (
                                <td key={key2} className={styles.actions}>
                                    <div className={styles.success}>
                                        <EditIcon />
                                    </div>
                                    <div className={styles.danger} onClick={() => deleteTrip({ id: col.id })}>
                                        <DeleteIcon />
                                    </div>
                                </td>
                            );
                        }

                        return this.renderCell(col[attr], attr, key2);
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
                    {createLine && <СreateTrip setCreateLine={setCreateLine} />}
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default DataGrid;
