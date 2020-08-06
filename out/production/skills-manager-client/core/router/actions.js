import {NAME} from './constants';

export const ROUTE_ENTERED = `${NAME}/ROUTE_ENTERED`;
export const ROUTE_CLEAR = `${NAME}/ROUTE_CLEAR`;
export const NAVIGATE = `${NAME}/NAVIGATE`;
export const NAVIGATE_EXTERNAL = `${NAME}/NAVIGATE_EXTERNAL`;
export const BACK = `${NAME}/BACK`;

export const routeEntered = (name, params, query) => ({
    type: ROUTE_ENTERED,
    name,
    params,
    query,
});

export const routeClear = (name) => ({
    type: ROUTE_CLEAR,
    name,
});

export const navigate = (name, params = {}, query = {}, replace = false) => ({
    type: NAVIGATE,
    name,
    params,
    query,
    replace,
});

export const navigateExternal = (url, query = {}) => ({
    type: NAVIGATE_EXTERNAL,
    url,
    query,
});

export const back = (steps = 1) => ({
    type: BACK,
    steps,
});
