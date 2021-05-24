import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "components/layout/header/Header";
import { getAccessUser, getUserEmail } from "redux/hikes/selectors";
import { Hikes } from "components/hike";

import { access } from "constants";
import { withRouter } from "react-router";
import { currentUser } from "redux/currentUser/reducers";
import { verifyUser } from "redux/currentUser/actions";
import { Spinner } from "react-bootstrap";
import { EditHikes } from "routes/editHikes";
import { injectIntl } from "react-intl";

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser.data,
        accessUser: getAccessUser(state),
        email: getUserEmail(state)
    };
};
@injectIntl
@connect(mapStateToProps, { verifyUser })
class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { formatMessage } = this.props.intl;
        document.title = formatMessage({ id: "app.home.title" });
    }

    render() {
        let { accessUser, email } = this.props;

        switch (accessUser) {
            case access.annonymous:
                return <Spinner animation="border" variant="primary" />;
            default:
                return <Hikes />;
        }
    }
}

Home.propTypes = {};

export default Home;
