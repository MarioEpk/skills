import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import {change} from "redux-form";

import {cvApi} from "app/serverApi";
import {formWrapper, reset} from "core/form";
import modal from "core/modal";
import notification from "core/notification";

import {closeForm, FILL_FORM, REMOVE_OTHER_FROM_CV} from "./actions";
import {DATE_FIELD, FORM_NAME, ID_FIELD, MODAL_NAME, DESCRIPTION_FIELD, NAME_FIELD} from "./constants";

export default (fetchCv, cvId) => formWrapper(FORM_NAME, {
    * save(values) {
        const valuesJs = values.toJS();
        if (values.get(ID_FIELD)) {
            yield call(cvApi.updateOther, valuesJs, cvId);
        } else {
            yield call(cvApi.addOtherToCv, valuesJs, cvId);
        }
    },
    * success() {
        yield put(closeForm());
        yield call(fetchCv, cvId);
        yield put(notification.show("Added"));
    },
    * persistentEffects() {
        yield takeEvery(FILL_FORM, fillForm);
        yield takeEvery(REMOVE_OTHER_FROM_CV, removeOther(fetchCv, cvId));
        yield takeLatest(modal.closeModalMatcher(MODAL_NAME), resetForm);
    },
});

function* fillForm({payload: {id, name, date, description}}) {
    yield put(change(FORM_NAME, ID_FIELD, id));
    yield put(change(FORM_NAME, NAME_FIELD, name));
    yield put(change(FORM_NAME, DATE_FIELD, date));
    yield put(change(FORM_NAME, DESCRIPTION_FIELD, description));
}

function* resetForm() {
    yield put(reset(FORM_NAME));
}

const removeOther = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeOtherFromCv, cvId, payload);
    yield call(fetchCv, cvId);
    yield put(notification.show("Deleted"));
};
