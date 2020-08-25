import {takeLatest, put, call} from "redux-saga/effects";
import {UserByGoogle} from "app/model/user";
import auth from "core/auth";
import {cvApi} from "app/serverApi";

export default function* () {
    yield takeLatest(auth.authActionGroup.REQUEST, onLogin);
}

function* onLogin({request}) {
    const user = UserByGoogle.fromServer(request.profileObj);
    try {
        yield put(auth.authActionGroup.requestSuccess(request.tokenId, user));
    } catch (e) {
        console.error(e);
        yield put(auth.authActionGroup.requestFailure());
    } finally {
        yield call(createCvIfNotExist, user);
    }
}

function* createCvIfNotExist(user) {
    yield call(cvApi.fetchCvForUser, user.get("googleId"), user.get("email"), user.get("givenName"), user.get("familyName"));
}
