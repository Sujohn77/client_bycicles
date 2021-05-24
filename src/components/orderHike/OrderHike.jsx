// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// COMPONENTS
import { genders } from "constants";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { getCurrentUser } from "redux/currentUser/selectors";
import { Input, Select } from "components/layout/input/Input";
import { Field, reduxForm } from "redux-form";
import { injectIntl } from "react-intl";
const mapStateToProps = state => ({
    currentUser: getCurrentUser(state)
});

const mapDispatchToProps = {};

let OrderHike = ({ handleSubmit, initialValues, change, intl }) => {
    let { formatMessage } = intl;
    let textOrderHike = formatMessage({ id: "app.hikeOrder.content.title" });
    let textName = formatMessage({ id: "app.profile.name" });
    let textSurname = formatMessage({ id: "app.profile.surname" });
    let textPhone = formatMessage({ id: "app.profile.phone" });
    let textGender = formatMessage({ id: "app.profile.gender" });
    let textTakeHike = formatMessage({ id: "app.hike.takeHike" });

    return (
        <form onSubmit={handleSubmit}>
            <h3>{textOrderHike}</h3>
            <div className="d-flex flex-column">
                <div>{textName} </div>
                <Field name="name" component={Input} type="text" />
            </div>
            <div className="d-flex flex-column">
                <div>{textSurname} </div>
                <Field name="surname" component={Input} type="text" />
            </div>
            <div className="d-flex flex-column">
                <div>{textPhone}</div>
                <Field name="phone" component={Input} type="text" />
            </div>
            <div className="d-flex flex-column">
                <div>{textGender}</div>
                <Field component={Select} opts={genders} type="text" name="gender" />
            </div>
            <Button type="button" type="submit">
                {textTakeHike}
            </Button>
        </form>
    );
};

export default OrderHike = reduxForm({
    form: "orderHike",
    enableReinitialize: true
})(injectIntl(OrderHike));
