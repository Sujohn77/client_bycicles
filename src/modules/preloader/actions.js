export const FETCH_STATUS = "UPDATE_FETCH_STATUS";

export const setFetchStatus = (status = "idle") => dispatch => {
    dispatch({
        type: FETCH_STATUS,
        status
    });
};
