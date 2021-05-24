import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import tripImg from "imgs/trip.jpg";
import { apiRoot, difficulties } from "constants";
import { connect } from "react-redux";
import { getAccessUser, getHikesData } from "redux/hikes/selectors";
import { getRouteNames } from "redux/hikeRoutes/selectors";
import { HikeResult } from "./HikeResult";
import Filter from "components/filter/Filter";

import { getCurrentUser } from "redux/currentUser/selectors";
import { acceptHike } from "redux/hikes/actions";
import OrderHike from "components/orderHike/OrderHike";
import BaseModal from "modules/modal/BaseModal";

import styles from "./hikeResult.module.scss";
import { filterHikes } from "redux/hikes/actions";
import { useHistory } from "react-router";
import { updateHikeName } from "../../redux/hikes/actions";
import { injectIntl } from "react-intl";
import { Paginator } from "modules/pagination/Paginator";
import { setCurrentPage } from "redux/hikes/actions";
const mapStateToProps = state => ({
    hikes: getHikesData(state),
    totalCount: state.hikes.totalCount,
    currentPage: state.hikes.currentPage,
    currentUser: getCurrentUser(state),
    accessUser: getAccessUser(state),
    routeNames: getRouteNames(state)
});

const initialFilters = { data: {}, ids: [] };
let labels = [];
let Hikes = ({
    hikes,
    currentUser,
    accessUser,
    routeNames,
    acceptHike,
    filterHikes,
    updateHikeName,
    intl,
    currentPage,
    pageSize = 6,
    totalCount,
    setCurrentPage
}) => {
    const [openOrderHike, setOpenOrderHike] = useState(false);
    const [hikeId, setHikeId] = useState(null);
    let [filters, setFilters] = useState(initialFilters);
    let history = useHistory();

    useEffect(() => {
        let { formatMessage } = intl;
        let textDateFrom = formatMessage({ id: "app.filters.dateFrom" });
        let textDateTo = formatMessage({ id: "app.filters.dateTo" });
        let textName = formatMessage({ id: "app.hike.filters.name" });
        let textDifficulty = formatMessage({ id: "app.hike.filters.difficulty" });
        let textPlaces = formatMessage({ id: "app.filters.countPlaces" });
        labels = [
            { name: "dateFrom", labelText: textDateFrom, type: "date.interval" },
            { name: "dateTo", labelText: textDateTo, type: "date.interval" },
            { name: "difficulty", labelText: textDifficulty, type: "select", values: difficulties },
            { name: "name", labelText: textName, type: "select", values: routeNames },
            { name: "countBicycle", labelText: textPlaces, type: "text.interval" }
        ];
    }, [routeNames, intl.locale]);

    useEffect(() => {
        filters.ids.length && filterHikes(filters);
    }, [filters]);

    const onClick = id => {
        if (currentUser.verified) {
            setOpenOrderHike(true);
            setHikeId(id);
        }
    };

    const onSubmit = values => {
        acceptHike(values, hikeId);
        setOpenOrderHike(false);
    };

    const openHikeDetails = (hikeDetailName, hikeId) => {
        updateHikeName(hikeDetailName);
        history.push({
            pathname: `/hike/${hikeId}`,
            state: { hikIde: hikeId }
        });
    };

    let tripResults =
        hikes &&
        hikes.map((trip, key) => (
            <HikeResult
                key={key}
                {...trip}
                currentUser={currentUser}
                orderHike={onClick}
                openDetails={openHikeDetails}
            />
        ));
    let filterElems = labels.map((filter, key) => (
        <Filter
            key={key}
            name={filter.name}
            labelText={filter.labelText}
            type={filter.type}
            values={filter.values}
            filters={filters}
            setFilters={setFilters}
        />
    ));
    const OnPageChanged = pageNumber => {
        setCurrentPage(pageNumber);
        filterHikes(filters, pageNumber, pageSize);
    };
    return (
        <div>
            <div className={styles.filter__trips}>{filterElems}</div>
            {openOrderHike && (
                <BaseModal initialOpened={true} accessUser={accessUser} size="xs">
                    <OrderHike hikeId={hikeId} onSubmit={onSubmit} initialValues={currentUser} />
                </BaseModal>
            )}
            <div className={styles.hike__container}>{tripResults}</div>
            <Paginator
                min={true}
                OnPageChanged={OnPageChanged}
                totalCount={totalCount}
                pageSize={pageSize}
                pageCurrent={currentPage}
            />
        </div>
    );
};

Hikes = injectIntl(connect(mapStateToProps, { acceptHike, filterHikes, updateHikeName, setCurrentPage })(Hikes));
export { Hikes };
