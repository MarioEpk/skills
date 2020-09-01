import {call, fork, put, takeLatest, all} from "redux-saga/effects";

import {formBlurMatcher, formWrapper, submit, reset} from "core/form";
import router from "core/router";
import {CV, ERROR} from "app/constants";
import notification from "core/notification";

import form from "./form";
import {cvApi} from "../../serverApi";
import {cvTypesActionGroup, cvActionGroup} from "./actions";
import language from "./language";
import skill from "./skill";
import technology from "./technology";
import certificate from "./certificate";
import other from "./other";
import project from "./project";

export default router.routerWrapper({
    * getDataForPage() {
        return [yield call(fetchDataForPage)];
    },
    * onPageEnter({id}) {
        if (id) {
            yield all(
                [language, skill, technology, certificate, other, project]
                    .map(({createSaga}) => fork(createSaga(fetchCv, id))),
            );
            yield fork(formSaga, id);
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
                [form.AVATAR_FIELD]: cv.get("avatar"),
                [form.POSITION_FIELD]: cv.get("positions").map((position) => position.id),
            };
        } catch (e) {
            console.error(e);
            return {};
        }
    },
    * save(values, cvId) {
        yield call(
            cvApi.updateCv,
            cvId,
            values.get(form.FIRST_NAME_FIELD),
            values.get(form.LAST_NAME_FIELD),
            values.get(form.POSITION_FIELD),
            values.get(form.PROFILE_FIELD),
            values.get(form.AVATAR_FIELD),
        );
        yield call(fetchCv, cvId);
    },
    * success() {
        yield put(notification.show("Aktualizováno"));
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
        yield put(router.navigate(ERROR));
    }
}

function* fetchDataForPage() {
    try {
        const payload = yield call(cvApi.fetchAllTypes);
        return cvTypesActionGroup.fetchSuccess(payload);
    } catch (e) {
        // TODO :: handle error
        console.error(e);
        return cvTypesActionGroup.fetchFailure();
    }
}
