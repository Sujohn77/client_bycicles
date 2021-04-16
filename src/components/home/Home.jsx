import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../layout/header/Header";
import { getAccessUser, getTripsData, getUserEmail } from "../../redux/trips/selectors";
import { EditTripPage, TripResult } from "../trip";
import Filter from "../filter/Filter";
import styles from "./home.module.scss";
import { access } from "../../constants";

const mapStateToProps = state => {
    return {
        tripsData: getTripsData(state),
        accessUser: getAccessUser(state),
        email: getUserEmail(state)
    };
};

@connect(mapStateToProps)
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { tripsData, accessUser, email } = this.props;

        let trips = tripsData && tripsData.map((trip, key) => <TripResult key={key} {...trip} />);

        let labels = [
            { labelText: "Дата начала", type: "text" },
            { labelText: "Дата конца", type: "text" },
            { labelText: "Сложность маршрута", type: "text" },
            { labelText: "Название маршрута", type: "text" },
            {
                labelText: "Количество человек",
                type: "select",
                values: [1, 2, 3]
            }
        ];
        let filters = labels.map((filter, key) => (
            <Filter key={key} labelText={filter.labelText} type={filter.type} values={filter.values} />
        ));
        return (
            <>
                {accessUser != access.admin && (
                    <>
                        <div className={styles.filter__trips}>{filters}</div>
                        {trips}
                    </>
                )}
                {accessUser == access.admin && <EditTripPage />}
            </>
        );
    }
}

Home.propTypes = {};

export default Home;
