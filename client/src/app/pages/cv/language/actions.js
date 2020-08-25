export const ADD_LANGUAGE_TO_CV = "ADD_LANGUAGE_TO_CV";
export const REMOVE_LANGUAGE_FROM_CV = "REMOVE_LANGUAGE_FROM_CV";

export const addLanguageToCv = (id) => ({
    type: ADD_LANGUAGE_TO_CV,
    payload: id,
});

export const removeLanguageFromCv = (id) => ({
    type: REMOVE_LANGUAGE_FROM_CV,
    payload: id,
});
