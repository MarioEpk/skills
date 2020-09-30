import {call, all, fork, delay, put} from "redux-saga/effects";
import {submit, initialize as reduxFormInitialize, destroy} from "redux-form/immutable";

import fetch from 'core/fetch';
import {fn} from "../util";

import {
    failSubmitWithException,
    failSubmitWithCustomErrors,
    successSubmit,
    takeLatestSubmit,
    takeLatestOnSubmitFail,
    takeLatestReset,
    initialize as initializeAction,
} from "./saga";

/**
 * @param formName
 * @param {object} config params
 * @param {function} config.save
 * @param {?function} config.initialize
 * @param {?function} config.success
 * @param {?function} config.error
 * @param {?function} config.persistentEffects
 */
export const formWrapper = (formName, {
    save,
    initialize = fn.noop,
    success = fn.noop,
    error = fn.noop,
    onSubmitFail = fn.noop,
    persistentEffects = fn.noop,
}) => function* wrapperFn(...params) {
    try {
        const initialData = yield call(initialize, ...params);
        // when initialData will be {} - form will be initialize as empty
        // in case of undefined/null/'' form stays as is (it values could be filled in initialize method)
        if (!fn.isEmpty(initialData)) {
            yield call(initializeAction, formName, initialData);
        }

        yield fork(persistentEffects, ...params);

        yield all([
            takeLatestOnSubmitFail(formName, onSubmitFail, ...params),
            saveWrapper(formName, save, success, error, ...params),
            resetWrapper(formName),
        ]);
        yield call(fn.block);
    } finally {
        yield put(destroy(formName));
    }
};

const saveWrapper = (formName, saga, onSuccess, onError, ...params) => takeLatestSubmit(formName, saveForm, saga, onSuccess, onError, params);
const resetWrapper = (formName) => takeLatestReset(formName, resetForm, formName);

function* resetForm(formName) {
    yield put(reduxFormInitialize(formName, {}));
    yield delay(0); // force end of event loop. Otherwise, submit is called with old form values, before reset
    yield put(submit(formName));
}

function* saveForm(saga, onSuccess, onError, params, {meta, payload}) {
    try {
        const result = yield call(saga, payload, ...params);
        yield call(onSuccess, result, ...params);
        yield call(successSubmit, meta);
    } catch (e) {
        // PRECOGNITION_FAILED status code is for test purpose, you can use any status code for showing errors
        if (e && e.status === fetch.PRECOGNITION_FAILED) {
            const errors = yield call(onError, e, payload, ...params);
            if (errors) {
                yield call(failSubmitWithCustomErrors, meta, errors);
            } else {
                yield call(failSubmitWithException, meta, e);
            }
        } else {
            throw e;
        }
    }
}

export const convertTypeToOptions = (type) => (type ? type.map((item) => ({
    label: item.get("name"),
    value: item.get("id"),
})) : []);
