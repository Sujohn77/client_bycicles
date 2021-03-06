import fetcher from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";
import { updateHikes } from "redux/hikes/actions";

export const UPDATE_CREATE_TRIP_DATA = "UPDATE_CREATE_TRIP_DATA";
export const SET_DATA_COLLECTIONS = "SET_DATA_COLLECTIONS";

export const editTrip = trip => ({ type: UPDATE_CREATE_TRIP_DATA, trip });

export const saveTrip = json => (dispatch, getState) => {
    dispatch(
        fetcher("/hike/save", {
            method: "POST",
            json: json,
            onSuccess: result => {
                dispatch(updateHikes(result));
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};

export const deleteTrip = params => (dispatch, getState) => {
    dispatch(
        fetcher("/hike/delete/:id", {
            method: "DELETE",
            params: params,
            onSuccess: result => {
                dispatch(updateHikes(result));
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};
