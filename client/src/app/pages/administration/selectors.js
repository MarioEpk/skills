import {app} from "core/util";

import {NAME} from "./constants";

const getModel = app.createGetModel(NAME);

export const getTypeData = (state, type) => getModel(state).get(type);

export const forceDeleteConfirmationRequested = (state) => {
    alert(getModel(state).get("forceDeleteConfirmationRequested"));
    return getModel(state).get("forceDeleteConfirmationRequested");
};
