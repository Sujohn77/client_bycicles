import { SET_STATUS, RESET_STATUS } from "./actions";

let initialState = {
    data: {
        status: "info",
        message: "app.status.unauthorized"
    }
};

export const status = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                data: action.data
            };
        case RESET_STATUS:
            return {
                ...state,
                data: {
                    status: null,
                    message: ""
                }
            };

        default:
            return state;
    }
};
