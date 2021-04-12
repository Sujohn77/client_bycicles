import React from "react";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";
import { Button } from "@material-ui/core";
import styles from "./forms.module.scss";
import { registrationForm } from "../register/actions";

// @registrationForm.connect
class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h3>Регістрація</h3>
                <div className={styles.register__description}>
                    Після реєстрації ви зможете брати участь у походах, мати знижку та писать коментарі
                </div>
                <form className="modal-sm" onSubmit={handleSubmit} className={styles.register__form}>
                    <div className="d-flex flex-column">
                        <label htmlFor="userName">Ім'я користувача</label>
                        <Field placeholder={"Введіть своє ім'я"} name="userName" component="input" type="text" />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="email">Пошта</label>
                        <Field placeholder={"Введіть пошту"} name="email" component="input" type="password" />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="password">Пароль</label>
                        <Field placeholder={"Введить пароль "} name="password" component="input" type="password" />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="passwordAgain">Підтвердження паролю</label>
                        <Field
                            placeholder={"Введить пароль повторно"}
                            name="passwordAgain"
                            component="input"
                            type="password"
                        />
                    </div>
                    <div className={styles.register__buttons}>
                        <Button type="submit" value="Submit">
                            Зареєструватися
                        </Button>
                        <Button type="submit" value="Submit">
                            Закрити
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
