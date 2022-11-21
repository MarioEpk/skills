import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import router from "core/router";
import types from "core/types";

import form from "./form";
import {createTypeActionGroup} from "./actions";

export default router.routerWrapper({
    * onPageEnter() {
        yield all(types.availableTypesArray.map((type) => fork(form.createFormSaga(type))));
        yield all(types.availableTypesArray.map((type) => {
            const action = createTypeActionGroup(type);
            return takeLatest(action.FETCH, types.fetchDataForType, type);
        }));
        yield all(types.availableTypesArray.map((type) => {
            const action = createTypeActionGroup(type);
            return takeLatest(action.REMOVE, types.removeItemFromType, type);
        }));
    },
});

function* removeEntityFromType(type, {payload}) {
    try {
        yield call(getApiForType(type).remove, payload);
        if (payload.forceDelete === true) {
            yield put(createTypeActionGroup(type).forceDeleteConfirmation(undefined));
            yield all(availableTypesArray.map((t) => refreshDataForType(t)));
        }
        yield call(refreshDataForType, type);
        yield put(notification.show("Deleted"));
    } catch (e) {
        if (e.status === 422) {
            yield put(createTypeActionGroup(type).forceDeleteConfirmation(payload.id));
        } else {
            console.error(e);
            yield put(notification.show("Problem with deleting", null, notification.types.FAILED));
        }
    }
}

function* refreshDataForType(type) {
    const action = yield getDataForType(type);
    yield put(action);
}

function* getDataForType(type) {
    const action = createTypeActionGroup(type);
    try {
        const payload = yield call(getApiForType(type).fetch);
        return action.fetchSuccess(payload);
    } catch (e) {
        console.error(e);
        yield put(notification.show("Problem with data fetching", null, notification.types.FAILED));
        return action.fetchFailure();
    }
}
