import { updateHikes } from "redux/hikes/actions";
import { difficulties } from "../../constants";
import fetcher from "../../modules/preloader/fetcher";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const UPDATE_EDIT_HIKES = "UPDATE_EDIT_HIKES";

export const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page });
export const updateEditHikes = hikes => ({ type: UPDATE_EDIT_HIKES, hikes });
