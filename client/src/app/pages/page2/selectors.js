import {app} from "core/util";

import {NAME} from "./constants";

const getModel = app.createGetModel(NAME);

export const getRows = (state) => getModel(state).get("rows");
