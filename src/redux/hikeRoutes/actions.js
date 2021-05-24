import fetcher from "../../modules/preloader/fetcher";

export const UPDATE_ROUTES = "UPDATE_ROUTES";

export const updateRoutes = routes => ({
    type: UPDATE_ROUTES,
    routes
});

export const fetchHikeRoutes = () => (dispatch, getState) => {
    dispatch(
        fetcher("routes", {
            method: "GET",
            credetials: "include",
            onSuccess: data => {
                dispatch(updateRoutes(data.payload.routes));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
