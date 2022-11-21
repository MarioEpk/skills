import {all, call, fork, takeLatest, put, putResolve} from "redux-saga/effects";
import router from "core/router";
import notification from "core/notification";
import modal from "core/modal";

import form from "./form";
import {createTypeActionGroup} from "./actions";
import {availableTypesArray, MODAL_NAME} from "./constants";
import {getApiForType} from "./utils";
import {getConfirmation} from "history/DOMUtils";
import {openForm} from "../cv/certificate/actions";

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

function* confirmRemove() {
    console.log("1111111");
    yield putResolve(openForm());
    console.log("222222");
}

function* removeEntityFromType(type, {payload}) {
    try {
        yield call(getApiForType(type).remove, {id: payload});
        yield call(refreshDataForType, type);
        yield put(notification.show("Deleted"));
    } catch (e) {
        if (e.status === 422) {
            const isConfirmed = yield call(confirmRemove);
            if (isConfirmed) {
                alert("YES!!!!!");
            }
        }
        yield put(notification.show("Problem with deleting", null, notification.types.FAILED));
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
        yield put(notification.show("Problem with data fetching", null, notification.types.FAILED));
        return action.fetchFailure();
    }
}
