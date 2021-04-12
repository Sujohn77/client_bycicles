import { Button, Container } from "@material-ui/core";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Header from "components/header/Header";
import { Col } from "components/layout/grid";

import styles from "./App.module.scss";
import "./scss/global.scss";
import { Filter } from "./components/filter";
import { UserTripPage, EditTripPage } from "./components/trip";
import { connect } from "react-redux";
import { fetchTrips } from "redux/trips/actions";
import { access } from "./constants";
class App extends Component {
    componentDidMount() {
        this.props.fetchTrips();
    }
    render() {
        let { tripsData, accessUser } = this.props;

        let trips = tripsData && tripsData.map((trip, key) => <UserTripPage key={key} {...trip} />);

        let labels = [
            { labelText: "Дата начала", type: "text" },
            { labelText: "Дата конца", type: "text" },
            { labelText: "Сложность маршрута", type: "text" },
            { labelText: "Название маршрута", type: "text" },
            {
                labelText: "Количество человек",
                type: "select",
                values: [`1`, `2`, `3`]
            }
        ];
        let filters = labels.map((filter, key) => (
            <Filter key={key} labelText={filter.labelText} type={filter.type} values={filter.values} />
        ));
        return (
            <>
                <Header />
                {/* {accessUser == access.user && (
                    <div>
                        <div className={styles.container}><div className={styles.filter__trips}>{filters}</div></div>
                        {trips}
                    </div>
                )} */}
                {/* {accessUser == access.admin && ( */}
                <div>
                    <div className={styles.edit_container}>
                        <h3>Редагування походів</h3>
                        <EditTripPage />
                    </div>
                </div>
                {/* )} */}
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        tripsData: state.trips.data,
        accessUser: state.currentUser.access
    };
};

export default connect(mapStateToProps, { fetchTrips })(App);
