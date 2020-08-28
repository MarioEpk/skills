import modal from "core/modal";
import {MODAL_NAME, NAME} from "./constants";

export const FILL_FORM = `${NAME}/FILL_FORM`;
export const OPEN_FORM = `${NAME}/OPEN_FORM`;
export const REMOVE_PROJECT_FROM_CV = `${NAME}/REMOVE_PROJECT_FROM_CV`;

export const fillForm = (id, from, to, company, contribution, positions, technologies) => ({
    type: FILL_FORM,
    payload: {id, from, to, company, contribution, positions, technologies},
});

export const removeProjectFromCv = (id) => ({
    type: REMOVE_PROJECT_FROM_CV,
    payload: id,
});

export const openForm = (projectTypeId) => ({
    type: OPEN_FORM,
    payload: projectTypeId,
});
export const closeForm = () => modal.close(MODAL_NAME);
