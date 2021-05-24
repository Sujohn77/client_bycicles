export const SET_STATUS = "SET_STATUS";
export const RESET_STATUS = "RESET_STATUS";

export const setFetchStatus = (message, status = "info") => ({ type: SET_STATUS, data: { message, status } });
export const resetFetchStatus = () => ({ type: RESET_STATUS });
