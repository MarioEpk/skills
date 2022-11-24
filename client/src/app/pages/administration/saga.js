import {all, fork, takeLatest} from "redux-saga/effects";
import router from "core/router";
import types from "core/types";

import form from "./form";
import {createOverviewActionGroup} from "./actions";

export default router.routerWrapper({
    * onPageEnter() {
        yield all(types.availableTypesArray.map((type) => fork(form.createFormSaga(type))));
        yield all(types.availableTypesArray.map((type) => {
            const action = createOverviewActionGroup(type);
            return takeLatest(action.FETCH, types.fetchDataForType, type);
        }));
        yield all(types.availableTypesArray.map((type) => {
            const action = createOverviewActionGroup(type);
            return takeLatest(action.REMOVE, types.removeItemFromType, type);
        }));
    },
});
