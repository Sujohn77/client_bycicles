import { actionTypes } from "redux-form";
import { UPDATE_STATISTICS } from "./actions";

let initialState = {
    genders: [],
    usersVerified: []
};

export const statistics = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATISTICS:
            return {
                ...state,
                genders: action.genders,
                usersVerified: action.usersVerified
            };

        default:
            return state;
    }
};
