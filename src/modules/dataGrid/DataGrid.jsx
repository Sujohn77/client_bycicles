import React, { Component } from "react";

import { placeHolders } from "constants";
import { Input } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import СreateTrip from "components/createTrip/СreateTrip";

import styles from "./dataGrid.module.scss";
import { deleteTrip, editTrip } from "../../components/createTrip/actions";
import { connect } from "react-redux";
import { SelectButton } from "../../components/layout/buttons/SelectButton";

@connect(null, { editTrip, deleteTrip })
class DataGrid extends Component {
    renderCell(data, attr, key, index) {
        if (attr === "id") {
            return <td key={key}>{index + 1}</td>;
        }
        if (attr === "img" && data[attr]) {
            return (
                <td className={styles.photo__cell} key={key}>
                    <img src={data[attr]} alt="" />
                </td>
            );
        }
        if (attr === "tourists" && data[attr]) {
            return (
                <td className={styles.photo__cell} key={key}>
                    <SelectButton options={data[attr]} label="Туристи" />
                </td>
            );
        }
        if ((data[attr] && data[attr].length !== 0) || data[attr] === 0) {
            return <td key={key}>{data[attr]}</td>;
        }
        return <td key={key}>-</td>;
    }

    edit(trip) {
        this.props.setCreateLine(true);
        this.props.editTrip(trip);
    }

    render() {
        let { columns, rows, createLine, deleteTrip, setCreateLine } = this.props;
        let attrArray = [];

        columns = columns.map((col, key) => {
            attrArray.push(col.field);
            return <th key={key}>{col.headerName}</th>;
        });

        rows = rows.map((trip, key1) => {
            return (
                <tr key={trip.id}>
                    {attrArray.map((attr, key2) => {
                        if (attr === "actions") {
                            return (
                                <td key={trip.id + key2} className={styles.actions}>
                                    <div className={styles.success}>
                                        <EditIcon onClick={() => this.edit(trip)} />
                                    </div>
                                    <div className={styles.danger} onClick={() => deleteTrip({ id: trip.id })}>
                                        <DeleteIcon />
                                    </div>
                                </td>
                            );
                        }

                        return this.renderCell(trip, attr, trip.id + key2, key1);
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
