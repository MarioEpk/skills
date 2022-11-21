import {NAME} from "./constants";

export const createTypeActionGroup = (type) => ({
    FETCH_FAIL: `${NAME}/${type}/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/${type}/FETCH/SUCCESS`,
    fetchFailure: () => ({
        type: `${NAME}/${type}/FETCH/FAILURE`,
    }),
    fetchSuccess: (data) => ({
        type: `${NAME}/${type}/FETCH/SUCCESS`,
        payload: data,
    }),
});
