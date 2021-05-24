import { Button } from "@material-ui/core";
import React from "react";
import styles from "./hikeResult.module.scss";
import tripImg from "imgs/trip.jpg";
import { apiRoot } from "constants";
import { difficulties } from "../../constants";
import { injectIntl } from "react-intl";

let HikeResult = ({
    _id,
    route,
    name,
    dateFrom,
    dateTo,
    countBicycle,
    difficulty,
    guide,
    // tourists,
    img,
    price,
    orderHike,
    openDetails,
    currentUser,
    intl
}) => {
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
    return (
        <div className={styles.trip__result}>
            <div className={styles.header}>
                <h4>{name}</h4>
                <div className={styles.buttons}>
                    <Button onClick={() => openDetails(route, _id)}>{textDetails}</Button>
                    <Button className={styles.accept} onClick={() => orderHike(_id, currentUser)}>
                        {textTakeHike}
                    </Button>
                </div>
            </div>
            <div className={styles.content}>
                <div className="w-50">
                    <img alt="Img" src={apiRoot + img} />
                </div>
                <div className={styles.description}>
                    <div>
                        <b>{textRoute}</b> {route}
                    </div>
                    <div>
                        <b>{textDateFrom}</b> {dateFrom}
                    </div>
                    <div>
                        <b>{textDateTo}</b> {dateTo}
                    </div>
                    <div>
                        <b>{textPlaces}</b> {countBicycle}
                    </div>
                    <div>
                        <b>{textDifficulty}</b> {difficulties[difficulty]}
                    </div>
                    <div>
                        <b>{textGuide} </b>
                        {guide}
                    </div>
                    <div>
                        <b>{textPrice}</b> {price}
                    </div>
                </div>
            </div>
        </div>
    );
};
HikeResult = injectIntl(HikeResult);
export { HikeResult };
