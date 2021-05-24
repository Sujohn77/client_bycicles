import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./header/Header";
import styles from "./layout.module.scss";
import { access } from "constants";
import { getAccessUser } from "redux/hikes/selectors";
import { Sidebar } from "../sidebar/Sidebar";
import MessageStatus from "components/messageStatus/MessageStatus";

const Layout = ({ children, accessUser, logInfo }) => {
    return (
        <div className={styles.container}>
            <Header />
            {accessUser === access.admin && <Sidebar />}
            <div className={styles.trip__container}>
                {logInfo.message !== "" && <MessageStatus {...logInfo} />} {children}
            </div>
            <div className="d-flex align-items-center flex-column">
                <div>Телефон : 0984958433</div>
                <div>Email: bycicles-hike@mail.ua©</div> <div> 26.04.2025 - Велоспорт</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    accessUser: getAccessUser(state),
    logInfo: state.status.data
});

export default connect(mapStateToProps)(Layout);
