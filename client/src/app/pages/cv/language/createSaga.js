import {call, put, takeLatest} from "redux-saga/effects";
import {cvApi} from "app/serverApi";
import notification from "core/notification";

import {ADD_LANGUAGE_TO_CV, REMOVE_LANGUAGE_FROM_CV, UPDATE_LANGUAGE} from "./actions";

export default (fetchCv, cvId) => function* createSaga() {
    yield takeLatest(ADD_LANGUAGE_TO_CV, addLanguage(fetchCv, cvId));
    yield takeLatest(UPDATE_LANGUAGE, updateLanguage(fetchCv, cvId));
    yield takeLatest(REMOVE_LANGUAGE_FROM_CV, removeLanguage(fetchCv, cvId));
};

const addLanguage = (fetchCv, cvId) => function* add({payload}) {
    yield call(cvApi.addLanguageToCv, payload, cvId);
    yield call(fetchCv, cvId);
    yield put(notification.show("Added"));
};

const updateLanguage = (fetchCv, cvId) => function* update({payload: {id, level}}) {
    yield call(cvApi.updateLanguage, id, level);
    yield call(fetchCv, cvId);
    yield put(notification.show("Updated"));
};

const removeLanguage = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeLanguageFromCv, payload);
    yield call(fetchCv, cvId);
    yield put(notification.show("Deleted"));
};
