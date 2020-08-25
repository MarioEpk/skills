import {app} from "core/util";

import {NAME} from "./constants";

const getModel = app.createGetModel(NAME);

export const getTypes = (state) => getModel(state).get("types");
