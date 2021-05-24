import { Button } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";

import { connect } from "react-redux";
import { useLocation } from "react-router";
import { getHikeDetails } from "redux/hikes/selectors";
import { apiRoot, difficulties } from "../../constants";
import { getHikeDetailDescription, getRouteByName, getRouteDescription } from "../../redux/hikeRoutes/selectors";
import { acceptHike } from "redux/hikes/actions";
import styles from "./hikeDetails.module.scss";
import { getCurrentUser } from "../../redux/currentUser/selectors";
import BaseModal from "../../modules/modal/BaseModal";
import OrderHike from "components/orderHike/OrderHike";
import { getAccessUser, getHikeComments } from "../../redux/hikes/selectors";
import { injectIntl, IntlContext } from "react-intl";
import CreateComment from "./CreateComment";
let HikeDetails = ({ hike, acceptHike, currentUser, accessUser, intl, comments = [], routeByName }) => {
    const location = useLocation();
    const { locale } = useContext(IntlContext);

    const [openOrderHike, setOpenOrderHike] = useState(false);
    const [hikeId, setHikeId] = useState(null);
    const route = routeByName(hike.route);
    const onClick = id => {
        if (currentUser.verified) {
            setOpenOrderHike(true);
            setHikeId(id);
        }
    };
    const onSubmit = (hikeId, currentUser) => {
        acceptHike(currentUser, hikeId);
        setOpenOrderHike(false);
    };

    if (!hike) {
        return <Spinner size="sm" />;
    }

    let commentRows = comments.map(c => (
        <div>
            <div className="d-flex">
                <b>{c.author}</b>
                <span className="ml-3">{c.created}</span>
            </div>
            {c.message}
        </div>
    ));
    let { formatMessage } = intl;
    let textTakeHike = formatMessage({ id: "app.hike.takeHike" });
    let textDetails = formatMessage({ id: "app.hike.details" });
    let textRoute = formatMessage({ id: "app.hike.route" });
    let textDateFrom = formatMessage({ id: "app.hike.dateFrom" });
    let textDateTo = formatMessage({ id: "app.hike.dateTo" });
    let textDifficulty = formatMessage({ id: "app.hike.difficulty" });
    let textPlaces = formatMessage({ id: "app.hike.countPlaces" });
    let textGuide = formatMessage({ id: "app.hike.guide" });
    let textPrice = formatMessage({ id: "app.hike.price" });
    let textTourists = formatMessage({ id: "app.hike.tourists" });
    let textDescription = formatMessage({ id: "app.hike.description" });
    let html = "<b>123</b>";
    return (
        <div className={styles.hike__detail}>
            <div className="d-flex align-items-center justify-content-between">
                <h3>{hike.name}</h3>
                <Button className={styles.accept} onClick={() => onClick(hike._id)}>
                    {textTakeHike}
                </Button>
            </div>
            <div className="d-flex">
                <div className="w-50">
                    <div>
                        <img src={apiRoot + hike.img} />
                    </div>
                </div>
                <div className={styles.info}>
                    <div>
                        <b>{textDateFrom} </b>
                        {hike.dateFrom}
                    </div>
                    <div>
                        <b>{textDateTo} </b>
                        {hike.dateTo}
                    </div>

                    <div>
                        <b>{textPlaces} </b>
                        {hike.countBicycle - hike.tourists.length}
                    </div>
                    <div>
                        <b>{textRoute} </b>
                        {hike.route}
                    </div>
                    <div>
                        <b>{textGuide} </b>
                        {hike.guide}
                    </div>
                    <div>
                        <b>{textDifficulty} </b>
                        {difficulties[hike.difficulty]}
                    </div>
                    <div>
                        <b>{textPrice} </b>
                        {hike.price}
                    </div>
                    <div>
                        <b>{textTourists}</b>
                        {hike.tourists.map(tourist => tourist + " ")}
                    </div>
                </div>
            </div>
            <div>
                {route && (
                    <>
                        <h4 className="text-center mt-3">{textDescription} </h4>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: route.description[locale]
                            }}
                        ></div>
                    </>
                )}
                <CreateComment hikeId={hike._id} />

                <div className={"mt-3"}>{commentRows}</div>
                {openOrderHike && (
                    <BaseModal initialOpened={true} accessUser={accessUser} size="xs">
                        <OrderHike hikeId={hikeId} onSubmit={onSubmit} />
                    </BaseModal>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    hike: getHikeDetails(state),
    description: getHikeDetailDescription(state),
    currentUser: getCurrentUser(state),
    accessUser: getAccessUser(state),
    comments: getHikeComments(state),
    routeByName: getRouteByName(state)
});
HikeDetails = injectIntl(connect(mapStateToProps, { acceptHike })(HikeDetails));
export { HikeDetails };
