import {app} from "core/util";
import {NAME} from './constants';

const getModel = app.createGetModel(NAME);

export const isOpen = (state, name) => !!getModel(state).get(name);
