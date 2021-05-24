import { fetcher } from "modules/preLoader/fetcher";
import { getLanguage } from "modules/localizator/selectors";
import { access } from "constants";
import { getCurrentUser } from "./selectors";
import { resetFetchStatus, setFetchStatus } from "components/messageStatus/actions";

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";

export const UPDATE_USER = "UPDATE_USER";
export const SET_STATUS = "SET_STATUS";
export const RESET_USER = "RESET_USER";
export const setRegister = ({ data }) => {
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("password", data.password);
    localStorage.setItem("email", data.email);
    return {
        type: SIGN_UP
    };
};

export const signOut = ({ onSuccess }) => (dispatch, getState) => {
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    localStorage.removeItem("token");
    dispatch(resetUser());
};

export const isAuth = json => (dispatch, getState) => {
    let token = localStorage.getItem("token");

    if (token) {
        dispatch(
            fetcher("auth/me", {
                method: "GET",
                headers: {
                    authorization: token
                },
                authorization: token,

                onSuccess: result => {
                    console.log("[login] user signIn success");

                    dispatch(updateUser(result["payload"]["user"]));
                    if (!result["payload"]["user"].verified) {
                        dispatch(
                            setFetchStatus(
                                "Будь-ласка підтвердіть свою пошту, на вашу пошту було надіслано повідомлення"
                            )
                        );
                    } else {
                        dispatch(resetFetchStatus());
                    }
                },
                onError: errors => {
                    console.log("[Registration] Errors");
                    console.log(errors);
                }
            })
        );
    }
};

export const updateUser = data => {
    const accessUser = data.userName === "admin" ? access.admin : access.user;
    return {
        type: UPDATE_USER,
        data,
        accessUser
    };
};

export const resetUser = () => {
    return {
        type: RESET_USER
    };
};

export const verifyUser = () => (dispatch, getState) => {
    let state = getState();
    let currentUser = getCurrentUser(state);
    if (currentUser.email) {
        dispatch(
            fetcher("auth/verify", {
                method: "POST",
                json: { email: currentUser.email },
                onSuccess: result => {
                    console.log("[VERIFY] user was verified");
                    dispatch(setFetchStatus(result.message));
                },
                onError: errors => {
                    console.log("[VERIFY] FAILED");
                    console.log(errors);
                }
            })
        );
    }
};
