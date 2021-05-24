import { access } from "../../constants";
import { HikeRoutes } from "./HikeRoutes";

export const hikeRoutesRoute = {
    path: "/routes",
    component: HikeRoutes,
    access: access.admin
};
