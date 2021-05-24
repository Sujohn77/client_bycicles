import { fetchHikes } from "redux/hikes/actions";
import Home from "./Home";

export const homeRoute = {
    path: "/",
    exact: true,
    component: Home,
    action: fetchHikes
};
