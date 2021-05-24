import { connect } from "react-redux";
import { getCurrentUser } from "redux/currentUser/selectors";
import React from "react";
import { Redirect, Route } from "react-router";

import { getCurrentUserAccess } from "../../redux/currentUser/selectors";
import Home from "../../routes/home/Home";
import NotFound from "../../routes/404/NotFound";
const ProtectedRoute = ({ key, path, exact = false, component: Component, access = 0, accessUser, ...rest }) => (
    <Route
        key={key}
        exact={exact}
        path={path}
        render={() =>
            Component && access <= accessUser ? (
                <Component />
            ) : Component ? (
                <Home />
            ) : (
                <Redirect to={{ pathname: "/error/404" }} />
            )
        }
    />
);

const mapStateToProps = state => ({
    accessUser: getCurrentUserAccess(state)
});

export default connect(mapStateToProps)(ProtectedRoute);
