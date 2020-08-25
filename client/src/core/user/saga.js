import {takeLatest, put, call} from "redux-saga/effects";
import {UserByGoogle} from "app/model/user";
import auth from "core/auth";

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
    }
}
