import { fetchHikes } from "redux/hikes/actions";
import { Guides } from "./Guides";
import { access } from "../../constants";
export const guideRoute = {
    path: "/guides",
    component: Guides,
    access: access.admin
};
