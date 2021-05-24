import { Button, SvgIcon, Table } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import DataGrid from "modules/DataGrid/DataGrid";
import { connect } from "react-redux";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { SelectButton } from "components/layout/buttons/SelectButton";
import moment from "moment";
import styles from "./editTrip.module.scss";
import { Paginator } from "modules/pagination/Paginator";
import { setCurrentPage } from "./actions";
import { filterHikes } from "redux/hikes/actions";
import { apiRoot, difficulties, guides } from "../../constants";
import { deleteTrip, editTrip } from "components/createTrip/actions";
import { getRouteNames } from "redux/hikeRoutes/selectors";
import { getHikesData } from "redux/hikes/selectors";
import { FormattedMessage, injectIntl } from "react-intl";
import { getHikeNames } from "../../redux/hikes/selectors";
import { getGuidesByNames } from "../guides/selectors";
let initialFilters = { data: {}, ids: [] };
let searchColumns = [];

let EditHikes = ({
    hikes,
    currentPage,
    filterHikes,
    guides,
    setCurrentPage,
    routeNames,
    deleteTrip,
    editTrip,
    intl,
    hikeNames,
    totalCount
}) => {
    let [rows, setRows] = useState([]);
    let [createLine, setCreateLine] = useState(false);
    let [pageSize, setpageSize] = useState(5);
    let [filters, setFilters] = useState(initialFilters);
    let [columns, setColumns] = useState([]);

    useEffect(() => {
        let { formatMessage } = intl;
        document.title = formatMessage({ id: "app.editHikes.title" });
    }, []);

    useEffect(() => {
        let { formatMessage } = intl;
        let textName = formatMessage({ id: "app.filters.name" });
        let textprice = formatMessage({ id: "app.filters.price" });
        let textDateFrom = formatMessage({ id: "app.filters.dateFrom" });
        let textDateTo = formatMessage({ id: "app.filters.dateTo" });
        let textplaces = formatMessage({ id: "app.filters.countplaces" });
        let textDifficulty = formatMessage({ id: "app.filters.difficulty" });
        let textGuide = formatMessage({ id: "app.filters.guide" });
        let textRoute = formatMessage({ id: "app.filters.route" });
        let textTourists = formatMessage({ id: "app.filters.tourists" });
        let textphoto = formatMessage({ id: "app.filters.photo" });
        let textComments = formatMessage({ id: "app.filters.comments" });
        let textActions = formatMessage({ id: "app.filters.actions" });

        setColumns([
            { field: "name", headerName: textName },
            { field: "price", headerName: textprice },
            { field: "dateFrom", headerName: textDateFrom },
            { field: "dateTo", headerName: textDateTo },
            { field: "countBicycle", headerName: textplaces },
            { field: "difficulty", headerName: textDifficulty },
            { field: "guide", headerName: textGuide, width: 120 },
            { field: "route", headerName: textRoute, width: 110 },
            { field: "tourists", headerName: textTourists, width: 120 },
            { field: "img", headerName: textphoto, width: 90 },
            { field: "comments", headerName: textComments, width: 120 },
            { field: "actions", headerName: textActions, width: 170, elem: "button" }
        ]);

        searchColumns = [
            { name: "name", type: "select", values: hikeNames },
            { name: "price", type: "text.interval" },
            { name: "dateFrom", type: "date.interval" },
            { name: "dateTo", type: "date.interval" },
            { name: "countBicycle", type: "text.interval" },
            { name: "difficulty", type: "select", values: difficulties },
            { name: "guide", type: "select", values: guides },
            { name: "route", type: "select", values: routeNames }
        ];
    }, [routeNames, hikeNames]);

    useEffect(() => {
        filterHikes(filters, currentPage, pageSize);
    }, [filters]);

    const addNewTrip = () => {
        setCreateLine(true);
    };

    const OnPageChanged = pageNumber => {
        setCurrentPage(pageNumber);
        filterHikes(filters, pageNumber, pageSize);
    };

    const renderCell = (data, attr, key, index) => {
        if (!data[attr] && data[attr] !== 0) return;

        if (attr.indexOf("date") !== -1) {
            return <td key={key}>{moment(data[attr]).format("DD.MM.YYYY")}</td>;
        }
        if (attr === "img") {
            return (
                <td className={styles.photo__cell} key={key}>
                    <img src={apiRoot + data[attr]} alt="" />
                </td>
            );
        }

        if (attr === "tourists") {
            return (
                <td key={key}>
                    <SelectButton options={data[attr] || []} label="Туристи" />
                </td>
            );
        }
        if (attr === "comments") {
            return (
                <td key={key}>
                    <SelectButton options={[]} label="Коментарі" />
                </td>
            );
        }
        if (attr === "difficulty") {
            return <td key={key}>{difficulties[data[attr]]}</td>;
        }
        if ((data[attr] && data[attr].length !== 0) || data[attr] === 0) {
            return <td key={key}>{data[attr]}</td>;
        }
        return <td key={key}>-</td>;
    };
    let { formatMessage } = intl;
    let textContentTitle = formatMessage({ id: "app.editHikes.content.title" });
    return (
        <div className={styles.edit_container}>
            <h3>{textContentTitle}</h3>

            <DataGrid
                editItem={editTrip}
                deleteItem={deleteTrip}
                renderCell={renderCell}
                createLine={createLine}
                setCreateLine={setCreateLine}
                rows={hikes}
                columns={columns}
                checkboxSelection
                filters={filters}
                setFilters={setFilters}
                searchColumns={searchColumns}
                type="hike"
            />
            <div className={styles.controls}>
                <div>
                    <div className={styles.create__button}>
                        <AddCircleOutlineIcon color={"primary"} fontSize={"small"} onClick={addNewTrip} />
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

const mapStateToprops = state => {
    return {
        hikes: getHikesData(state),
        currentPage: state.editHikes.currentPage,
        totalCount: state.hikes.totalCount,
        routeNames: getRouteNames(state),
        hikeNames: getHikeNames(state),
        guides: getGuidesByNames(state)
    };
};

EditHikes = injectIntl(connect(mapStateToprops, { setCurrentPage, filterHikes, editTrip, deleteTrip })(EditHikes));

export { EditHikes };
