import {List} from "immutable";
import {takeLatest, put} from 'redux-saga/effects';
import {
    SubmissionError,
    initialize as reduxFormInitialize,
} from "redux-form/immutable";
import objectPath from "object-path";

import {submitActionGroup, RESET} from "./actions";

const GENERAL_ERROR_KEY = "_error"; // redux-form spec

export const initialize = function* (form, values) {
    yield put(reduxFormInitialize(form, values, false));
};

export const failSubmitWithCustomErrors = ({reject}, errors) => {
    reject(new SubmissionError(errors));
};

export const failSubmitWithException = ({reject}, exception) => {
    const errors = transformErrorsForForm(exception.response.fieldErrors);
    errors[GENERAL_ERROR_KEY] = List(exception.response.errors);
    reject(new SubmissionError(errors));
};

export const successSubmit = ({resolve}) => resolve();

const createFormMatcher = (formName, actionType) => ({type, meta}) => type === actionType && meta && meta.form === formName;

export const takeLatestSubmit = (formName, func, ...args) => takeLatest(createFormMatcher(formName, submitActionGroup.SUBMIT), func, ...args);
export const takeLatestOnSubmitFail = (formName, func, ...args) => takeLatest(createFormMatcher(formName, submitActionGroup.FAILURE), func, ...args);
export const takeLatestReset = (formName, func, ...args) => takeLatest(createFormMatcher(formName, RESET), func, ...args);

export const transformErrorsForForm = (errors) => errors.reduce((acc, fieldError) => {
    const path = fieldError.field;
    if (!objectPath.has(acc, path)) {
        objectPath.ensureExists(acc, path, List([fieldError.message]));
    } else {
        const list = objectPath.get(acc, path);
        objectPath.set(acc, path, list.push(fieldError.message));
    }
    return acc;
}, {});
