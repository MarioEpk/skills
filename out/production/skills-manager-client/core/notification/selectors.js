import {app} from "core/util";

import {NAME} from "./constants";

const getModel = app.createGetModel(NAME);

export const getShow = (state) => getModel(state).get("show");
export const getTitle = (state) => getModel(state).get("title");
export const getText = (state) => getModel(state).get("text");
export const getType = (state) => getModel(state).get("notificationType");
