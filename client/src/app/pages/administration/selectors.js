import {app} from "core/util";

import {NAME} from "./constants";

const getModel = app.createGetModel(NAME);

export const getTypeData = (state, type) => getModel(state).getIn([type, 'data']);

export const forceDeleteConfirmationId = (state, type) => getModel(state).getIn([type, 'forceDeleteConfirmationId']);
