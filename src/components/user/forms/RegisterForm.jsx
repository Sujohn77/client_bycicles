import React from "react";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";
import { Button } from "@material-ui/core";
import styles from "./forms.module.scss";
import { registrationForm } from "../register/actions";
import { injectIntl } from "react-intl";
import MessageStatus from "components/messageStatus/MessageStatus";
import { connect } from "react-redux";
import { Input } from "../../layout/input/Input";
import { required, maxLength, minValue, email } from "../../../helpers";
const mapStateToProps = state => ({
    logInfo: state.status.data
});

const maxLength15 = maxLength(15);
const maxLength25 = maxLength(25);
const minValue6 = minValue(6);

@connect(mapStateToProps)
@injectIntl
class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, intl, logInfo, submitting = false, error } = this.props;
        let { formatMessage } = intl;
        let textDescription = formatMessage({ id: "app.user.description" });
        let textUserName = formatMessage({ id: "app.user.userName" });
        let textEmail = formatMessage({ id: "app.user.email" });
        let textPassword = formatMessage({ id: "app.user.password" });
        let textPasswordRepeat = formatMessage({ id: "app.user.passwordRepeat" });
        let textRegister = formatMessage({ id: "app.buttons.register" });
        let textCancel = formatMessage({ id: "app.buttons.cancel" });
        let textRegisterTitle = formatMessage({ id: "app.register.content.title" });
        return (
            <div>
                <h3>{textRegisterTitle}</h3>
                <div className={styles.register__description}>{textDescription}</div>
                <form className="modal-sm" onSubmit={handleSubmit} className={styles.register__form}>
                    <div className="d-flex flex-column">
                        <label htmlFor="userName">{textUserName}</label>
                        <Field
                            placeholder={"Введіть своє ім'я"}
                            name="userName"
                            component={Input}
                            type="text"
                            validate={[required, maxLength15]}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="email">{textEmail}</label>
                        <Field
                            placeholder={"Введіть пошту"}
                            name="email"
                            component={Input}
                            type="text"
                            validate={[required, email]}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="password">{textPassword}</label>
                        <Field
                            placeholder={"Введить пароль "}
                            name="password"
                            component={Input}
                            type="password"
                            validate={[required, minValue6]}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="passwordAgain">{textPasswordRepeat}</label>
                        <Field
                            placeholder={"Введить пароль повторно"}
                            name="passwordRepeat"
                            validate={[required, minValue6]}
                            component={Input}
                            type="password"
                        />
                    </div>
                    {error && <span className={styles.error}>{error}</span>}
                    <div className={styles.register__buttons}>
                        <Button type="submit" value="Submit" disabled={submitting}>
                            {textRegister}
                        </Button>
                        <Button type="submit" value="Submit">
                            {textCancel}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export const RegisterForm = reduxForm({
    form: "register"
})(Form);
