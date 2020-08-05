import {call, takeLatest, put} from "redux-saga/effects";

import router from "core/router";
import {testDataApi} from "app/serverApi";
import {testDataActionGroup} from "./actions";

export default router.routerWrapper({
    * onPageEnter() {
        // eslint-disable-next-line no-console
        yield call(console.log, "page1 saga");
        yield takeLatest(testDataActionGroup.REQUEST, getDataForAsyncTest);
    },
});

function* getDataForAsyncTest() {
    try {
        const data = yield call(testDataApi.getTestData);
        yield put(testDataActionGroup.requestSuccess(data));
    } catch (e) {
        yield put(testDataActionGroup.requestFailure());
    }
}
