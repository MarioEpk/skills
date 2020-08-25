import {call, takeLatest} from "redux-saga/effects";
import {cvApi} from "app/serverApi";
import {ADD_LANGUAGE_TO_CV, REMOVE_LANGUAGE_FROM_CV} from "./actions";

// eslint-disable-next-line func-names
export default (fetchCv, cvId) => function* () {
    yield takeLatest(ADD_LANGUAGE_TO_CV, addLanguage(fetchCv, cvId));
    yield takeLatest(REMOVE_LANGUAGE_FROM_CV, removeLanguage(fetchCv, cvId));
};

// eslint-disable-next-line func-names
const addLanguage = (fetchCv, cvId) => function* ({payload}) {
    yield call(cvApi.addLanguageToCv, payload, cvId);
    yield call(fetchCv, cvId);
};

// eslint-disable-next-line func-names
const removeLanguage = (fetchCv, cvId) => function* ({payload}) {
    yield call(cvApi.removeLanguageFromCv, payload);
    yield call(fetchCv, cvId);
};
