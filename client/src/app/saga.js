import {call, put, take, fork, actionChannel} from 'redux-saga/effects';

import {translationsApi, pageContextApi} from "app/serverApi";
import i18n from "core/i18n";
import init from "core/init";
import router from "core/router";
import auth from "core/auth";

export default function* () {
    // Wait until auth request is done
    yield take(auth.authActionGroup.REQUEST_SUCCESS);
    yield call(router.delayedProgressStart, 0);
    try {
        yield call(loadContext);
        // channel for taking router.ROUTE_ENTERED must be created prior calling router.setPageByLocationDirectly
        // if we just call take router.ROUTE_ENTERED afterwards, its apparently too late, action was already dispatched.
        // normally it would not happened because javascript is single threaded, but there is some history.replace magic, which
        // can probably somehow interrupt js event loop.
        const channel = yield actionChannel(router.ROUTE_ENTERED);
        // router.setPageByLocationDirectly will appropriately intialize and enter initial route for app according to URL.
        yield fork(router.setPageByLocationDirectly, window.location);
        // after all the magic is done (action router.ROUTE_ENTERED is dispatched)
        yield take(channel);
        channel.close(); // just good manners, we wont need this channel anymore
        yield fork(router.startRouting);
        // we can show aplication component, which has already all data for page needed.
        yield put(init.initialize());
    } finally {
        yield call(router.cancelProgressTask);
    }
}

function* loadContext() {
    const {locale} = yield call(pageContextApi.getConfig);
    const messages = yield call(translationsApi.getTranslations, locale.languageCode.toLowerCase());
    yield call(i18n.addTranslations, locale.id, messages);
    yield call(i18n.changeLanguage, locale.id);
}
