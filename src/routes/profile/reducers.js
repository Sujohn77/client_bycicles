import { UPDATE_PROFILE } from "./actions";

let initialState = {};

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                data: action.profile
            };

        default:
            return state;
    }
};
