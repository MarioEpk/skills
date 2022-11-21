import {all, call, fork, takeLatest, put} from "redux-saga/effects";
import router from "core/router";
import notification from "core/notification";

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
        yield call(getApiForType(type).remove, payload);
        // if (payload.forceDelete) {
        //     alert("force deleted");
        //     yield put(createTypeActionGroup('forceDeleteConfirmation').forceDeleteConfirmation(false));
        // }
        yield call(refreshDataForType, type);
        yield put(notification.show("Deleted"));
    } catch (e) {
        if (e.status === 422) {
            console.error("Constraints error, needs force delete confirmation");
            yield put(createTypeActionGroup('forceDeleteConfirmation').forceDeleteConfirmation(true));
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
