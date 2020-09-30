import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getProjects = (state) => getParentModel(state).get(NAME).get("projects");
