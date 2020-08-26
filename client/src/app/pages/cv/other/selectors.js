import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getOthers = (state) => getParentModel(state).get(NAME);
