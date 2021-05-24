import React from "react";
import { FormConstructor } from "modules/formConstructor";
import { fetcher } from "modules/preLoader/fetcher";
import { FormattedMessage } from "react-intl";
import { stopSubmit } from "redux-form";
import { updateUser } from "redux/currentUser/actions";
// import { getLanguage } from "modules/localizator/selectors";

export const registrationForm = new FormConstructor(
    "register",
    {
        email: { required: true, type: "email" },
        password: { required: true, type: "password" },
        passwordSecond: { required: true, type: "password", sendAs: "password_second" },
        userName: { required: true, type: "userName" }
    },
    validatePasswords
);

/**
 *
 * @param password
 * @param passwordSecond
 * @return {Array}
 */
function validatePasswords(formState) {
    let { password, passwordSecond } = formState.fields;
    if (password.value !== passwordSecond.value) {
        return ["app.account.passwords_mismatch"];
    }
    return null;
}

export const signUp = json => (dispatch, getState) => {
    let { passwordRepeat, ...user } = json;
    if (json.password !== json.passwordRepeat) {
        dispatch(stopSubmit("register", { _error: "Passwords are mismatched" }));
        return;
    }
    dispatch(
        fetcher("auth/registration", {
            method: "POST",
            indication: true,
            json: json,
            onSuccess: result => {
                if (result.message) {
                    dispatch(setFetchStatus(result.message));
                }

                localStorage.setItem("token", result["payload"]["token"]);
                localStorage.setItem("verifyCode", result["payload"]["code"]);
                dispatch(updateUser(result["payload"]["user"]));
            },
            onError: error => {
                if (error) {
                    dispatch(stopSubmit("register", { _error: <FormattedMessage id={error} /> }));
                }
            }
        })
    );
};
