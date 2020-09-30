import {app} from "core/util";

import {NAME} from "./constants";

export const getModel = app.createGetModel(NAME);

export const getTypes = (state) => getModel(state).get("types");
export const getTypePositions = (state) => getTypes(state).get("positions");
export const getTypeTechnologies = (state) => getTypes(state).get("technologies");
export const getTypeProjects = (state) => getTypes(state).get("projects");
