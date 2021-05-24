let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";

export const getHikeRoutesData = state => state.hikeRoutes.data;

export const getHikeRoutes = state =>
    state.hikeRoutes.data.map(route => ({ ...route, name: route.name[lang], description: route.description[lang] }));
export const getRouteNames = state => state.hikeRoutes.data.map(route => route.name[lang]);
export const getHikeDetailDescription = state => {
    let descriptions = state.hikeRoutes.data
        .filter(route => route.name[lang] === state.hikes.hikeDetailName)
        .map(route => route.description[lang]);

    return descriptions[0];
};
export const getRouteByName = state => name =>
    state.hikeRoutes.data.find(route => route.name["ua"] === name || route.name["ru"] === name);
