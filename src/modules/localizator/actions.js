/**
 * Created by kyckyc on 12.10.18.
 */

export const LANGUAGE_UPDATE = 'LANGUAGE_UPDATE';
export const PLATFORM_UPDATE = 'PLATFORM_UPDATE';

export const setLanguage = (language) => {
    return {
        type: LANGUAGE_UPDATE,
        language,
    };
};

export const setPlatform = (platform) => {
    return {
        type: PLATFORM_UPDATE,
        platform,
    };
};
