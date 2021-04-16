import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import resumeImg from "imgs/resume.png";
import tripEdit from "imgs/user.png";

import styles from "./sidebar.module.scss";
import classNames from "classnames";
export const Sidebar = props => {
    const [activeClass, setActiveClass] = useState("edit_trips");
    return (
        <div className={classNames(styles.sidebar, { [activeClass]: true })}>
            <div onClick={() => setActiveClass("edit_trips")}>
                <img src={resumeImg} />
            </div>

            <div onClick={() => setActiveClass("edit_guides")}>
                <img src={tripEdit} />
            </div>
        </div>
    );
};

Sidebar.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Sidebar);
