import fetcher from "modules/preloader/fetcher";

export const UPDATE_STATISTICS = "@statistics/UPDATE_STATISTICS";
export const updateStatistics = (genders, usersVerified) => ({ type: UPDATE_STATISTICS, genders, usersVerified });
export const fetchStatistics = () => (dispatch, getState) => {
    dispatch(
        fetcher("statistics", {
            method: "GET",
            credetials: "include",
            onSuccess: data => {
                dispatch(updateStatistics(data.payload.genders, data.payload.usersVerified));
            },
            onError: err => {
                console.log(err);
            }
        })
    );
};
