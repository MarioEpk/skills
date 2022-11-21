import {app} from "core/util";

import {NAME} from './constants';

const getModel = app.createGetModel(NAME);
export const getType = (state, type) => getModel(state).get(type);
