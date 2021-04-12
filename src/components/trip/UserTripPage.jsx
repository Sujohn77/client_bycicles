import { Button } from "@material-ui/core";
import React from "react";
import styles from "./tripResult.module.scss";
import testPng from "imgs/home.png";

const UserTripPage = ({ trip }, ...props) => {
    return (
        <div className={styles.trip__container}>
            <div className={styles.header}>
                <h3>{trip.name}</h3>
                <Button>Детальніше</Button>
            </div>
            <div className={styles.content}>
                <div className="w-50">
                    <img alt="Img" src={testPng | trip.photos[0]} />
                </div>
                <div className={styles.description}>
                    <div>{trip.route}</div>
                    <div>{trip.dateFrom}</div>
                    <div>{trip.dateTo}</div>
                    <div>{trip.countBycicles}</div>
                    <div>{trip.difficulty}</div>
                    <div>{trip.guiders}</div>
                    <div>{trip.tourists}</div>
                </div>
            </div>
        </div>
    );
};

export { UserTripPage };
