import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import styles from "./guides.module.scss";

import { FormattedMessage, injectIntl } from "react-intl";

import HighChart from "./HighChart";
import { getGendersPercentage, getUsersPercentage } from "./selectors";
import { fetchStatistics } from "./actions";
let Statistics = ({ intl, gendersPecentage, usersPecentage, fetchStatistics }) => {
    let { formatMessage } = intl;
    useEffect(() => {
        fetchStatistics();
    }, []);
    let textContentTitle = formatMessage({ id: "app.statistics.content.title" });
    let textGenders = formatMessage({ id: "app.statistics.chart.gender" });
    let textVerifiedUsers = formatMessage({ id: "app.statistics.chart.verifiedUsers" });
    let textMale = formatMessage({ id: "app.statistics.gender.male" });
    let textFemale = formatMessage({ id: "app.statistics.gender.female" });
    let textVerified = formatMessage({ id: "app.statistics.user.verified" });
    let textUnVerified = formatMessage({ id: "app.statistics.user.unverified" });
    let genders = [
        { name: textMale, value: (100 * gendersPecentage[0]) / (gendersPecentage[0] + gendersPecentage[1]) },
        { name: textFemale, value: (100 * gendersPecentage[1]) / (gendersPecentage[0] + gendersPecentage[1]) }
    ];
    let verified = [
        { name: textVerified, value: (100 * usersPecentage[0]) / (usersPecentage[0] + usersPecentage[1]) },
        { name: textUnVerified, value: (100 * usersPecentage[1]) / (usersPecentage[0] + usersPecentage[1]) }
    ];

    return (
        <div className={styles.guides__container}>
            <h3>{textContentTitle}</h3>

            <div className="d-flex">
                <HighChart title={textGenders} id="genders-chart" data={genders} />
                <HighChart title={textVerifiedUsers} id="users-chart" data={verified} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        gendersPecentage: getGendersPercentage(state),
        usersPecentage: getUsersPercentage(state)
    };
};

Statistics = connect(mapStateToProps, { fetchStatistics })(injectIntl(Statistics));

export { Statistics };
