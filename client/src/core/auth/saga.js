import {takeLatest, put} from "redux-saga/effects";
import {UserByGoogle} from "core/model/userByGoogle";
import {authActionGroup} from "./actions";

export default function* () {
    yield takeLatest(authActionGroup.REQUEST, onLogin);
}

export function* onLogin({request}) {
    try {
        const user = UserByGoogle.fromServer(request.profileObj);
        yield put(authActionGroup.requestSuccess(request.tokenId, user));
    } catch (e) {
        console.error(e);
        yield put(authActionGroup.requestFailure());
    }
}
