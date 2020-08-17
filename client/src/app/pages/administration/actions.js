import {NAME} from "./constants";

export const createTypeActionGroup = (type) => ({
    FETCH: `${NAME}/${type}/FETCH`,
    FETCH_FAIL: `${NAME}/${type}/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/${type}/FETCH/SUCCESS`,
    fetch: () => ({
        type: `${NAME}/${type}/FETCH`,
    }),
    fetchFailure: () => ({
        type: `${NAME}/${type}/FETCH/FAILURE`,
    }),
    fetchSuccess: (data) => ({
        type: `${NAME}/${type}/FETCH/SUCCESS`,
        payload: data,
    }),
});
