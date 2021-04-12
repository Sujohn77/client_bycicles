import { Button, SvgIcon, Table } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./tripResult.module.scss";
import testPng from "imgs/home.png";

import DataGrid from "modules/DataGrid/DataGrid";
import { connect } from "react-redux";
import { testInputFile } from "./actions";
import SampleForm from "components/user/forms/SampleForm";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { columns } from "constants";

let EditTripPage = ({ tripsData, testInputFile }) => {
    // hooks
    let [rows, setRows] = useState([]);
    let [createLine, setCreateLine] = useState(false);

    useEffect(() => {
        let newRows =
            tripsData &&
            tripsData.map((trip, key) => {
                return { id: key + 1, ...trip, elements: ["Додати", "Редагувати"] };
            });
        newRows && setRows(newRows);
    }, [tripsData]);

    // callbacks
    // const onSubmit = values => {
    //     const data = new FormData();
    //     data.append("file", values);
    //     data.append("filename", "photo");
    //     testInputFile(data);
    // };

    const addNewTrip = () => {
        setCreateLine(true);
    };

    return (
        <div className={styles.trip__container}>
            <DataGrid
                createLine={createLine}
                setCreateLine={setCreateLine}
                rows={rows}
                columns={columns}
                rowHeight={60}
                checkboxSelection
            />
            <div className={styles.controls}>
                <div>
                    <div>
                        <AddCircleOutlineIcon color={"primary"} fontSize={"small"} onClick={addNewTrip} />
                    </div>
                    <div>{"<<"}</div>
                    <div>{"<"}</div>
                    <div>{"1"}</div>
                    <div>{">"}</div>
                    <div>{">>"}</div>
                    <div>5</div>
                    <div>Усьго сторінок: 1</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tripsData: state.trips.data
    };
};

EditTripPage = connect(mapStateToProps, { testInputFile })(EditTripPage);

export { EditTripPage };
