import { Button, Container } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";

import { Col } from "components/layout/grid";

import "./scss/global.scss";

import { Filter } from "./components/filter";

import { connect } from "react-redux";
import { isAuth } from "redux/currentUser/actions";
import { fetchHikes } from "redux/hikes/actions";
import { access } from "./constants";
import { getAccessUser, getUserEmail } from "redux/hikes/selectors";
import Home from "./routes/home/Home";
import Profile from "routes/profile/Profile";
import Layout from "./components/layout/Layout";

import { Alert } from "react-bootstrap";

import { homeRoute } from "routes/home/route";
import { profileRoute } from "routes/profile/route";

import "bootstrap/dist/css/bootstrap.min.css";
import { hikeDetailRoute } from "./routes/hikeDetails/route";
import { guideRoute } from "./routes/guides/route";
import { authRoute } from "./routes/auth/route";
import { editHikesRoute } from "./routes/editHikes/route";
import { hikeRoutesRoute } from "./routes/hikeRoutes/route";
import { touristsRoute } from "./routes/tourists/route";
import { statisticsRoute } from "./routes/statistics/route";
import { restorePassRoute } from "./routes/restorePassword/route";
import ProtectedRoute from "modules/protectedRoute/ProtectedRoute";
import { notFoundRoute } from "./routes/404/route";
export const routes = [
    homeRoute,
    profileRoute,
    hikeDetailRoute,
    guideRoute,
    authRoute,
    editHikesRoute,
    hikeRoutesRoute,
    touristsRoute,
    statisticsRoute,
    restorePassRoute,
    notFoundRoute,
    {
        сomponent: () => (
            <Redirect
                to={{
                    pathname: "/error/404"
                }}
            />
        )
    }
];

class App extends Component {
    componentDidMount() {
        this.props.fetchHikes();
        this.props.isAuth();
    }
    render() {
        return (
            <Layout>
                <Switch>
                    {routes.map((route, key) => (
                        <ProtectedRoute key={key} {...route} />
                    ))}
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(connect(null, { fetchHikes, isAuth })(App));
