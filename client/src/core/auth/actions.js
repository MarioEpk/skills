import {NAME} from './constants';

export const LOGOUT = `${NAME}/LOGOUT`;

export const logout = () => ({
    type: LOGOUT,
});

export const authActionGroup = (() => {
    const AUTH_FAIL = `${NAME}/AUTH/FAILURE`;
    const AUTH_SUCCESS = `${NAME}/AUTH/SUCCESS`;
    return ({
        REQUEST_FAIL: AUTH_FAIL,
        REQUEST_SUCCESS: AUTH_SUCCESS,
        requestFailure: () => ({
            type: AUTH_FAIL,
        }),
        requestSuccess: (authToken) => ({
            type: AUTH_SUCCESS,
            authToken,
        }),
    });
})();
