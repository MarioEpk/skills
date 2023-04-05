import {call, put, takeLatest} from "redux-saga/effects";

import {GoogleUser} from "app/model/user";
import auth from "core/auth";
import notification from "core/notification";
import {cvApi} from "app/serverApi";
import jwtDecode from "jwt-decode";

export default function* () {
    yield takeLatest(auth.authActionGroup.REQUEST, onLogin);
    yield takeLatest(auth.authActionGroup.REQUEST_FAIL, onFailed);
}

function* onFailed({error, details}) {
    yield put(notification.show(error, details, notification.types.FAILED));
}

function* onLogin({request}) {
    try {
        yield put(auth.saveToken(request.credential));
        const googleUser = GoogleUser.fromServer(jwtDecode(request.credential));
        const cv = yield call(cvApi.fetchCvForUser, googleUser.get("googleId"), googleUser.get("email"), googleUser.get("firstName"), googleUser.get("lastName"));
        const user = cv.get("user").set("imageUrl", googleUser.get("imageUrl"));
        yield put(auth.authActionGroup.requestSuccess(user));
    } catch (e) {
        console.error(e);
        yield put(auth.authActionGroup.requestFailure());
    }
}
