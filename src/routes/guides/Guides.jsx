import { Button, SvgIcon, Table } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import testPng from "imgs/home.png";
import moment from "moment";
import DataGrid from "modules/DataGrid/DataGrid";
import { connect } from "react-redux";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import styles from "./guides.module.scss";
import { Paginator } from "modules/pagination/Paginator";
import { calculateAge } from "../../helpers/calendar";
import { genders, propGenders } from "../../constants";
import { filterGuides, fetchGuides, setGuidePage } from "./actions";
import { deleteGuide, editGuide } from "components/createGuide/actions";
import { FormattedMessage, injectIntl } from "react-intl";

const initialFilters = { data: {}, ids: [] };

let Guides = ({
    guides,
    currentPage,
    filterGuides,
    guidesLength,
    setGuidePage,
    editGuide,
    deleteGuide,
    fetchGuides,
    totalCount,
    intl
}) => {
    // hooks
    let [rows, setRows] = useState([]);
    let [createLine, setCreateLine] = useState(false);
    let [pageSize, setPageSize] = useState(5);

    let [filters, setFilters] = useState(initialFilters);
    let [searchColumns, setSearchCols] = useState([]);
    let [columns, setColumns] = useState([]);
    useEffect(() => {
        let { formatMessage } = intl;
        document.title = formatMessage({ id: "app.guides.title" });
        fetchGuides();
    }, []);
    useEffect(() => {
        let { formatMessage } = intl;
        let textFio = formatMessage({ id: "app.filters.fio" });
        let textPhone = formatMessage({ id: "app.filters.phone" });
        let textQualification = formatMessage({ id: "app.filters.qualification" });
        let textGender = formatMessage({ id: "app.filters.gender" });
        let textAge = formatMessage({ id: "app.filters.age" });
        let textActions = formatMessage({ id: "app.filters.actions" });
        setColumns([
            { field: "fio", headerName: textFio },
            { field: "phone", headerName: textPhone },
            { field: "qualification", headerName: textQualification },
            { field: "gender", headerName: textGender },
            {
                field: "birthday",
                headerName: textAge,
                type: "number"
            },
            { field: "actions", headerName: textActions, elem: "button" }
        ]);
        setSearchCols([
            { name: "fio", type: "text" },
            { name: "phone", type: "text" },
            { name: "qualification", type: "text" },
            { name: "gender", type: "select", values: genders },
            { name: "birthday", type: "date.interval" }
        ]);
    }, []);
    useEffect(() => {
        const rows = guides && guides.map(guide => ({ ...guide, elements: ["Додати", "Редагувати"] }));
        rows && setRows(rows);
    }, [guides]);

    useEffect(() => {
        if (filters.ids.length) {
            filterGuides(filters, currentPage, pageSize);
        }
    }, [filters]);

    const addNewTrip = () => {
        setCreateLine(true);
    };

    const renderCell = (data, attr, key, index) => {
        if (attr === "birthday") {
            let age = calculateAge(new Date(data[attr]));
            return <td key={key}>{age}</td>;
        }
        if (attr === "gender") {
            return <td key={key}>{propGenders[data[attr]]}</td>;
        }
        if (attr === "phone") {
            return <td key={key}>+{data[attr]}</td>;
        }

        if (data[attr]) {
            return <td key={key}>{data[attr]}</td>;
        }
        return <td></td>;
    };

    const OnPageChanged = pageNumber => {
        setGuidePage(pageNumber);
        filterGuides(filters, pageNumber, pageSize);
    };
    let { formatMessage } = intl;
    let textContentTitle = formatMessage({ id: "app.guides.content.title" });
    return (
        <div className={styles.guides__container}>
            <h3>{textContentTitle}</h3>

            <DataGrid
                searchColumns={searchColumns}
                renderCell={renderCell}
                createLine={createLine}
                setCreateLine={setCreateLine}
                rows={rows}
                columns={columns}
                filters={filters}
                setFilters={setFilters}
                editItem={editGuide}
                deleteItem={deleteGuide}
                pageSize={pageSize}
                currentPage={currentPage}
                type="guide"
            />
            <div className={styles.controls}>
                <div>
                    <div className={styles.create__button}>
                        <AddCircleOutlineIcon fontSize={"small"} onClick={addNewTrip} />
                    </div>
                    <Paginator
                        OnPageChanged={OnPageChanged}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        pageCurrent={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentPage: state.guides.currentPage,
        guides: state.guides.data,
        totalCount: state.guides.totalCount
    };
};

Guides = injectIntl(
    connect(mapStateToProps, { filterGuides, deleteGuide, editGuide, fetchGuides, setGuidePage })(Guides)
);

export { Guides };
