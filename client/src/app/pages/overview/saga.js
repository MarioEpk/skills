import {call, fork, put, takeLatest} from "redux-saga/effects";
import download from "downloadjs";

import router from "core/router";
import {formWrapper, reset} from "core/form";
import notification from "core/notification";
import modal from "core/modal";
import {cvApi, userApi} from "app/serverApi";

import {overviewActionGroup} from "./actions";
import form from "./form";
import {MODAL_FORM_NAME} from "./constants";
import {copyCVPublicUrlToClipboard, copyCVPrivateUrlToClipboard} from "../cv";

export default router.routerWrapper({
    * getDataForPage() {
        return [yield call(fetchData)];
    },
    * onPageEnter() {
        yield fork(formSaga);
        yield takeLatest(overviewActionGroup.REMOVE, deleteData);
        yield takeLatest(overviewActionGroup.SHARE_CV, shareCv);
        yield takeLatest(overviewActionGroup.COPY_PRIVATE_URL, copyPrivateUrl);
        yield takeLatest(overviewActionGroup.COPY_PUBLIC_URL, copyPublicUrl);
        yield takeLatest(overviewActionGroup.FETCH_CERTIFICATES_FOR_ALL_USERS, downloadCertificatesForAllUsers);
        yield takeLatest(overviewActionGroup.FETCH_EDUCATIONS_FOR_ALL_USERS, downloadEducationsForAllUsers);
    },
});

const formSaga = formWrapper(form.FORM_NAME, {
    * save(values) {
        yield call(
            cvApi.createCv,
            values.get(form.EMAIL_FIELD),
            values.get(form.FIRST_NAME_FIELD),
            values.get(form.LAST_NAME_FIELD),
        );
    },
    * error() {
        yield put(notification.show("Problem with creating", null, notification.types.FAILED));
    },
    * success() {
        yield call(refreshData);
        yield put(modal.close(MODAL_FORM_NAME));
        yield put(reset(form.FORM_NAME));
    },
});

function* refreshData() {
    const action = yield fetchData();
    yield put(action);
}

function* fetchData() {
    try {
        const payload = yield call(cvApi.fetchCvs);
        return overviewActionGroup.fetchSuccess(payload);
    } catch (e) {
        console.error(e);
        return overviewActionGroup.fetchFailure();
    }
}

function* deleteData({payload}) {
    try {
        yield call(cvApi.deleteCv, payload);
        yield call(refreshData);
        yield put(notification.show("Deleted"));
    } catch (e) {
        yield put(notification.show("Problem with deleting", null, notification.types.FAILED));
        console.error(e);
    }
}

function* shareCv({payload}) {
    try {
        yield call(cvApi.shareCv, payload.cvId);
        yield call(refreshData);
        const cv = yield call(cvApi.fetchCv, payload.cvId);
        yield put(notification.show(cv.shared ? "CV shared" : "CV unshared", cv.shared ? "CV is public" : "CV is no longer public"));
        return cv.externalCode;
    } catch (e) {
        yield put(notification.show("Problem with share", null, notification.types.FAILED));
        console.error(e);
        return null;
    }
}

function* copyPrivateUrl({payload}) {
    yield call(copyCVPrivateUrlToClipboard, payload);
    yield put(notification.show("Copied", "URL has been copied to clipboard"));
}

function* copyPublicUrl({payload}) {
    const {cvId, shareEnabled} = payload;
    let {externalCode} = payload;
    if (!shareEnabled) {
        externalCode = yield call(shareCv, {payload: {cvId}});
    }
    yield call(copyCVPublicUrlToClipboard, externalCode);
    yield put(notification.show("CV shared", "URL has been copied to clipboard"));
}

function* downloadTxtFileFromString(fileName, fileContent) {
    const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
    yield call(download, blob, fileName, "text/plain");
}

function* downloadCertificatesForAllUsers() {
    const data = yield call(userApi.fetchCertificatesForAllUsers);
    const fileContent = data.map(({userFirstName, userLastName, certificates}) => certificates.map(({name}) => `${userFirstName} ${userLastName}: ${name}`)).flat().join("\n");
    yield call(downloadTxtFileFromString, "certificates.txt", fileContent);
}

function* downloadEducationsForAllUsers() {
    const data = yield call(userApi.fetchEducationsForAllUsers);
    const fileContent = data.map(({userFirstName, userLastName, educations}) => educations.map(({school, field}) => `${userFirstName} ${userLastName}: ${school} - ${field}`)).flat().join("\n");
    yield call(downloadTxtFileFromString, "educations.txt", fileContent);
}
