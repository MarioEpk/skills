import {all, fork, call} from 'redux-saga/effects';

import {fn} from "core/util";

/**
 * @param backgroundSagaPackages - array of either objects with shape {saga}, or arrays of shape [{saga}, param].
 *      If array, will pass second element as an argument to saga.
 */
export default (backgroundSagaPackages, initSaga, initSagaArguments = {}) => function* () {
    const sagas = backgroundSagaPackages.map(((pckg) => {
        if (Array.isArray(pckg)) {
            return fork(pckg[0].saga, pckg[1]);
        }
        if (pckg.saga) {
            return fork(pckg.saga);
        }
        return fn.noop;
    }));

    yield all(sagas);
    if (initSaga) {
        yield call(initSaga, initSagaArguments);
    }
};
