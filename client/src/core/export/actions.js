import {NAME} from './constants';

export const EXPORT_CV = `${NAME}/EXPORT_CV`;
export const EXPORT_CV_TO_DOC = `${NAME}/EXPORT_CV_TO_DOC`;

export const exportCv = (id, lastName) => ({
    type: EXPORT_CV,
    payload: {
        id,
        lastName,
    },
});

export const exportCvToDoc = (id, lastName) => ({
    type: EXPORT_CV_TO_DOC,
    payload: {
        id,
        lastName,
    },
});
