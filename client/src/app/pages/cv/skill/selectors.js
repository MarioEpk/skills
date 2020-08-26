import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getSkills = (state) => getParentModel(state).get(NAME);
