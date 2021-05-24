import { updateHikes } from "redux/hikes/actions";
import { difficulties } from "../../constants";
import { fetcher } from "../../modules/preloader/fetcher";

export const SET_CURRENT_PAGE = "@guides/SET_CURRENT_PAGE";
export const UPDATE_GUIDES = "@guides/UPDATE_GUIDES";

export const setGuidePage = page => ({ type: SET_CURRENT_PAGE, page });
export const updateGuides = (guides, totalCount) => ({ type: UPDATE_GUIDES, guides, totalCount });

export const filterGuides = (filters = {}, currentPage = 1, pageSize = 100) => (dispatch, getState) => {
    let sortedFilters = { ...filters };

    dispatch(
        fetcher("guides/search", {
            method: "POST",
            credetials: "include",
            json: { filters: sortedFilters, currentPage, pageSize },
            onSuccess: data => {
                dispatch(updateGuides(data.payload.guides, data.payload.totalCount));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};

export const fetchGuides = () => (dispatch, getState) => {
    dispatch(
        fetcher("guides", {
            method: "GET",
            credetials: "include",
            onSuccess: data => {
                dispatch(updateGuides(data.payload.guides, data.payload.totalCount));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
