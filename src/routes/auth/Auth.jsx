import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { verifyUser } from "redux/currentUser/actions";
import { withRouter } from "react-router";
import { getCurrentUser } from "../../redux/currentUser/selectors";

const mapStateToProps = state => ({ currentUser: getCurrentUser(state), realCode: state.currentUser.code });

@connect(mapStateToProps, { verifyUser })
class Auth extends React.Component {
    componentDidUpdate() {
        if (!this.props.realCode) {
            this.props.history.push("/");
        }
        let code = this.getQueryStringParams(this.props.location.search).code;
        if (!this.props.currentUser.verified && code && code === this.props.realCode && this.props.currentUser.email) {
            this.props.verifyUser();
            this.props.history.push("/");
        }
    }

    render() {
        return <div />;
    }
}

export default withRouter(Auth);
