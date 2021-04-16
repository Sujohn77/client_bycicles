export const getTripsData = state => state.trips.data;
export const getAccessUser = state => state.currentUser.access;
export const getUserEmail = state => {
    return state.currentUser.userInfo?.email.replace(/@gmail.com|@mail.ru/gi, "");
};
