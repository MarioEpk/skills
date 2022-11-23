import {app} from "core/util";
import types from "core/types";

import {NAME} from "./constants";

export const getModel = app.createGetModel(NAME);

export const getTypes = (state) => types.getTypes(state);
export const getTypePositions = (state) => types.getType(state, types.availableTypes.POSITION);
export const getTypeTechnologies = (state) => types.getType(state, types.availableTypes.TECHNOLOGY);
export const getTypeProjects = (state) => types.getType(state, types.availableTypes.PROJECT);
