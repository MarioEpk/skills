import {NAME} from "./constants";

export const createTypeActionGroup = (type) => ({
    FETCH_FAIL: `${NAME}/${type}/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/${type}/FETCH/SUCCESS`,
    FORCE_DELETE_CONFIRMATION: `${NAME}/${type}/FORCE_DELETE_CONFIRMATION`,
    fetchFailure: () => ({
        type: `${NAME}/${type}/FETCH/FAILURE`,
    }),
    fetchSuccess: (data) => ({
        type: `${NAME}/${type}/FETCH/SUCCESS`,
        payload: data,
    }),
    forceDeleteConfirmation: (idToRemove) => ({
        type: `${NAME}/${type}/FORCE_DELETE_CONFIRMATION`,
        payload: {forceDeleteConfirmationId: idToRemove},
    }),
});
