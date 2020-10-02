import {call, put, takeLatest} from "redux-saga/effects";
import {cvApi} from "app/serverApi";
import {ADD_SKILL_TO_CV, REMOVE_SKILL_FROM_CV, UPDATE_SKILL} from "./actions";
import notification from "core/notification";

export default (fetchCv, cvId) => function* createSaga() {
    yield takeLatest(ADD_SKILL_TO_CV, addSkill(fetchCv, cvId));
    yield takeLatest(UPDATE_SKILL, updateSkill(fetchCv, cvId));
    yield takeLatest(REMOVE_SKILL_FROM_CV, removeSkill(fetchCv, cvId));
};

const addSkill = (fetchCv, cvId) => function* add({payload}) {
    yield call(cvApi.addSkillToCv, payload, cvId);
    yield call(fetchCv, cvId);
    yield put(notification.show("Added"));
};

const updateSkill = (fetchCv, cvId) => function* update({payload: {id, level}}) {
    yield call(cvApi.updateSkill, id, level);
    yield call(fetchCv, cvId);
    yield put(notification.show("Updated"));
};

const removeSkill = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeSkillFromCv, payload);
    yield call(fetchCv, cvId);
    yield put(notification.show("Deleted"));
};
