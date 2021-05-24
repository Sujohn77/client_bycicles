import { access } from "constants";
import { RESET_USER, SIGN_IN, SIGN_UP, UPDATE_USER } from "./actions";

let initialState = {
    data: {
        userName: "",
        email: "",
        password: "",
        verified: false
    },
    code: localStorage.getItem("verifyCode") || null,
    access: access.annonymous
};

export const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.data
                },

                access: action.accessUser
            };
        case RESET_USER:
            return {
                ...state,
                data: {},
                access: action.annonymous
            };
        default:
            return state;
    }
};

export let setInitialize = () => ({ type: SIGN_IN });
