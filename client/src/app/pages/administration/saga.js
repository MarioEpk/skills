import {all, call, fork, takeLatest, put} from "redux-saga/effects";
import router from "core/router";

import form from "./form";
import {createTypeActionGroup} from "./actions";
import {availableTypesArray} from "./constants";
import {getApiForType} from "./utils";

export default router.routerWrapper({
    * getDataForPage() {
        return yield all(availableTypesArray.map((type) => call(getDataForType, type)));
    },
    * onPageEnter() {
        yield all(availableTypesArray.map((type) => fork(form.createFormSaga(type))));
        yield all(availableTypesArray.map((type) => {
            const action = createTypeActionGroup(type);
            return takeLatest(action.FETCH, refreshDataForType, type);
        }));
        yield all(availableTypesArray.map((type) => {
            const action = createTypeActionGroup(type);
            return takeLatest(action.REMOVE, removeEntityFromType, type);
        }));
    },
});

function* removeEntityFromType(type, {payload}) {
    try {
        yield call(getApiForType(type).remove, {id: payload});
        yield call(refreshDataForType, type);
    } catch (e) {
        // TODO :: error handle
        console.error(e);
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
        return action.fetchFailure();
    }
}
