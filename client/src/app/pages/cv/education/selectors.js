import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getEducations = (state) => getParentModel(state).get(NAME);
