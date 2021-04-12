import { access } from "../../constants";
import { SIGN_IN, SIGN_UP, UPDATE_USER } from "./actions";

let initialState = {
    userInfo: {
        userName: "",
        email: "",
        password: ""
    },
    access: access.annonymous
};

export const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                userInfo: action.user_state
            };
        default:
            return state;
    }
};

export let setInitialize = () => ({ type: SIGN_IN });
