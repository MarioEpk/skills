import {call, fork, put, takeEvery} from "redux-saga/effects";

import {formBlurMatcher, formWrapper, startSubmit} from "core/form";
import router from "core/router";
import {CV} from "app/constants";

import form from "./form";
import {cvApi, typeApi} from "../../serverApi";
import {cvTypesActionGroup} from "./actions";

export default router.routerWrapper({
    * getDataForPage() {
        return [yield call(fetchDataForPage)];
    },
    * onPageEnter({id}) {
        if (id) {
            yield fork(formSaga, id);
        } else {
            yield call(redirectToUserCv);
        }
    },
});

const formSaga = formWrapper(form.FORM_NAME, {
    * initialize(cvId) {
        try {
            const payload = yield call(cvApi.fetchCv, cvId);
            return {
                [form.FIRST_NAME_FIELD]: payload.getIn(["user", "firstName"]),
            };
        } catch (e) {
            console.error(e);
        }
        return {};
    },
    * save(values, targetId) {
        // eslint-disable-next-line no-console
        console.log("saving", targetId, values);
        // yield call(beApi)
        // field error handling, test purpose only
        // yield call(testDataApi.getFormFieldErrorResponse, FIRST_FIELD);
    },
    success() {
        // transition somewhere? notification?
    },
    * persistentEffects() {
        yield takeEvery(formBlurMatcher(form.FORM_NAME), test);
    },
});

function* test() {
    console.log("here")
}

function* redirectToUserCv() {
    try {
        const id = yield call(cvApi.fetchMyCvId);
        yield put(router.navigate(CV, {id}));
    } catch (e) {
        // TODO :: handle error
        console.error(e);
    }
}

function* fetchDataForPage() {
    try {
        const payload = yield call(typeApi.fetchAllTypes);
        return cvTypesActionGroup.fetchSuccess(payload);
    } catch (e) {
        // TODO :: handle error
        console.error(e);
        return cvTypesActionGroup.fetchFailure();
    }
}
