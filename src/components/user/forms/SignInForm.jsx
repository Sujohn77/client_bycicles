import React from "react";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";
import { Button } from "@material-ui/core";

const Form = props => {
    const { handleSubmit } = props;

    return (
        <form className="modal-sm" onSubmit={handleSubmit}>
            <h3>Вхід</h3>
            <div className="d-flex flex-column">
                <label htmlFor="emailOrUserName">Ім'я користувача або пошта</label>
                <Field name="emailOrUserName" component="input" type="text" />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="lastName">Пароль</label>
                <Field name="password" component="input" type="password" />
            </div>
            <Button type="submit" value="submit">
                Увійти
            </Button>
        </form>
    );
};

export const SignInForm = reduxForm({
    form: "login"
})(Form);
