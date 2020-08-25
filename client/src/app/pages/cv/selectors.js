import {app} from "core/util";

import {NAME} from "./constants";

export const getModel = app.createGetModel(NAME);

export const getTypes = (state) => getModel(state).get("types");
