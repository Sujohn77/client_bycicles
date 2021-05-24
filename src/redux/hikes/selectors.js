export const getHikesData = state => {
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    return (
        state.hikes.data &&
        state.hikes.data.map(hike => {
            return {
                ...hike,
                name: hike.name[lang],
                route: hike.route[lang]
            };
        })
    );
};
export const getHikes = state => state.hikes.data;
export const getAccessUser = state => state.currentUser.access;
export const getHikeNames = state => {
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    return [...new Set(state.hikes.data.map(hike => hike.name[lang]))];
};
export const getHikeDetails = state => {
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    let hike = state.hikes.data.find(
        hike => hike.route["ua"] === state.hikes.hikeDetailName || hike.route["ru"] === state.hikes.hikeDetailName
    );
    return {
        ...hike,
        name: hike.name[lang],
        route: hike.route[lang]
    };
};
export const getUserEmail = state => {
    return state.currentUser.data?.email?.replace(/@gmail.com|@mail.ru/gi, "");
};
export const getHikeComments = state => {
    let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
    let hike = state.hikes.data?.find(
        hike => hike.route["ua"] === state.hikes.hikeDetailName || hike.route["ru"] === state.hikes.hikeDetailName
    );
    return hike.comments;
};

export const getGendersPercentage = state => {
    let maleValue = 0,
        femaleValue = 0;

    state.hikes.data?.forEach(hike => {
        hike.tourists;
    });
};
