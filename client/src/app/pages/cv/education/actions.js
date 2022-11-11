import modal from "core/modal";

import {MODAL_NAME, NAME} from "./constants";

export const FILL_FORM = `${NAME}/FILL_FORM`;
export const REMOVE_EDUCATION_FROM_CV = `${NAME}/REMOVE_EDUCATION_FROM_CV`;

export const fillForm = (id, school, field, yearFrom, yearTo, note) => ({
    type: FILL_FORM,
    payload: {id, school, field, yearFrom, yearTo, note},
});

export const removeEducationFromCv = (id) => ({
    type: REMOVE_EDUCATION_FROM_CV,
    payload: id,
});

export const openForm = () => modal.open(MODAL_NAME);
export const closeForm = () => modal.close(MODAL_NAME);
