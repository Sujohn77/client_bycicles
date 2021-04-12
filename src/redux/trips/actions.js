import { fetcher } from "modules/preLoader/fetcher";

export const UPDATE_TRIPS = "UPDATE_TRIPS";
export const updateTrips = trips => ({ type: UPDATE_TRIPS, trips });

export const fetchTrips = () => (dispatch, getState) => {
    dispatch(
        fetcher("/", {
            method: "GET",
            credetials: "include",
            onSuccess: result => {
                dispatch(updateTrips(result));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
