import { apiRoot } from "constants";
import { setFetchStatus } from "components/messageStatus/actions";
const fetcherLogColor = "background: orange; color:black";
/**
 *
 * @param {string} apiEndpoint
 * @param {object} param1
 */
export const fetcher = (
    apiEndpoint,
    {
        method = "GET",
        params = {},
        queryParams = {},
        json = null,
        onSuccess = null,
        onError = null,
        headers = {},
        authorization
        // language = null
    },
    ...others
) => (dispatch, getState) => {
    // Build Api endpoint using params
    for (let key in params) {
        console.log(`%c [Fetcher] Params: ${key} - ${params[key]}`, fetcherLogColor);
        let regs = RegExp(`(:${key})(?=$|\/)`, "gi");
        apiEndpoint = apiEndpoint.replace(regs, params[key]);
    }
    // Clear unused params in url
    apiEndpoint = apiEndpoint.replace(RegExp("(:.*?/|:.*?$)"), "");
    // Check if something left, unnecessary.
    if (apiEndpoint.search(RegExp("(:.*?)(?=$|/)")) !== -1) {
        throw Error(`Api endpoint still has undefined params: ${apiEndpoint}`);
    }

    // let _language = getState().application.route.language;
    // language = language === null ? _language : language;

    if ("include" in queryParams) {
        if (queryParams.include.length > 0) {
            queryParams.include = JSON.stringify(queryParams.include).slice(1, -1).replace(/"/g, "");
        } else {
            delete queryParams.include;
        }
    }
    if (Object.keys(queryParams).length > 0) {
        let encodedParams = Object.keys(queryParams)
            .map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]);
            })
            .join("&");
        apiEndpoint = apiRoot + apiEndpoint + "?" + encodedParams;
    } else {
        apiEndpoint = apiRoot + apiEndpoint;
    }

    // Headers
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: authorization ? authorization : null
        // Language: language
    };

    // Protect by CSRF if needed.
    // if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    //     headers["X-CSRFToken"] = getState().application.csrf;
    // }
    // console.debug(new Headers(headers));

    let fetchOptions = {
        method: method,
        body: json ? JSON.stringify(json) : undefined,
        // mode: "no-cors",
        // credentials: "include",
        headers: new Headers(headers)
    };
    // Router indication
    // if (indication) {
    //     dispatch(setFetchStatus("start"));
    // }
    // Fetchingd

    fetch(apiEndpoint, fetchOptions)
        .then(response => {
            if (response.status !== 200) {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(json => {
            try {
                onSuccess ? onSuccess(json, dispatch) : false;
            } catch (error) {
                console.log(error);
                dispatch(setFetchStatus(error));
            }
        })
        .catch(error => {
            // Handle network\\response errors.
            if ("response" in error) {
                if (error.response.status === 429) {
                    onError({ _form: ["app.form.too_many_requests"] }, error.response.status, dispatch);
                } else {
                    //
                    // INVESTIGATION END
                    //
                    error.response
                        .json()
                        .then(json => (onError ? onError(json["error"], error.response.status, dispatch) : false));
                }
            } else {
                // Unknown Errors, network or backend related.
                console.warn("[Fetcher] Unknown Error, probably network or backend related:", error);

                if (onError) {
                    const regs = /Failed to fetch/i;
                    if (error.message && error.message.match(regs)) {
                        onError("app.network.error");
                    } else {
                        onError(error.hasOwnProperty("stack") ? error.stack : error.message);
                    }
                }
            }
        });
};

export default fetcher;
