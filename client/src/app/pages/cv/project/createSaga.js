import {call, put, takeEvery, takeLatest, all} from "redux-saga/effects";
import {change} from "redux-form";

import {cvApi} from "app/serverApi";
import {formWrapper, reset} from "core/form";
import modal from "core/modal";
import notification from "core/notification";

import {closeForm, FILL_FORM, OPEN_FORM, REMOVE_PROJECT_FROM_CV} from "./actions";
import {
    FORM_NAME, ID_FIELD, MODAL_NAME, FROM_FIELD, TO_FIELD, COMPANY_FIELD, CONTRIBUTION_FIELD, POSITION_TYPES_FIELD, PROJECT_TYPE_FIELD,
    TECHNOLOGY_TYPE_FIELD,
} from "./constants";

export default (fetchCv, cvId) => formWrapper(FORM_NAME, {
    * save(values) {
        const valuesJs = values.toJS();
        if (values.get(ID_FIELD)) {
            yield call(cvApi.updateProject, valuesJs);
        } else {
            yield call(cvApi.addProjectToCv, valuesJs, cvId);
        }
    },
    * success() {
        yield put(closeForm());
        yield call(fetchCv, cvId);
        yield put(notification.show("Added"));
    },
    * persistentEffects() {
        yield takeEvery(FILL_FORM, fillForm);
        yield takeEvery(OPEN_FORM, openForm);
        yield takeEvery(REMOVE_PROJECT_FROM_CV, removeProject(fetchCv, cvId));
        yield takeLatest(modal.closeModalMatcher(MODAL_NAME), resetForm);
    },
});

function* fillForm({payload: {id, from, to, company, contribution, positions, technologies}}) {
    yield all([
        put(change(FORM_NAME, ID_FIELD, id)),
        put(change(FORM_NAME, FROM_FIELD, from)),
        put(change(FORM_NAME, TO_FIELD, to)),
        put(change(FORM_NAME, COMPANY_FIELD, company)),
        put(change(FORM_NAME, CONTRIBUTION_FIELD, contribution)),
        put(change(FORM_NAME, POSITION_TYPES_FIELD, positions.map((position) => position.id))),
        put(change(FORM_NAME, TECHNOLOGY_TYPE_FIELD, technologies.map((technology) => technology.id))),
    ]);
}

function* openForm({payload: projectTypeId}) {
    yield put(change(FORM_NAME, PROJECT_TYPE_FIELD, {id: projectTypeId}));
    yield put(change(FORM_NAME, COMPANY_FIELD, "Morosystems"));
    yield put(modal.open(MODAL_NAME));
}

function* resetForm() {
    yield put(reset(FORM_NAME));
}

const removeProject = (fetchCv, cvId) => function* remove({payload}) {
    yield call(cvApi.removeProjectFromCv, payload);
    yield call(fetchCv, cvId);
    yield put(notification.show("Deleted"));
};
