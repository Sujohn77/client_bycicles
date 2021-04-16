import { fetcher } from "modules/preLoader/fetcher";
import { getLanguage } from "modules/localizator/selectors";
import { access } from "../../constants";

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";

export const UPDATE_USER = "UPDATE_USER";
export const SET_STATUS = "SET_STATUS";

export const setRegister = ({ userInfo }) => {
    localStorage.setItem("userName", userInfo.userName);
    localStorage.setItem("password", userInfo.password);
    localStorage.setItem("email", userInfo.email);
    return {
        type: SIGN_UP
    };
};
export const setLogin = () => ({
    type: SIGN_UP
});

export const signOut = ({ onSuccess }) => (dispatch, getState) => {
    let lang = getLanguage(getState());
    dispatch(
        fetcher("/auth/signout", {
            method: "GET",
            indication: true,
            onSuccess: result => {
                console.log("[SignOut] user signOut success");

                // Update current user.
                dispatch(updateUser(result["payload"]["user"]));
                // Resetting active bids.
                dispatch(resetAllBids());
                // Redirect
                onSuccess({ lang });
                // reconnect to WS as anonymous user
                dispatch(doConnect());
            },
            onError: errors => {
                console.log("[signOut] Errors");
                console.log(errors);
            }
        })
    );
};

export const isAuth = json => (dispatch, getState) => {
    let token = localStorage.getItem("token");
    dispatch(
        fetcher("/auth/me", {
            method: "GET",
            headers: {
                authorization: token
            },
            authorization: token,
            params: "what a fuck",
            onSuccess: result => {
                console.log("[login] user signIn success");
                console.log(result);

                dispatch(updateUser(result["payload"]["user"]));
            },
            onError: errors => {
                console.log("[Registration] Errors");
                console.log(errors);
            }
        })
    );
};

export const updateUser = userState => {
    const accessUser = userState.userName === "admin" ? access.admin : access.user;
    return {
        type: UPDATE_USER,
        user_state: userState,
        accessUser
    };
};

export const changeStatus = newStatus => (dispatch, getState) => {
    // Quickly update status without waiting for the server
    dispatch(setStatus(newStatus));
};

/**
 * Used ONLY as callback from webSocket server.
 * @param status
 * @returns {Function}
 */
export const setStatus = status => dispatch => {
    // console.debug(`Setting status and write to the localStorage: ${status}`);
    localSet(SET_STATUS, status);
    dispatch({
        type: SET_STATUS,
        payload: status
    });
};
