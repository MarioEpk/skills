import {app} from "core/util";

import {NAME} from './constants';

const getModel = app.createGetModel(NAME);

export const getCurrentRoute = (state) => getModel(state).get("activeRoute");
export const getCurrentParams = (state) => getModel(state).get("activeRouteParams");
