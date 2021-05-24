// LIBRARIES
import { ModalContent, ModalWindow } from "components/layout/modal";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
// COMPONENTS

// MIDDLEWARES
import { restorePassword, signInWithEmail } from "./actions";
import { Col } from "components/layout/grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import BaseModal from "modules/modal/BaseModal";
import { Field, reduxForm } from "redux-form";
import { injectIntl } from "react-intl";
import styles from "./restorePass.module.scss";
import { getQueryStringParams } from "../../helpers";
import { setFetchStatus } from "components/messageStatus/actions";
const RestorePassword = ({ restorePassword, code, intl, location, signInWithEmail, setFetchStatus }) => {
    const [open, setOpen] = useState(true);
    const searchCode = getQueryStringParams(location.search).code;
    const textWrongCode = intl.formatMessage({ id: "app.login.wrongCode" });

    const onSubmit = data => {
        restorePassword(data);
        setOpen(false);
    };

    useEffect(() => {
        if (searchCode === code) {
            signInWithEmail();
        } else {
            setFetchStatus(textWrongCode);
        }
    }, []);

    if (searchCode !== code) {
        return null;
    }

    return (
        <BaseModal initialOpened={open}>
            <RestoreForm onSubmit={onSubmit} />
        </BaseModal>
    );
};

const Form = props => {
    const { handleSubmit, intl } = props;
    let { formatMessage } = intl;

    let textPassword = formatMessage({ id: "app.user.password" });
    let textPasswordRepeat = formatMessage({ id: "app.user.passwordRepeat" });
    let textRestoring = formatMessage({ id: "app.login.restore" });
    let textEnter = formatMessage({ id: "app.login.enter" });
    return (
        <form className="modal-sm" onSubmit={handleSubmit}>
            <h3>{textRestoring}</h3>
            <div className="d-flex flex-column">
                <label htmlFor="lastName">{textPassword}</label>
                <Field name="password" component="input" type="password" />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="lastName">{textPasswordRepeat}</label>
                <Field name="password_repeat" component="input" type="password" />
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

const mapStateToProps = state => ({
    code: state.restorePass.code
});

export default connect(mapStateToProps, { restorePassword, signInWithEmail, setFetchStatus })(
    injectIntl(withRouter(RestorePassword))
);
