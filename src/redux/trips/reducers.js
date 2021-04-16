import { UPDATE_TRIPS } from "./actions";

let initialState = {
    data: false
};

export const trips = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRIPS:
            return {
                ...state,
                data: action.trips
            };

        default:
            return state;
    }
};
