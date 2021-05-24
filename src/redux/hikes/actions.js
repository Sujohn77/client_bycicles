import { fetcher } from "modules/preLoader/fetcher";
import { setGuideNames } from "components/createTrip/actions";
import { updateProfile } from "routes/profile/actions";
import { getCurrentUser } from "../currentUser/selectors";
import { updateGuides } from "routes/guides/actions";
import { getGuidesByNames } from "routes/guides/selectors";
import { updateRoutes } from "../hikeRoutes/actions";
import { setFetchStatus } from "components/messageStatus/actions";
import { difficulties } from "../../constants";
import { getHikesData } from "./selectors";
import { getHikeRoutesData } from "../hikeRoutes/selectors";

export const UPDATE_HIKES = "UPDATE_HIKES";
export const SET_CURRENT_HIKE_NAME = "SET_CURRENT_HIKE_NAME";
export const UPDATE_HIKE_COMMENTS = "UPDATE_HIKE_COMMENTS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page });
export const updateHikes = (hikes, totalCount, currentPage = 1) => ({
    type: UPDATE_HIKES,
    hikes,
    totalCount,
    currentPage
});

export const updateHikeName = hikeDetailName => ({ type: SET_CURRENT_HIKE_NAME, hikeDetailName });
export const updateComments = (comment, hikeId) => ({ type: UPDATE_HIKE_COMMENTS, comment, hikeId });
export const fetchHikes = () => (dispatch, getState) => {
    dispatch(
        fetcher("", {
            method: "GET",
            credetials: "include",
            onSuccess: data => {
                dispatch(updateHikes(data.payload.hikes, data.payload.totalCount));
                dispatch(updateRoutes(data.payload.routes));
                dispatch(updateGuides(data.payload.guides));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};

export const acceptHike = (user, tripId) => (dispatch, getState) => {
    let user = getCurrentUser(getState());

    dispatch(
        fetcher("hike/addTourist", {
            method: "POST",
            credetials: "include",
            json: { user, tripId },
            onSuccess: data => {
                dispatch(setFetchStatus(data.message));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};

export const createComment = (message, hikeId) => (dispatch, getState) => {
    let user = getCurrentUser(getState());
    let author = `${user.surname} ${user.name}`;
    let created = new Date(Date.now()).toDateString();
    let comment = { author, created, message };

    dispatch(
        fetcher("hike/addComment", {
            method: "POST",
            credetials: "include",
            json: { comment, id: hikeId },
            onSuccess: data => {
                dispatch(updateComments(comment, hikeId));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};

export const filterHikes = (filters = {}, currentPage = 1, pageSize = 100) => (dispatch, getState) => {
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    let formattedFilters = { ...filters };
    let hikes = getHikesData(getState());
    let routes = getHikeRoutesData(getState());
    if (filters.data.difficulty) {
        formattedFilters = {
            ...filters,
            data: {
                ...filters.data,
                difficulty: {
                    value: difficulties.indexOf(filters.data.difficulty.value)
                }
            }
        };
    }

    if (filters.data.name) {
        let hike = hikes.find(hike => hike.name[lang] === filters.data.name.value);

        formattedFilters = {
            ...formattedFilters,
            data: {
                ...formattedFilters.data,
                name: hike.name
            }
        };
    }

    if (filters.data.route) {
        let route = routes.find(r => r.name[lang] === filters.data.route.value);

        formattedFilters = {
            ...formattedFilters,
            data: {
                ...formattedFilters.data,
                route: route.name
            }
        };
    }

    dispatch(
        fetcher("hike/search", {
            method: "POST",
            credetials: "include",
            json: { filters: formattedFilters, currentPage, pageSize },
            onSuccess: data => {
                dispatch(updateHikes(data.payload.hikes, data.payload.totalCount, currentPage));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
