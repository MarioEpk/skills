import {call, fork, put, takeLatest, all} from "redux-saga/effects";

import {formBlurMatcher, formWrapper, submit, reset} from "core/form";
import router from "core/router";
import {CV, ERROR} from "app/constants";
import notification from "core/notification";
import coreExport from "core/export";

import form from "./form";
import {cvApi} from "../../serverApi";
import {cvTypesActionGroup, cvActionGroup} from "./actions";
import language from "./language";
import skill from "./skill";
import technology from "./technology";
import certificate from "./certificate";
import other from "./other";
import project from "./project";
import education from "./education";
import {copyCurrentUrlToClipboard} from './utils';

export default router.routerWrapper({
    * getDataForPage() {
        return [yield call(fetchDataForPage)];
    },
    * onPageEnter({id}) {
        if (id) {
            yield all(
                [language, skill, technology, certificate, other, project, education]
                    .map(({createSaga}) => fork(createSaga(fetchCv, id))),
            );
            yield fork(formSaga, id);
            yield takeLatest(cvActionGroup.EXPORT, createExport(id));
            yield takeLatest(cvActionGroup.EXPORT_TO_DOC, createExportToDoc(id));
            yield takeLatest(cvActionGroup.COPY_URL, createCopyCvUrl());
        } else {
            yield call(redirectToUserCv);
        }
    },
});

const createExport = (id) => function* exportCv() {
    const cv = yield call(fetchCv, id);
    yield put(coreExport.exportCv(id, cv.getIn(["user", "firstName"]), cv.getIn(["user", "lastName"])));
};

const createExportToDoc = (id) => function* exportCvToDoc() {
    const cv = yield call(fetchCv, id);
    yield put(coreExport.exportCvToDoc(id, cv.getIn(["user", "firstName"]), cv.getIn(["user", "lastName"])));
};

const createCopyCvUrl = () => function* copyCvUrl() {
    yield call(copyCurrentUrlToClipboard);
    yield put(notification.show("Copied"));
};

const formSaga = formWrapper(form.FORM_NAME, {
    * initialize(cvId) {
        try {
            const cv = yield call(fetchCv, cvId);
            return {
                [form.FIRST_NAME_FIELD]: cv.getIn(["user", "firstName"]),
                [form.LAST_NAME_FIELD]: cv.getIn(["user", "lastName"]),
                [form.USER_ID_FIELD]: cv.getIn(["user", "id"]),
                [form.PROFILE_FIELD]: cv.get("profile"),
                [form.AVATAR_FIELD]: cv.get("avatar"),
                [form.POSITION_FIELD]: cv.get("positions").map((position) => position.id),
            };
        } catch (e) {
            return {};
        }
    },
    * save(values, cvId) {
        yield call(
            cvApi.updateCv,
            cvId,
            values.get(form.USER_ID_FIELD),
            values.get(form.FIRST_NAME_FIELD),
            values.get(form.LAST_NAME_FIELD),
            values.get(form.POSITION_FIELD),
            values.get(form.PROFILE_FIELD),
            values.get(form.AVATAR_FIELD),
        );
        yield call(fetchCv, cvId);
    },
    * success() {
        yield put(notification.show("Updated"));
    },
    * error() {
        yield put(notification.show("Problem with updating", null, notification.types.FAILED));
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
        yield put(notification.show("CV error", `There was a problem with fetching data for cv: ${id}`, notification.types.FAILED));
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
        yield put(notification.show("CV error", `There was a problem with fetching types`, notification.types.FAILED));
        console.error(e);
        return cvTypesActionGroup.fetchFailure();
    }
}
