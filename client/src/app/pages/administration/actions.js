import {NAME} from "./constants";

export const createOverviewActionGroup = (type) => ({
    FETCH: `${NAME}/${type}/FETCH`,
    FILL: `${NAME}/${type}/FILL`,
    REMOVE: `${NAME}/${type}/REMOVE`,
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
