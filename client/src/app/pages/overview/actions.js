import {NAME} from "./constants";

export const cvActionGroup = ({
    FETCH: `${NAME}/CV/FETCH`,
    FETCH_FAIL: `${NAME}/CV/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/CV/FETCH/SUCCESS`,
    REMOVE: `${NAME}/CV/REMOVE`,
    SHARE_CV: `${NAME}/CV/SHARE`,
    COPY_PUBLIC_URL: `${NAME}/COPY_PUBLIC_URL`,
    fetch: () => ({
        type: `${NAME}/CV/FETCH`,
    }),
    fetchFailure: () => ({
        type: `${NAME}/CV/FETCH/FAILURE`,
    }),
    fetchSuccess: (data) => ({
        type: `${NAME}/CV/FETCH/SUCCESS`,
        payload: data,
    }),
    remove: (id) => ({
        type: `${NAME}/CV/REMOVE`,
        payload: id,
    }),
    shareCv: (cvId) => ({
        type: `${NAME}/CV/SHARE`,
        payload: {
            cvId,
        },
    }),
    copyPublicUrl: (extCode) => ({
        type: `${NAME}/COPY_PUBLIC_URL`,
        payload: {
            externalCode: extCode,
        },
    }),
});
