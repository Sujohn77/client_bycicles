import { combineReducers } from "redux";

import { app } from "redux/app/reducers";
import { currentUser } from "redux/currentUser/reducers";
import { fetchStatus } from "modules/preLoader/reducers";
import { registrationForm } from "components/user/register/actions";
import { reducer as formReducer } from "redux-form";
import { trips } from "redux/trips/reducers";

// const forms = combineReducers({
//     [registrationForm.formName]: registrationForm.reducers
// });

export const reducers = combineReducers({
    app,
    currentUser,
    fetchStatus,
    trips,
    form: formReducer
});
