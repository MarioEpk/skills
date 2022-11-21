import {NAME} from "./constants";

export const createTypeActionGroup = (type) => ({
    FETCH: `${NAME}/${type}/FETCH`,
    FILL: `${NAME}/${type}/FILL`,
    REMOVE: `${NAME}/${type}/REMOVE`,
    FORCE_DELETE_CONFIRMATION: `${NAME}/${type}/FORCE_DELETE_CONFIRMATION`,
    fetch: () => ({
        type: `${NAME}/${type}/FETCH`,
    }),
    update: (name) => ({
        type: `${NAME}/${type}/UPDATE`,
        payload: name,
    }),
    remove: (idToRemove, force) => ({
        type: `${NAME}/${type}/REMOVE`,
        payload: {id: idToRemove, forceDelete: force},
    }),
    forceDeleteConfirmation: (idToRemove) => ({
        type: `${NAME}/${type}/FORCE_DELETE_CONFIRMATION`,
        payload: {forceDeleteConfirmationId: idToRemove},
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
