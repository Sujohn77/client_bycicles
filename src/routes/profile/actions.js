import fetcher from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";

export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const updateProfile = data => (dispatch, getState) => {
    dispatch(
        fetcher("profile/update", {
            method: "POST",
            json: { data },
            credetials: "include",
            onSuccess: data => {
                dispatch(updateUser(data.payload.profile));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
