import {NAME} from "./constants";

export const SHOW = `${NAME}/SHOW`;
export const HIDE = `${NAME}/HIDE`;

export const show = (title, text = null, type = null) => ({
    type: SHOW,
    payload: {title, text, type},
});

export const hide = () => ({
    type: HIDE,
});
