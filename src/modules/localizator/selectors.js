/**
 * Created by kyckyc on 12.10.18.
 */
export const getLanguage = (state) => state.application.route.language;
export const getPlatform = (state) => state.application.route.platform;
export const getLocaleUrl = (state, url) => (state.application.route.language === 'en' ? url : `/${state.application.route.language}${url}`);
