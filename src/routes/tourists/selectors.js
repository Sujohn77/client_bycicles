let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua";
export const getTouristsData = state =>
    state.tourists.data &&
    state.tourists.data.map(tourist => {
        return {
            ...tourist,
            hikeName: tourist.hikeName[lang]
        };
    });

export const getTouristsFio = state => state.tourists.fios;
export const getTouristsPhones = state => state.tourists.phones;
export const getTouristsHikeName = state => state.tourists.hikeNames?.map(hikeName => hikeName[lang]);

export const getTouristsPage = state => state.tourists.currentPage;
