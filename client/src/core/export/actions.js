import {NAME} from './constants';

export const EXPORT_CV = `${NAME}/EXPORT_CV`;

export const exportCv = (id, lastName) => ({
    type: EXPORT_CV,
    payload: {
        id,
        lastName,
    },
});
