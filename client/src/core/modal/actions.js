import {NAME} from './constants';

export const OPEN = `${NAME}/OPEN`;
export const CLOSE = `${NAME}/CLOSE`;

export const open = (name) => ({
    type: OPEN,
    payload: name,
});

export const close = (name) => ({
    type: CLOSE,
    payload: name,
});
