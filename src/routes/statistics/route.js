import { Statistics } from "./Statistics";
import { access } from "../../constants";
export const statisticsRoute = {
    path: "/statistics",
    component: Statistics,
    access: access.admin
};
