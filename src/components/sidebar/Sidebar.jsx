import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import tripImg from "imgs/icons/trips.png";
import usersImg from "imgs/icons/users.png";
import guidesImg from "imgs/icons/guide.png";
import statisticsImg from "imgs/icons/statistics.png";
import routeImg from "imgs/icons/road.png";
import styles from "./sidebar.module.scss";

import classNames from "classnames";
import { useHistory } from "react-router";
export const Sidebar = props => {
    const history = useHistory();
    const parentRef = useRef(null);
    const [activeClass, setActiveClass] = useState("");

    useEffect(() => {
        resetActiveClassName();
        switch (history.location.pathname) {
            case "/editHikes":
                parentRef.current.children[0].className = "active";
                break;
            case "/guides":
                parentRef.current.children[1].className = "active";
                break;
            case "/tourists":
                parentRef.current.children[2].className = "active";
                break;
            case "/routes":
                parentRef.current.children[3].className = "active";
                break;
            case "/statistics":
                parentRef.current.children[4].className = "active";
                break;
        }
    }, []);

    const resetActiveClassName = () => {
        parentRef.current.children.forEach(element => {
            element.className = "";
        });
    };

    const changeRouteTest = (evt, route) => {
        resetActiveClassName();
        evt.currentTarget.className += "active";

        history.push(route);
    };

    return (
        <div ref={parentRef} className={classNames(styles.sidebar, { [activeClass]: true })}>
            <div onClick={e => changeRouteTest(e, "/editHikes")}>
                <img src={tripImg} />
            </div>

            <div onClick={e => changeRouteTest(e, "/guides")}>
                <img src={guidesImg} />
            </div>

            <div onClick={e => changeRouteTest(e, "/tourists")}>
                <img src={usersImg} />
            </div>

            <div onClick={e => changeRouteTest(e, "/routes")}>
                <img src={routeImg} />
            </div>

            <div onClick={e => changeRouteTest(e, "/statistics")}>
                <img src={statisticsImg} />
            </div>
        </div>
    );
};

Sidebar.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Sidebar);
