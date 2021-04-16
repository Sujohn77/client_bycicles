import { UPDATE_GUIDES } from "./actions";

let initialState = {
    data: []
};

export const guides = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_GUIDES:
            return {
                ...state,
                data: action.guides
            };

        default:
            return state;
    }
};
