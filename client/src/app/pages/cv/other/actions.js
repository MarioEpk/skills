import modal from "core/modal";

import {MODAL_NAME, NAME} from "./constants";

export const FILL_FORM = `${NAME}/FILL_FORM`;
export const REMOVE_OTHER_FROM_CV = `${NAME}/REMOVE_CERTIFICATE_FROM_CV`;

export const fillForm = (id, name, date, description) => ({
    type: FILL_FORM,
    payload: {id, name, date, description},
});

export const removeOtherFromCv = (id) => ({
    type: REMOVE_OTHER_FROM_CV,
    payload: id,
});

export const openForm = () => modal.open(MODAL_NAME);
export const closeForm = () => modal.close(MODAL_NAME);
