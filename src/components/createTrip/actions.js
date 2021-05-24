import fetcher from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";
import { updateHikes } from "redux/hikes/actions";
import { difficulties } from "../../constants";
import { getHikeRoutesData } from "../../redux/hikeRoutes/selectors";
import { getHikes } from "../../redux/hikes/selectors";

export const UPDATE_CREATE_TRIP_DATA = "UPDATE_CREATE_TRIP_DATA";
export const SET_DATA_COLLECTIONS = "SET_DATA_COLLECTIONS";

export const editTrip = trip => ({ type: UPDATE_CREATE_TRIP_DATA, trip });

export const saveTrip = hikeToSave => (dispatch, getState) => {
    let hikes = getHikes(getState());
    let routes = getHikeRoutesData(getState());
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";

    // FALSE - Edit hike, TRUE - Create hike
    if (!hikeToSave.id) {
        hikeToSave.name = { ru: hikeToSave.name, ua: hikeToSave.name };
    } else {
        hikes.forEach(hike => {
            if (hike._id === hikeToSave.id) {
                hike.name[lang] = hikeToSave.name;
                hikeToSave.name = hike.name;
            }
        });
    }

    routes.forEach(route => {
        if (route.name[lang] === hikeToSave.route) {
            hikeToSave.route = route.name;
            hikeToSave.difficulty = route.difficulty;
        }
    });

    dispatch(
        fetcher("hike/save", {
            method: "POST",
            json: hikeToSave,
            onSuccess: data => {
                dispatch(updateHikes(data.payload.hikes, data.payload.totalCount, data.payload.currentPage));
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};

export const deleteTrip = params => (dispatch, getState) => {
    dispatch(
        fetcher("hike/delete/:id", {
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
