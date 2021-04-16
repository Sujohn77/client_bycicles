import { fetcher } from "modules/preLoader/fetcher";
import { setGuideNames } from "../../components/createTrip/actions";
import { updateGuides } from "../guides/actions";
import { getGuidesByNames } from "../guides/selectors";

export const UPDATE_TRIPS = "UPDATE_TRIPS";
export const updateTrips = trips => ({ type: UPDATE_TRIPS, trips });

export const fetchTrips = () => (dispatch, getState) => {
    dispatch(
        fetcher("/", {
            method: "GET",
            credetials: "include",
            onSuccess: data => {
                dispatch(updateTrips(data.payload.trips));
                dispatch(updateGuides(data.payload.guides));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
