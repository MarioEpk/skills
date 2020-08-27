import superagent from 'superagent';
import {CANCEL} from 'redux-saga';
import {call, select} from 'redux-saga/effects';
import auth from 'core/auth';
import {fn} from "core/util";

import RequestError from "./RequestError";
import UnauthorizedError from "./UnauthorizedError";

const urlWithPrefix = (url) => process.env.REACT_APP_API_URL + url;

export const PRECOGNITION_FAILED = 412;

export const getDefaultHeaders = function* () {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };
    const token = yield select(auth.getToken);
    const tokenHeaders = token ? {Authorization: `Bearer ${token}`} : {};
    return {
        ...defaultHeaders,
        ...tokenHeaders,
    };
};

const execute = (request) => {
    const promise = request.then(
        (response) => response.body,
        (error) => {
            if (error.status === 401) {
                throw new UnauthorizedError();
            } else if (error.status) {
                // Apparently, superagent returns (json?) parse error here. Original response is in field "rawResponse".
                if (error.rawResponse) {
                    /* eslint-disable no-console */
                    console.warn(error.rawResponse);
                    /* eslint-disable no-console */
                }
                throw new RequestError(error, request.method !== "GET");
            } else {
                // some weird errors here, plus terminated by browser
                console.error(error);
                throw new RequestError({status: 500, response: {body: "some weird error here. See console output before this"}}, request.method !== "GET");
            }
        },
    );
    promise[CANCEL] = () => request.abort();
    return promise;
};

const wrapExecute = function* (request, resultProcessMethod) {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = yield call(execute, request);
        return resultProcessMethod(result);
    } catch (error) {
        throw error;
    }
};

export const doGet = function* (url, queryParams, resultProcessMethod = fn.identity) {
    const defaultHeaders = yield getDefaultHeaders();
    const request = superagent
        .get(urlWithPrefix(url))
        .set(defaultHeaders)
        .query(queryParams)
        .accept('json');
    return yield* wrapExecute(request, resultProcessMethod);
};

export const doGetPlain = function (url) {
    return superagent
        .get(urlWithPrefix(url))
        .then(
            (response) => response.text,
            (error) => {
                throw new RequestError(error, false);
            },
        );
};

export const doPut = function* (url, body, requestProcessMethod = fn.identity, resultProcessMethod = fn.identity, queryParams = {}) {
    const defaultHeaders = yield getDefaultHeaders();
    const request = superagent
        .put(urlWithPrefix(url))
        .set(defaultHeaders)
        .send(requestProcessMethod(body))
        .query(queryParams)
        .type('json')
        .accept('json');
    return yield* wrapExecute(request, resultProcessMethod);
};

export const doPost = function* (url, body, requestProcessMethod = fn.identity, resultProcessMethod = fn.identity, queryParams = {}) {
    const defaultHeaders = yield getDefaultHeaders();
    const request = superagent
        .post(urlWithPrefix(url))
        .set(defaultHeaders)
        .send(requestProcessMethod(body))
        .query(queryParams)
        .type('json')
        .accept('json');
    return yield* wrapExecute(request, resultProcessMethod);
};

export const doDelete = function* (url, resultProcessMethod = fn.identity) {
    const defaultHeaders = yield getDefaultHeaders();
    const request = superagent
        .delete(urlWithPrefix(url))
        .set(defaultHeaders)
        .accept('json');
    return yield* wrapExecute(request, resultProcessMethod);
};

/**
 * utility for mocking delayed apis.
 * export const myCall = () => fetch.timeoutPromise("ok", 2000);
 */
export const timeoutPromise = (result, timeout) => new Promise((accept) => {
    setTimeout(() => {
        accept(result);
    }, timeout);
});
