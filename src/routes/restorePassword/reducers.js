import { UPDATE_PROFILE, UPDATE_RESTORE_CODE } from "./actions";

let initialState = {};

export const restorePass = (state = { code: localStorage.getItem("restoreCode") }, action) => {
    switch (action.type) {
        case UPDATE_RESTORE_CODE:
            return {
                ...state,
                code: action.code
            };

        default:
            return state;
    }
};
