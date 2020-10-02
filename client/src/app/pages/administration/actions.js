import {NAME} from "./constants";

export const createTypeActionGroup = (type) => ({
    FETCH: `${NAME}/${type}/FETCH`,
    FETCH_FAIL: `${NAME}/${type}/FETCH/FAILURE`,
    FETCH_SUCCESS: `${NAME}/${type}/FETCH/SUCCESS`,
    FILL: `${NAME}/${type}/FILL`,
    REMOVE: `${NAME}/${type}/REMOVE`,
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
    update: (name) => ({
        type: `${NAME}/${type}/UPDATE`,
        payload: name,
    }),
    remove: (id) => ({
        type: `${NAME}/${type}/REMOVE`,
        payload: id,
    }),
    fill: (id, name, description, technologies, exportName) => ({
        type: `${NAME}/${type}/FILL`,
        payload: {
            id,
            name,
            description,
            technologies,
            exportName,
        },
    }),
});
