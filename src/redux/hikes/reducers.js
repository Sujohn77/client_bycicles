import { debug } from "webpack";
import { UPDATE_HIKES, SET_CURRENT_HIKE_NAME, UPDATE_HIKE_COMMENTS, SET_CURRENT_PAGE } from "./actions";

let initialState = {
    data: [],
    hikeDetailName: null,
    currentPage: 1
};

export const hikes = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_HIKES:
            return {
                ...state,
                data: action.hikes,
                totalCount: action.totalCount,
                currentPage: action.currentPage
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case SET_CURRENT_HIKE_NAME:
            return {
                ...state,
                hikeDetailName: action.hikeDetailName
            };
        case UPDATE_HIKE_COMMENTS:
            return {
                ...state,
                data: state.data
                    .filter(hike => hike._id === action.hikeId)
                    .map(hike => {
                        if (hike.comments) {
                            hike.comments.push(action.comment);
                        } else {
                            hike.comments = [...action.comment];
                        }
                        return hike;
                    })
            };
        default:
            return state;
    }
};
