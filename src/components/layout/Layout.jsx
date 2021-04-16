import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./header/Header";
import styles from "./layout.module.scss";
import { access } from "../../constants";
import { getAccessUser } from "../../redux/trips/selectors";
import { Sidebar } from "../admin/Sidebar";

const Layout = ({ children, accessUser }) => {
    return (
        <div className={styles.container}>
            <Header />
            {accessUser === access.admin && <Sidebar />}
            <div className={styles.trip__container}> {children}</div>
        </div>
    );
};

const mapStateToProps = state => ({
    accessUser: getAccessUser(state)
});

export default connect(mapStateToProps)(Layout);
