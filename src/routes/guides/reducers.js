import { actionTypes } from "redux-form";
import { SET_CURRENT_PAGE, UPDATE_GUIDES } from "./actions";

let initialState = {
    currentPage: 1,
    data: [],
    totalCount: 1
};

export const guides = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case UPDATE_GUIDES:
            return {
                ...state,
                data: action.guides,
                totalCount: action.totalCount
            };
        default:
            return state;
    }
};
