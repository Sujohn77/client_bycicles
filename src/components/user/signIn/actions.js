/**
 * Created by kyckyc on 2/10/17.
 */
import { FormConstructor } from "modules/formConstructor";
import { fetcher } from "modules/preLoader/fetcher";
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

export const signIn = json => (dispatch, getState) => {
    dispatch(
        fetcher("/auth/login", {
            method: "POST",
            indication: true,
            json: json,
            onSuccess: result => {
                console.log("[login] user signIn success");
                console.log(result);

                dispatch(updateUser(result["payload"]["user"]));
                localStorage.setItem("token", result["payload"]["token"]);
            },
            onError: errors => {
                console.log("[Registration] Errors");
                console.log(errors);
            }
        })
    );
};
