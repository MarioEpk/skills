import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import {change} from "redux-form";
import {cvApi} from "app/serverApi";
import {formWrapper, reset} from "core/form";
import modal from "core/modal";
import {closeForm, FILL_FORM, REMOVE_CERTIFICATE_FROM_CV} from "./actions";
import {DATE_FIELD, FORM_NAME, ID_FIELD, MODAL_NAME, DESCRIPTION_FIELD, NAME_FIELD} from "./constants";

export default (fetchCv, cvId) => formWrapper(FORM_NAME, {
    * save(values) {
        const valuesJs = values.toJS();
        if (values.get(ID_FIELD)) {
            yield call(cvApi.updateCertificate, valuesJs);
        } else {
            yield call(cvApi.addCertificateToCv, valuesJs, cvId);
        }
    },
    * success() {
        yield put(closeForm());
        yield call(fetchCv, cvId);
    },
    * persistentEffects() {
        yield takeEvery(FILL_FORM, fillForm);
        yield takeEvery(REMOVE_CERTIFICATE_FROM_CV, removeCertificate(fetchCv, cvId));
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

const removeCertificate = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeCertificateFromCv, payload);
    yield call(fetchCv, cvId);
};
