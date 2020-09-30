import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getTechnologies = (state) => getParentModel(state).get(NAME);
