import React from "react";

import { FormConstructor } from "modules/formConstructor";
import fetcher from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";
import { updateRestoreCode } from "../../../routes/restorePassword/actions";
// import { getLanguage } from "modules/localizator/selectors";
import { setFetchStatus } from "components/messageStatus/actions";
import { stopSubmit } from "redux-form";
import { FormattedMessage } from "react-intl";
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

export const signIn = json => (dispatch, getState) => {
    dispatch(
        fetcher("auth/login", {
            method: "POST",
            indication: true,
            json: json,
            onSuccess: result => {
                localStorage.setItem("token", result["payload"]["token"]);
                dispatch(updateUser(result["payload"]["user"]));
            },
            onError: error => {
                if (error) {
                    dispatch(stopSubmit("login", { _error: <FormattedMessage id={error} /> }));
                }
            }
        })
    );
};

export const forgotPassword = data => (dispatch, getState) => {
    localStorage.setItem("email", data.email);
    dispatch(
        fetcher("auth/forgotPass", {
            method: "POST",
            indication: true,
            json: data,
            onSuccess: data => {
                if (data.message) {
                    dispatch(setFetchStatus(data.message));
                }
                localStorage.setItem("restoreCode", data.payload.code);

                dispatch(updateRestoreCode(data.payload.code));
            },
            onError: errors => {
                console.log("[Registration] Errors");
                console.log(errors);
            }
        })
    );
};
