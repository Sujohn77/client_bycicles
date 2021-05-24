import { UPDATE_ROUTES } from "./actions";

let initialState = {
    data: []
};

export const hikeRoutes = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ROUTES:
            return {
                ...state,
                data: action.routes
            };
        default:
            return state;
    }
};
