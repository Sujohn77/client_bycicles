import { updateHikes } from "redux/hikes/actions";

import fetcher from "modules/preloader/fetcher";
import { updateRoutes } from "../../redux/hikeRoutes/actions";
import { difficulties } from "../../constants";
import { getHikeRoutesData } from "../../redux/hikeRoutes/selectors";

export const SET_CURRENT_PAGE = "@guides/SET_CURRENT_PAGE";
export const UPDATE_GUIDES = "@guides/UPDATE_GUIDES";

export const setGuidePage = page => ({ type: SET_CURRENT_PAGE, page });
export const updateGuides = (guides, totalCount) => ({ type: UPDATE_GUIDES, guides, totalCount });

export const createHikeRoute = (route, id) => (dispatch, getState) => {
    let result = getHikeRoutesData(getState()).find(r => r._id === id);
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    let formattedRoute = {};
    if (result) {
        formattedRoute = {
            id,
            img: route.img,
            difficulty: difficulties.indexOf(route.difficulty),
            description: {
                ...result.description,
                [lang]: route.description
            },
            name: {
                ...result.name,
                [lang]: route.name
            }
        };
    } else {
        formattedRoute = {
            img: route.img,
            difficulty: difficulties.indexOf(route.difficulty),
            description: {
                ru: route.description,
                ua: route.description
            },
            name: {
                ru: route.name,
                ua: route.name
            }
        };
    }

    dispatch(
        fetcher("routes/save", {
            method: "POST",
            credetials: "include",
            json: { data: formattedRoute },
            onSuccess: data => {
                dispatch(updateRoutes(data.payload.routes));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
