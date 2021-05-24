import { actionTypes } from "redux-form";
import { SET_CURRENT_PAGE, UPDATE_ITEMS, SET_FILTER_DATA } from "./actions";

let initialState = {
    currentPage: 1,
    data: null,
    totalCount: 1
};
let a = [
    { A: 1, B: 2 },
    { A: 1, B: 2 }
];
// ['A','B']
const onlyUnique = (lang = "ua") => (value, index, self) => {
    return self.findIndex(t => t.hikeName[lang] === value.hikeName[lang]) === index;
};

export const tourists = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case UPDATE_ITEMS:
            return {
                ...state,
                data: action.tourists,
                totalCount: action.totalCount
            };
        case SET_FILTER_DATA:
            return {
                ...state,
                fios: action.tourists.map(tourist => tourist.fio),
                phones: action.tourists.map(tourist => tourist.phone),
                hikeNames: action.tourists.filter(onlyUnique("ua")).map(tourist => tourist.hikeName)
            };
        default:
            return state;
    }
};
