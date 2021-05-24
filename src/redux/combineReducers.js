import { combineReducers } from "redux";

import { app } from "redux/app/reducers";
import { currentUser } from "redux/currentUser/reducers";

import { registrationForm } from "components/user/register/actions";
import { reducer as formReducer } from "redux-form";
import { hikes } from "redux/hikes/reducers";
import { guides } from "routes/guides/reducers";
import { createTrip } from "components/createTrip/reducers";
import { createGuide } from "components/createGuide/reducers";
import { status } from "components/messageStatus/reducers";
import { profile } from "routes/profile/reducers";
import { hikeRoutes } from "redux/hikeRoutes/reducers";
import { editHikes } from "routes/editHikes/reducers";
import { tourists } from "routes/tourists/reducers";
import { statistics } from "routes/statistics/reducers";
import { restorePass } from "routes/restorePassword/reducers";
import { language } from "modules/localizator/reducers";
export const reducers = combineReducers({
    app,
    currentUser,
    guides,
    hikes,
    form: formReducer,
    createTrip,
    guides,
    profile,
    status,
    hikeRoutes,
    editHikes,
    guides,
    createGuide,
    tourists,
    language,
    statistics,
    restorePass
});
