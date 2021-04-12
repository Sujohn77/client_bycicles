import { SET_INITIALIZE } from "./actions";

let initialState = {
    initialized: false
};

export const app = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZE:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};
