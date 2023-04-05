import {NAME} from "./constants";

export const cvActionGroup = ({
    FETCH: `${NAME}/FETCH`,
    FETCH_FAIL: `${NAME}/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/FETCH/SUCCESS`,
    EXPORT: `${NAME}/EXPORT`,
    EXPORT_TO_DOC: `${NAME}/EXPORT_TO_DOC`,
    COPY_URL: `${NAME}/COPY_URL`,
    COPY_PUBLIC_URL: `${NAME}/COPY_PUBLIC_URL`,
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
    copyPublicUrl: () => ({
        type: `${NAME}/COPY_PUBLIC_URL`,
    }),
});
