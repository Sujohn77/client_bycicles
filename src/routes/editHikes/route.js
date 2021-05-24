import { access } from "../../constants";
import { EditHikes } from "./EditHikes";

export const editHikesRoute = {
    path: "/editHikes",
    component: EditHikes,
    access: access.admin
};
