import {NAME} from './constants';

export const LOGOUT = `${NAME}/LOGOUT`;
export const SAVE_TOKEN = `${NAME}/SAVE_TOKEN`;

export const logout = () => ({
    type: LOGOUT,
});

export const saveToken = (token) => ({
    type: SAVE_TOKEN,
    token,
});

export const authActionGroup = (() => {
    const AUTH_REQUEST = `${NAME}/AUTH/REQUEST`;
    const AUTH_FAIL = `${NAME}/AUTH/FAILURE`;
    const AUTH_SUCCESS = `${NAME}/AUTH/SUCCESS`;
    return ({
        REQUEST: AUTH_REQUEST,
        REQUEST_FAIL: AUTH_FAIL,
        REQUEST_SUCCESS: AUTH_SUCCESS,
        request: (request) => ({
            type: AUTH_REQUEST,
            request,
        }),
        requestFailure: () => ({
            type: AUTH_FAIL,
        }),
        requestSuccess: (user) => ({
            type: AUTH_SUCCESS,
            user,
        }),
    });
})();
