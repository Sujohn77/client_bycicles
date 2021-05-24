import { UPDATE_CREATE_TRIP_DATA, SET_DATA_COLLECTIONS, SET_GUIDE_NAMES } from "./actions";
import moment from "moment";

let initialState = {
    data: {
        name: "Назва походу",
        dateFrom: moment(new Date()).format("YYYY-MM-DD"),
        dateTo: moment(new Date()).add(7, "days").format("YYYY-MM-DD"),
        countBicycle: 20,
        price: 0,
        photo: null
    }
};

export const createTrip = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CREATE_TRIP_DATA: {
            return {
                ...state,
                data: action.trip
            };
        }

        default:
            return state;
    }
};
