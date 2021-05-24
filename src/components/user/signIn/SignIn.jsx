// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
// COMPONENTS

// MIDDLEWARES
import { signIn } from "./actions";
import { Col } from "components/layout/grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import BaseModal from "modules/modal/BaseModal";
import { Field, reduxForm } from "redux-form";
import { injectIntl } from "react-intl";
import styles from "./signIn.module.scss";
import ForgotPassword from "./ForgotPassword";
import { access, validators } from "../../../constants";
import { Input } from "../../layout/input/Input";
import MessageStatus from "components/messageStatus/MessageStatus";
import { required, maxLength, minValue } from "../../../helpers";

const maxLength15 = maxLength(15);
const maxLength25 = maxLength(25);
const minValue6 = minValue(6);

const SignIn = ({ accessUser, signIn, open, setOpen, logInfo }) => {
    const [forgotPassword, setForgotPassword] = useState(false);
    useEffect(() => {
        if (accessUser >= access.user) {
            setOpen(false);
        }
    }, [accessUser]);
    const onClick = () => setOpenModal(true);
    const onSubmit = data => {
        signIn(data);
    };
    return (
        <BaseModal initialOpened={open}>
            {!forgotPassword && (
                <SignInForm onSubmit={onSubmit} setForgotPassword={setForgotPassword} logInfo={logInfo} />
            )}
            {forgotPassword && <ForgotPassword setOpen={setOpen} />}
        </BaseModal>
    );
};

const Form = props => {
    const { handleSubmit, pristine, reset, submitting, intl, setForgotPassword, logInfo, error } = props;
    let { formatMessage } = intl;

    let textUserNameEmail = formatMessage({ id: "app.user.usernameOrEmail" });
    let textPassword = formatMessage({ id: "app.user.password" });
    let textCancel = formatMessage({ id: "app.buttons.cancel" });
    let textLogin = formatMessage({ id: "app.login.content.title" });
    let textForgotLink = formatMessage({ id: "app.login.forgot.link" });

    return (
        <form className="modal-sm" onSubmit={handleSubmit}>
            <h3>{textLogin}</h3>
            <div className="d-flex flex-column">
                <label htmlFor="emailOrUserName">{textUserNameEmail}</label>
                <Field name="emailOrUserName" component={Input} type="text" validate={[required, maxLength25]} />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="lastName">{textPassword}</label>
                <Field
                    name="password"
                    component={Input}
                    type="password"
                    validate={[required, minValue6, maxLength15]}
                />
            </div>
            {error && <span className={styles.error}>{error}</span>}
            <div className={styles.login__buttons}>
                <Button type="submit" value="Submit" disabled={submitting}>
                    {textLogin}
                </Button>
                <Button type="submit" value="Submit">
                    {textCancel}
                </Button>
            </div>
            <div className={styles.link} onClick={() => setForgotPassword(true)}>
                {textForgotLink}
            </div>
        </form>
    );
};

const mapStateToProps = state => ({
    logInfo: state.status.data
});

const mapDispatchToProps = {};

const SignInForm = reduxForm({
    form: "login"
})(injectIntl(Form));

export default connect(mapStateToProps, { signIn })(SignIn);
