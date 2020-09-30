import {NAME} from "./constants";

export const ADD_LANGUAGE_TO_CV = `${NAME}/ADD_LANGUAGE_TO_CV`;
export const UPDATE_LANGUAGE = `${NAME}/ADD_LANGUAGE`;
export const REMOVE_LANGUAGE_FROM_CV = `${NAME}/REMOVE_LANGUAGE_FROM_CV`;

export const addLanguageToCv = (id) => ({
    type: ADD_LANGUAGE_TO_CV,
    payload: id,
});

export const updateLanguage = (id, level) => ({
    type: UPDATE_LANGUAGE,
    payload: {id, level},
});

export const removeLanguageFromCv = (id) => ({
    type: REMOVE_LANGUAGE_FROM_CV,
    payload: id,
});
