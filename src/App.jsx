import { Button, Container } from "@material-ui/core";
import React, { Component } from "react";
import { Route, Switch } from "react-router";

import { Col } from "components/layout/grid";

import "./scss/global.scss";

import { Filter } from "./components/filter";
import { TripResult, EditTripPage } from "./components/trip";
import { connect } from "react-redux";
import { isAuth } from "redux/currentUser/actions";
import { fetchTrips } from "redux/trips/actions";
import { access } from "./constants";
import { getAccessUser, getTripsData, getUserEmail } from "./redux/trips/selectors";
import Home from "./components/home/Home";
import Profile from "./components/user/profile/Profile";
import Layout from "./components/layout/Layout";

class App extends Component {
    componentDidMount() {
        this.props.fetchTrips();
        this.props.isAuth();
    }
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route path="/profile" render={() => <Profile />} />
                </Switch>
            </Layout>
        );
    }
}

export default connect(null, { fetchTrips, isAuth })(App);
