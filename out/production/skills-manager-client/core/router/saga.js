import {takeEvery, cancel, call, fork, put, delay, select, getContext, takeLatest, all} from "redux-saga/effects";
import {eventChannel} from "redux-saga";
import NProgress from "nprogress";
import {createBrowserHistory} from 'history';
import {match} from "path-to-regexp";
import {parse, stringify} from "query-string";
import notification from "core/notification";
import {ERROR} from "app/constants";

import {
    NAVIGATE,
    NAVIGATE_EXTERNAL,
    BACK,
    routeEntered,
    routeClear,
    back,
} from "./actions";
import {getCurrentRoute, getCurrentParams} from "./selectors";
import {getRegisteredRoutes, setComponent} from "./staticRouteRegister";
import getStaticUrl from "./getStaticUrl";
import {routerWrapper} from "./utils";

export const history = createBrowserHistory();

export default function* () {
    yield takeEvery(NAVIGATE, onNavigate);
    yield takeEvery(NAVIGATE_EXTERNAL, onNavigateExternal);
    yield takeEvery(BACK, onBack);
}

// it seems browser will trigger initial path in listen too, but for initial page load, we want to call setPageByLocationDirectly
export function* startRouting() {
    const historyChannel = createHistoryChannel();
    yield takeLatest(historyChannel, loadPage);
}

export function* setPageByLocationDirectly(location) {
    const resolved = parseLocation(location);
    if (resolved) {
        yield call(loadPage, resolved, true);
    } else {
        yield call([history, history.push], "/", {replace: true});
    }
}

function createHistoryChannel() {
    return eventChannel((emitter) => {
        const unlisten = history.listen((location) => {
            const resolved = parseLocation(location);
            if (resolved) {
                emitter(resolved);
            } else {
                history.push("/", {replace: true});
            }
        });
        return () => unlisten();
    });
}

function* onNavigate({name, params, query, replace}) {
    yield call([history, history.push], getStaticUrl(name, params, query), {replace});
}

function* onNavigateExternal({url, query}) {
    const stringQuery = Object.keys(query).length > 0 ? `?${stringify(query)}` : "";
    yield window.location.href = `${url}${stringQuery}`;
}

let previousRouteClear = null;
let previousPageSagaTask = null;
let progressTask = null;

function* loadPage({name: newRoute, params = {}, query = {}}, initialLoad = false) {
    const currentRoute = yield select(getCurrentRoute);
    const currentParams = yield select(getCurrentParams);

    if (currentRoute !== newRoute || objectsShallowlyDifferent(currentParams, params)) {
        if (!initialLoad) {
            progressTask = yield fork(delayedProgressStart, 200);
        }
        try {
            const routes = getRegisteredRoutes();
            const {lazyPackage} = routes.get(newRoute);
            const addReducer = yield getContext("addReducer"); // from createProvider

            const {NAME, saga, reducer, Container} = yield call(lazyPackage);
            let packageSaga;
            if (!saga) {
                packageSaga = routerWrapper({});
            } else if (typeof saga === "function") {
                packageSaga = routerWrapper({
                    onPageEnter: saga,
                });
            } else {
                packageSaga = saga;
            }

            setComponent(newRoute, Container);
            if (reducer) {
                addReducer(NAME, reducer);
            }

            const [pageInitActions, dataPutActions] = yield all([
                call(packageSaga.initPageState, params, query),
                call(packageSaga.getDataForPage, params, query),
            ]);
            yield put([...pageInitActions, ...dataPutActions, routeEntered(newRoute, params, query)]);

            yield call(cancelPreviousSagaTask);
            yield call(cancelProgressTask);
            yield call(callPreviousPageClearIfDifferentRoute, currentRoute, newRoute, packageSaga.clearDataForPage);

            try {
                yield call(forkPageSaga, packageSaga.onPageEnter, params, query);
            } catch (e) {
                console.error(e);
            }
        } catch (e) {
            if (initialLoad) {
                // TODO :: redirect on error page
                yield call(loadPage, {name: ERROR});
                console.error(e);
            } else {
                yield put(back());
                yield put(notification.show("error.page.title", "error.page.text", notification.Types.FAILED));
                console.error(e);
            }
        } finally {
            yield call(cancelProgressTask);
        }
    }
}

function* callPreviousPageClearIfDifferentRoute(currentRoute, newRoute, clearDataForPage) {
    // if i am at the same route with different data, data are replaced.
    // Only if i go to different page type, clear data of previous that page;
    if (currentRoute && currentRoute !== newRoute) {
        if (previousRouteClear) {
            try {
                const clearActions = yield call(previousRouteClear);
                yield put(clearActions);
            } catch (e) {
                // TODO just ignore error in clear blocks?
            }
        }
        yield put(routeClear(currentRoute));
    }
    previousRouteClear = clearDataForPage;
}

function* cancelPreviousSagaTask() {
    if (previousPageSagaTask) {
        yield cancel(previousPageSagaTask);
        previousPageSagaTask = null;
    }
}

// new function to allow forkPageSaga to be forkable/catcheable
function* forkPageSaga(saga, params, query) {
    if (saga) {
        // Fork is here to avoid automatic cancellation (takeLatest). We want to cancel this saga after routeEntered(name, params, query)
        // to avoid page blinking when somebody is clearing some state on page saga cancellation (=backwards compatible behavior)
        previousPageSagaTask = yield fork(saga, params, query);
    }
}

export function* cancelProgressTask() {
    if (progressTask) {
        yield cancel(progressTask);
    }
    yield call([NProgress, NProgress.done]);
}

export function* delayedProgressStart(ms) {
    yield delay(ms);
    yield call([NProgress, NProgress.start]);
}

function* onBack({steps}) {
    yield call([history, history.go], -1 * steps);
}

function objectsShallowlyDifferent(firstObj, secondObj) {
    if ((typeof firstObj !== 'object' || firstObj === null || typeof secondObj !== 'object' || secondObj === null)) {
        return false;
    }

    return Object.entries(secondObj).some(([key, value]) => firstObj[key] !== value);
}

function parseLocation(location) {
    const routes = getRegisteredRoutes();
    const name = routes.findKey(({path}) => {
        const result = match(path, {decode: decodeURIComponent});
        return result(location.pathname) !== false;
    });
    if (!name) {
        return null;
    }
    const matchedObject = match(routes.get(name).path)(location.pathname);
    return {name, params: matchedObject.params, query: parse(location.search)};
}
