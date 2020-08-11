import {NAME} from "./constants";

export const SET_ROWS = `${NAME}/SET_ROWS`;
export const CLEAR_DATA = `${NAME}/CLEAR_DATA`;

export const setRows = (rows) => ({
    type: SET_ROWS,
    payload: rows,
});
