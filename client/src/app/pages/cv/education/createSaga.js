import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import {change} from "redux-form";

import {cvApi} from "app/serverApi";
import {formWrapper, reset} from "core/form";
import modal from "core/modal";
import notification from "core/notification";

import {closeForm, FILL_FORM, REMOVE_EDUCATION_FROM_CV} from "./actions";
import {SCHOOL_FIELD, FORM_NAME, ID_FIELD, MODAL_NAME, FIELD_FIELD, YEAR_FROM_FIELD, YEAR_TO_FIELD, NOTE_FIELD} from "./constants";

export default (fetchCv, cvId) => formWrapper(FORM_NAME, {
    * save(values) {
        const valuesJs = values.toJS();
        if (values.get(ID_FIELD)) {
            yield call(cvApi.updateEducation, valuesJs, cvId);
        } else {
            yield call(cvApi.addEducationToCv, valuesJs, cvId);
        }
    },
    * success() {
        yield put(closeForm());
        yield call(fetchCv, cvId);
        yield put(notification.show("Added"));
    },
    * persistentEffects() {
        yield takeEvery(FILL_FORM, fillForm);
        yield takeEvery(REMOVE_EDUCATION_FROM_CV, removeEducation(fetchCv, cvId));
        yield takeLatest(modal.closeModalMatcher(MODAL_NAME), resetForm);
    },
});

function* fillForm({payload: {id, school, field, yearFrom, yearTo, note}}) {
    yield put(change(FORM_NAME, ID_FIELD, id));
    yield put(change(FORM_NAME, SCHOOL_FIELD, school));
    yield put(change(FORM_NAME, FIELD_FIELD, field));
    yield put(change(FORM_NAME, YEAR_FROM_FIELD, yearFrom));
    yield put(change(FORM_NAME, YEAR_TO_FIELD, yearTo));
    yield put(change(FORM_NAME, NOTE_FIELD, note));
}

function* resetForm() {
    yield put(reset(FORM_NAME));
}

const removeEducation = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeEducationFromCv, cvId, payload);
    yield call(fetchCv, cvId);
    yield put(notification.show("Deleted"));
};
