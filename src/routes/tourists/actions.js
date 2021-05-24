import { updateHikes } from "redux/hikes/actions";
import { difficulties } from "../../constants";
import fetcher from "../../modules/preloader/fetcher";

export const SET_CURRENT_PAGE = "@tourists/SET_CURRENT_PAGE";
export const UPDATE_ITEMS = "@tourists/UPDATE_ITEMS";
export const SET_FILTER_DATA = "@tourists/SET_FILTER_DATA";
export const setTouristPage = page => ({ type: SET_CURRENT_PAGE, page });
export const updateTourists = (tourists, totalCount) => ({ type: UPDATE_ITEMS, tourists, totalCount });
export const setFilterData = tourists => ({ type: SET_FILTER_DATA, tourists });
export const fetchTourists = () => (dispatch, getState) => {
    dispatch(
        fetcher("tourists", {
            method: "GET",
            credetials: "include",
            onSuccess: data => {
                dispatch(updateTourists(data.payload.tourists, data.payload.totalCount));
                dispatch(setFilterData(data.payload.tourists));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
export const saveDiscount = (hikeId, discount) => (dispatch, getState) => {
    dispatch(
        fetcher("tourists/editDiscount", {
            method: "POST",
            credetials: "include",
            json: { id: hikeId, discount },
            onSuccess: data => {
                dispatch(updateTourists(data.payload.tourists, data.payload.totalCount));
                dispatch(setFilterData(data.payload.tourists));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
export const filterTourists = (filters = {}, currentPage = 1, pageSize = 100) => (dispatch, getState) => {
    let sortedFilters = { ...filters };

    dispatch(
        fetcher("tourists/search", {
            method: "POST",
            credetials: "include",
            json: { filters: sortedFilters, currentPage, pageSize },
            onSuccess: data => {
                dispatch(updateTourists(data.payload.tourists, data.payload.totalCount));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
