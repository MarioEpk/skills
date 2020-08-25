import {call, fork, put, takeLatest} from "redux-saga/effects";

import {formBlurMatcher, formWrapper, submit, reset} from "core/form";
import router from "core/router";
import {CV} from "app/constants";

import form from "./form";
import {cvApi, typeApi} from "../../serverApi";
import {cvTypesActionGroup, cvActionGroup} from "./actions";
import language from "./language";

export default router.routerWrapper({
    * getDataForPage() {
        return [yield call(fetchDataForPage)];
    },
    * onPageEnter({id}) {
        if (id) {
            yield fork(formSaga, id);
            yield fork(language.createSaga(fetchCv, id));
        } else {
            yield call(redirectToUserCv);
        }
    },
});

const formSaga = formWrapper(form.FORM_NAME, {
    * initialize(cvId) {
        try {
            const cv = yield call(fetchCv, cvId);
            return {
                [form.FIRST_NAME_FIELD]: cv.getIn(["user", "firstName"]),
                [form.LAST_NAME_FIELD]: cv.getIn(["user", "lastName"]),
                [form.PROFILE_FIELD]: cv.get("profile"),
            };
        } catch (e) {
            console.error(e);
        }
        return {};
    },
    * save(values, cvId) {
        yield call(
            cvApi.updateCv,
            cvId,
            values.get(form.FIRST_NAME_FIELD),
            values.get(form.LAST_NAME_FIELD),
            values.get(form.PROFILE_FIELD),
        );
        yield call(fetchCv, cvId);
    },
    success() {
        // transition somewhere? notification?
    },
    * persistentEffects() {
        yield takeLatest(formBlurMatcher(form.FORM_NAME), submitForm);
    },
});

function* fetchCv(id) {
    try {
        const cv = yield call(cvApi.fetchCv, id);
        yield put(cvActionGroup.fetchSuccess(cv));
        return cv;
    } catch (e) {
        yield put(cvActionGroup.fetchFailure());
        yield put(reset(form.FORM_NAME));
        throw e;
    }
}

export function* submitForm() {
    yield put(submit(form.FORM_NAME));
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
