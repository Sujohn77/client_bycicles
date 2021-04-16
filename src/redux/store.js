import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { reducers } from "./combineReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;
