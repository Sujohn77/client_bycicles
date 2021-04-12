import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { reducers } from "./combineReducers";

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
