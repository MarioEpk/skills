import {NAME} from './constants';

export const EXPORT_CV = `${NAME}/EXPORT_CV`;
export const EXPORT_CV_TO_DOC = `${NAME}/EXPORT_CV_TO_DOC`;

export const exportCv = (id, firstName, lastName) => ({
    type: EXPORT_CV,
    payload: {
        id,
        firstName,
        lastName,
    },
});

export const exportCvToDoc = (id, firstName, lastName) => ({
    type: EXPORT_CV_TO_DOC,
    payload: {
        id,
        firstName,
        lastName,
    },
});
