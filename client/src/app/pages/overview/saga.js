import {call, fork, put, takeLatest} from "redux-saga/effects";

import router from "core/router";
import {formWrapper, reset} from "core/form";
import notification from "core/notification";
import modal from "core/modal";
import {cvApi} from "app/serverApi";

import {cvActionGroup} from "./actions";
import form from "./form";
import {MODAL_FORM_NAME} from "./constants";

export default router.routerWrapper({
    * getDataForPage() {
        return [yield call(fetchData)];
    },
    * onPageEnter() {
        yield fork(formSaga);
        yield takeLatest(cvActionGroup.REMOVE, deleteData);
    },
});

const formSaga = formWrapper(form.FORM_NAME, {
    * save(values) {
        yield call(
            cvApi.createCv,
            values.get(form.EMAIL_FIELD),
            values.get(form.FIRST_NAME_FIELD),
            values.get(form.LAST_NAME_FIELD),
        );
    },
    * error() {
        yield put(notification.show("Problem with creating", null, notification.types.FAILED));
    },
    * success() {
        yield call(refreshData);
        yield put(modal.close(MODAL_FORM_NAME));
        yield put(reset(form.FORM_NAME));
    },
});

function* refreshData() {
    const action = yield fetchData();
    yield put(action);
}

function* fetchData() {
    try {
        const payload = yield call(cvApi.fetchCvs);
        return cvActionGroup.fetchSuccess(payload);
    } catch (e) {
        console.error(e);
        return cvActionGroup.fetchFailure();
    }
}

function* deleteData({payload}) {
    try {
        yield call(cvApi.deleteCv, payload);
        yield call(refreshData);
        yield put(notification.show("Deleted"));
    } catch (e) {
        yield put(notification.show("Problem with deleting", null, notification.types.FAILED));
        console.error(e);
    }
}
