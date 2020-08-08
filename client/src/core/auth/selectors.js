import {NAME} from './constants';

// TODO :: Cannot use app.createGetModel because circ. dep.
const getModel = (state) => state.get(NAME);

export const getToken = (state) => getModel(state).get("token");
export const isAuthenticated = (state) => getModel(state).get("isAuthenticated");
