import { updateProfile } from "./actions";
import Profile from "./Profile";

export const profileRoute = {
    path: "/profile",
    exact: true,
    component: Profile,
    action: updateProfile
};
