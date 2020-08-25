import {NAME} from "./constants";

export const cvTypesActionGroup = ({
    FETCH: `${NAME}/TYPE/FETCH`,
    FETCH_FAIL: `${NAME}/TYPE/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/TYPE/FETCH/SUCCESS`,
    fetch: () => ({
        type: `${NAME}/TYPE/FETCH`,
    }),
    fetchFailure: () => ({
        type: `${NAME}/TYPE/FETCH/FAILURE`,
    }),
    fetchSuccess: (data) => ({
        type: `${NAME}/TYPE/FETCH/SUCCESS`,
        payload: data,
    }),
});
