import { fetcher } from "modules/preLoader/fetcher";

export const UPDATE_GUIDES = "UPDATE_GUIDES";
export const updateGuides = guides => ({ type: UPDATE_GUIDES, guides });
