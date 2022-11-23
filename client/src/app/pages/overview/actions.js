import {NAME} from "./constants";

export const overviewActionGroup = ({
    FETCH: `${NAME}/CV/FETCH`,
    FETCH_FAIL: `${NAME}/CV/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/CV/FETCH/SUCCESS`,
    REMOVE: `${NAME}/CV/REMOVE`,
    SHARE_CV: `${NAME}/CV/SHARE`,
    COPY_PUBLIC_URL: `${NAME}/COPY_PUBLIC_URL`,
    FETCH_CERTIFICATES_FOR_ALL_USERS: `${NAME}/FETCH_CERTIFICATES_FOR_ALL_USERS`,
    FETCH_EDUCATIONS_FOR_ALL_USERS: `${NAME}/FETCH_EDUCATIONS_FOR_ALL_USERS`,
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
    fetchCertificatesForAllUsers: () => ({
        type: `${NAME}/FETCH_CERTIFICATES_FOR_ALL_USERS`,
    }),
    fetchEducationsForAllUsers: () => ({
        type: `${NAME}/FETCH_EDUCATIONS_FOR_ALL_USERS`,
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
    copyPublicUrl: (cvId, shareEnabled, extCode) => ({
        type: `${NAME}/COPY_PUBLIC_URL`,
        payload: {
            externalCode: extCode,
            shareEnabled,
            cvId,
        },
    }),
});
