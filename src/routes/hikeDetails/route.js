import { fetchHikes } from "redux/hikes/actions";
import { HikeDetails } from "./HikeDetails";

export const hikeDetailRoute = {
    path: "/hike/:id",

    component: HikeDetails
};
