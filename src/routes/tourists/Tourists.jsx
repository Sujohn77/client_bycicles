import { Button, Input, SvgIcon, Table } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import DataGrid from "modules/DataGrid/DataGrid";
import { connect } from "react-redux";

import styles from "./tourists.module.scss";
import { Paginator } from "modules/pagination/Paginator";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import moment from "moment";

import { fetchTourists, filterTourists, setTouristPage } from "./actions";
import { getTouristsData, getTouristsFio, getTouristsHikeName, getTouristsPage, getTouristsPhones } from "./selectors";
import { FormattedMessage, injectIntl } from "react-intl";
import EditDiscount from "./EditDiscount";

const initialFilters = { data: {}, ids: [] };

let Tourists = ({
    tourists,
    currentPage,
    filterTourists,
    fetchTourists,
    deleteTourist,
    totalCount,
    touristsFio,
    touristsPhone,
    touristsHikeName,
    intl,
    setTouristPage
}) => {
    let [createLine, setCreateLine] = useState(false);
    let [pageSize, setPageSize] = useState(5);
    let [searchColumns, setSearchCols] = useState([]);
    let [filters, setFilters] = useState(initialFilters);
    let [columns, setColumns] = useState([]);
    useEffect(() => {
        let { formatMessage } = intl;
        let textFio = formatMessage({ id: "app.filters.fio" });
        let textPhone = formatMessage({ id: "app.filters.phone" });
        let textHikeName = formatMessage({ id: "app.filters.hikeName" });
        let textGender = formatMessage({ id: "app.filters.gender" });
        let textDateFrom = formatMessage({ id: "app.filters.dateFrom" });
        let textDiscount = formatMessage({ id: "app.filters.discount" });
        document.title = formatMessage({ id: "app.tourists.title" });
        setColumns([
            { field: "fio", headerName: textFio },
            { field: "phone", headerName: textPhone },
            { field: "hikeName", headerName: textHikeName },
            { field: "hikeDateFrom", headerName: textDateFrom },
            { field: "discount", headerName: textDiscount }
        ]);
        fetchTourists();
    }, []);
    useEffect(() => {
        if (touristsFio) {
            setSearchCols([
                { name: "fio", type: "select", values: touristsFio },
                { name: "phone", type: "select", values: touristsPhone },
                { name: "hikeName", type: "select", values: touristsHikeName },
                { name: "hikeDateFrom", type: "date.interval" },
                { name: "discount", type: "text", disabled: true }
            ]);
        }
    }, [touristsFio]);
    useEffect(() => {
        if (filters.ids.length) {
            filterTourists(filters, currentPage, pageSize);
        }
    }, [filters]);

    const renderCell = (data, attr, key, index) => {
        if (!data[attr]) return;

        if (attr.indexOf("Date") !== -1) {
            return <td key={key}>{moment(data[attr]).format("DD.MM.YYYY")}</td>;
        }
        if (attr === "phone") {
            return <td key={key}>{data[attr] && +data[attr]}</td>;
        }
        if (attr === "discount") {
            return (
                <td key={key}>
                    <EditDiscount initialValue={data[attr]} id={data._id} />
                </td>
            );
        }
        if (data[attr]) {
            return <td key={key}>{data[attr]}</td>;
        }
        return <td></td>;
    };

    const OnPageChanged = pageNumber => {
        setTouristPage(pageNumber);
        filterTourists(filters, pageNumber, pageSize);
    };
    let { formatMessage } = intl;
    let textContentTitle = formatMessage({ id: "app.tourists.content.title" });
    return (
        <div className={styles.tourists__container}>
            <h3>{textContentTitle}</h3>
            <DataGrid
                searchColumns={searchColumns}
                renderCell={renderCell}
                createLine={createLine}
                setCreateLine={setCreateLine}
                rows={tourists}
                columns={columns}
                filters={filters}
                setFilters={setFilters}
                deleteItem={deleteTourist}
                pageSize={pageSize}
                currentPage={currentPage}
                type="tourist"
            />
            <div className={styles.controls}>
                <div>
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
        currentPage: getTouristsPage(state),
        tourists: getTouristsData(state),
        totalCount: state.tourists.totalCount,
        touristsFio: getTouristsFio(state),
        touristsPhone: getTouristsPhones(state),
        touristsHikeName: getTouristsHikeName(state)
    };
};

Tourists = injectIntl(connect(mapStateToProps, { fetchTourists, filterTourists, setTouristPage })(Tourists));

export { Tourists };
