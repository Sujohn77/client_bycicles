import { combineReducers } from "redux";

export const language = (state = document.documentElement.lang, action) => {
    switch (action.type) {
        case "LANGUAGE_UPDATE":
            return action.language;
        default:
            return state;
    }
};
