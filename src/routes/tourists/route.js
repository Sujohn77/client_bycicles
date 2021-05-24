import { Tourists } from "./Tourists";
import { access } from "../../constants";
export const touristsRoute = {
    path: "/tourists",
    component: Tourists,
    access: access.admin
};
