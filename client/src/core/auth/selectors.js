import {app} from "core/util";
import {NAME} from './constants';

const getModel = app.createGetModel(NAME);

export const getToken = (state) => getModel(state).get("token");
export const isAuthenticated = (state) => getModel(state).get("isAuthenticated");
