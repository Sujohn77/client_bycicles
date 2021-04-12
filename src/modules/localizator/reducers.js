/**
 * Created by kyckyc on 12.10.18.
 */
import { platforms } from 'constants';
import { combineReducers } from 'redux';

const language = (state = document.documentElement.lang, action) => {
    switch (action.type) {
        case 'LANGUAGE_UPDATE':
            return action.language;
        default:
            return state;
    }
};

const platform = (state = platforms.indexOf(window.location.host.split('.')[0]) > -1 ? window.location.host.split('.')[0] : 'pc', action) => {
    switch (action.type) {
        case 'PLATFORM_UPDATE':
            return action.platform;
        default:
            return state;
    }
};

export const route = combineReducers({
    language,
    platform,
});
