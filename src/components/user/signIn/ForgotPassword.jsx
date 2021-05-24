// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { forgotPassword } from "./actions";
import { Col } from "components/layout/grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import BaseModal from "modules/modal/BaseModal";
import { Field, reduxForm } from "redux-form";
import { injectIntl } from "react-intl";
import styles from "./signIn.module.scss";
import { validators } from "../../../constants";

const required = value => (value ? undefined : "Required");
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;

const Form = props => {
    const { handleSubmit, intl } = props;
    P;
    let { formatMessage } = intl;

    let textInputEmail = formatMessage({ id: "app.login.inputEmail" });
    let textEmail = formatMessage({ id: "app.user.email" });
    let textEnter = formatMessage({ id: "app.login.enter" });
    return (
        <form className="modal-sm" onSubmit={handleSubmit}>
            <h3>{textInputEmail}</h3>
            <div className="d-flex flex-column">
                <label htmlFor="email">{textEmail}</label>
                <Field name="email" component="input" type="text" validate={[required, email]} />
            </div>
            <div className={styles.login__buttons}>
                <Button type="submit" value="Submit">
                    {textEnter}
                </Button>
            </div>
        </form>
    );
};

const RestoreForm = reduxForm({
    form: "login"
})(injectIntl(Form));

let ForgotPassword = ({ forgotPassword, setOpen }) => {
    const onSubmit = data => {
        forgotPassword(data);
        setOpen(false);
    };
    return <RestoreForm onSubmit={onSubmit} />;
};

export default connect(null, { forgotPassword })(ForgotPassword);
