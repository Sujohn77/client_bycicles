import fetcher from "modules/preLoader/fetcher";
import { updateUser } from "redux/currentUser/actions";
import { updateHikes } from "redux/hikes/actions";
import { setGuidePage, updateGuides } from "../../routes/guides/actions";
import { getGuidePage } from "../../routes/guides/selectors";

export const UPDATE_CREATE_GUIDE_DATA = "UPDATE_CREATE_GUIDE_DATA";

export const editGuide = guide => ({ type: UPDATE_CREATE_GUIDE_DATA, guide });

export const saveGuide = (guide, pageSize, currentPage) => (dispatch, getState) => {
    dispatch(
        fetcher("guides/save", {
            method: "POST",
            json: { data: guide, pageSize, currentPage },
            onSuccess: result => {
                dispatch(updateGuides(result.payload.data, result.payload.totalCount));
                if (currentPage * pageSize < result.payload.totalCount) {
                    dispatch(setGuidePage(currentPage + 1));
                }
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};

export const deleteGuide = (params, currentPage, pageSize) => (dispatch, getState) => {
    dispatch(
        fetcher("guides/delete/:id", {
            method: "DELETE",
            params: params,
            onSuccess: result => {
                dispatch(updateGuides(result.payload.data, result.payload.totalCount));
                if (currentPage * pageSize - pageSize >= result.payload.totalCount && currentPage > 1) {
                    dispatch(setGuidePage(currentPage - 1));
                }
            },
            onError: errors => {
                console.log(errors);
            }
        })
    );
};
