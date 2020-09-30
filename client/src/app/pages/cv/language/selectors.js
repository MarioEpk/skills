import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getLanguages = (state) => getParentModel(state).get(NAME);
