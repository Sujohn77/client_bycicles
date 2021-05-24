import { SET_CURRENT_PAGE, UPDATE_EDIT_HIKES } from "./actions";

let initialState = {
    currentPage: 1,
    hikes: []
};

export const editHikes = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case UPDATE_EDIT_HIKES:
            return {
                ...state,
                hikes: action.hikes
            };
        default:
            return state;
    }
};
