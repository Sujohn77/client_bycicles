import { fetcher } from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";
import { updateTrips } from "redux/trips/actions";

export const saveTrip = json => (dispatch, getState) => {
    dispatch(
        fetcher("/trip/save", {
            method: "POST",
            json: json,
            onSuccess: result => {
                dispatch(updateTrips(result));
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};

export const deleteTrip = params => (dispatch, getState) => {
    dispatch(
        fetcher("/trip/delete/:id", {
            method: "DELETE",
            params: params,
            onSuccess: result => {
                dispatch(updateTrips(result));
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};
