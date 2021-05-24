import { routes } from "constants";
import { UPDATE_CREATE_TRIP_DATA, SET_DATA_COLLECTIONS, SET_GUIDE_NAMES } from "./actions";

let lastdate = new Date();
lastdate.setDate(lastdate.getDate() + 7);
lastdate.toLocaleDateString("en-US") + 7;

let initialState = {
    data: {
        name: "Назва походу",
        dateFrom: new Date().toLocaleDateString("en-US"),
        dateTo: lastdate,
        countBicycle: 20,
        difficulty: 3,
        price: 0,
        guide: [],
        route: routes,
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
