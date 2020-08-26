import {call, takeLatest} from "redux-saga/effects";
import {cvApi} from "app/serverApi";
import {ADD_TECHNOLOGY_TO_CV, REMOVE_TECHNOLOGY_FROM_CV, UPDATE_TECHNOLOGY} from "./actions";

export default (fetchCv, cvId) => function* createSaga() {
    yield takeLatest(ADD_TECHNOLOGY_TO_CV, addTechnology(fetchCv, cvId));
    yield takeLatest(UPDATE_TECHNOLOGY, updateSkill(fetchCv, cvId));
    yield takeLatest(REMOVE_TECHNOLOGY_FROM_CV, removeTechnology(fetchCv, cvId));
};

const addTechnology = (fetchCv, cvId) => function* add({payload}) {
    yield call(cvApi.addTechnologyToCv, payload, cvId);
    yield call(fetchCv, cvId);
};

const updateSkill = (fetchCv, cvId) => function* update({payload: {id, level}}) {
    yield call(cvApi.updateTechnology, id, level);
    yield call(fetchCv, cvId);
};

const removeTechnology = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeTechnologyFromCv, payload);
    yield call(fetchCv, cvId);
};
