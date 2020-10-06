import {createSelector} from "reselect";
import {List} from "immutable";

import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getTechnologies = (state) => getParentModel(state).get(NAME);
export const getUsedTechnologyTypesId = createSelector(
    getTechnologies,
    (technologies) => (technologies && technologies.size > 0 ? technologies.map((technology) => technology.getIn(["technologyType", "id"])) : List()),
);
