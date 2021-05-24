/**
 * Created by kyckyc on 2/10/17.
 */
import { FormConstructor } from "modules/formConstructor";
import fetcher from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";
import { getCurrentUser } from "../../redux/currentUser/selectors";
import { setFetchStatus } from "components/messageStatus/actions";
// import { getLanguage } from "modules/localizator/selectors";
export const UPDATE_RESTORE_CODE = "UPDATE_RESTORE_CODE";
export const updateRestoreCode = code => ({ type: "UPDATE_RESTORE_CODE", code });
export const restorePassword = data => (dispatch, getState) => {
    let currentUser = getCurrentUser(getState());
    if (currentUser.email) {
        dispatch(
            fetcher("auth/restore", {
                method: "POST",
                indication: true,
                json: { password: data.password, email: currentUser.email },
                onSuccess: result => {
                    if (result.message) {
                        dispatch(setFetchStatus(result.message));
                    }
                    if (result["payload"]["token"] === undefined) debugger;
                    localStorage.setItem("token", result["payload"]["token"]);
                    // localStorage.removeItem("restoreCode");
                    dispatch(updateUser(result["payload"]["user"]));
                },
                onError: errors => {
                    console.log("[Registration] Errors");
                    console.log(errors);
                }
            })
        );
    }
};

export const signInWithEmail = () => (dispatch, getState) => {
    let email = localStorage.getItem("email");
    if (email) {
        dispatch(
            fetcher("auth/loginEmail", {
                method: "POST",

                json: { email },
                onSuccess: result => {
                    localStorage.setItem("token", result["payload"]["token"]);
                    localStorage.removeItem("email");

                    dispatch(updateUser(result["payload"]["user"]));
                },
                onError: errors => {
                    console.log("[SignInEmail] Errors");
                    console.log(errors);
                }
            })
        );
    }
};
