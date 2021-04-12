import { FETCH_STATUS } from "./actions";

export const fetchStatus = (state = "IDLE", action) => {
    switch (action.type) {
        case FETCH_STATUS:
            return action.status;
        default:
            return state;
    }
};
