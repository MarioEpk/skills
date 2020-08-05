import {call} from "redux-saga/effects";

import {testDataApi} from "app/serverApi";
import router from "core/router";

import {setRows} from "./actions";

export default router.routerWrapper({
    * getDataForPage() {
        const data = yield call(testDataApi.getTestData);
        return [setRows(data)];
    },
    * onPageEnter() {
        // eslint-disable-next-line no-console
        yield call(console.log, "page2 saga with delayed data load");
    },
});
