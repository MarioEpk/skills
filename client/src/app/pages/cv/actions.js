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

export const cvActionGroup = ({
    FETCH: `${NAME}/FETCH`,
    FETCH_FAIL: `${NAME}/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/FETCH/SUCCESS`,
    EXPORT: `${NAME}/EXPORT`,
    EXPORT_TO_DOC: `${NAME}/EXPORT_TO_DOC`,
    COPY_URL: `${NAME}/COPY_URL`,
    fetch: () => ({
        type: `${NAME}/FETCH`,
    }),
    fetchFailure: () => ({
        type: `${NAME}/FETCH/FAILURE`,
    }),
    fetchSuccess: (data) => ({
        type: `${NAME}/FETCH/SUCCESS`,
        payload: data,
    }),
    export: () => ({
        type: `${NAME}/EXPORT`,
    }),
    exportToDoc: () => ({
        type: `${NAME}/EXPORT_TO_DOC`,
    }),
    copyUrl: () => ({
        type: `${NAME}/COPY_URL`,
    }),
});
