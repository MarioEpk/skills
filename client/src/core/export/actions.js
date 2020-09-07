import {NAME} from './constants';

export const EXPORT_CV = `${NAME}/EXPORT_CV`;

export const exportCv = (id) => ({
    type: EXPORT_CV,
    payload: {
        id,
    },
});
