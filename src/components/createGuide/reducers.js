import { UPDATE_CREATE_GUIDE_DATA } from "./actions";

let lastdate = new Date();
lastdate.setDate(lastdate.getDate() + 7);
lastdate.toLocaleDateString("en-US") + 7;

let initialState = {
    data: {
        fio: "",
        phone: "",
        qualification: "",
        gender: "Чол",
        birthday: ""
    }
};

export const createGuide = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CREATE_GUIDE_DATA: {
            return {
                ...state,
                data: action.guide
            };
        }

        default:
            return state;
    }
};
