import {NAME} from './constants';

export const RESET = `${NAME}/RESET`;

export const submitActionGroup = {
    SUBMIT: `${NAME}/SUBMIT/REQUEST`,
    SUBMIT_FAIL: `${NAME}/SUBMIT/FAILURE`,
    submit: (form, data, resolve, reject) => ({
        type: `${NAME}/SUBMIT/REQUEST`,
        meta: {form, resolve, reject},
        payload: data,
    }),
    submitFailure: (form) => ({
        type: `${NAME}/SUBMIT/FAILURE`,
        meta: {form},
    }),
};

export const reset = (form) => ({
    type: RESET,
    meta: {form},
});
