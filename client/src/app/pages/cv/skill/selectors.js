import {createSelector} from "reselect";
import {List} from "immutable";

import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getSkills = (state) => getParentModel(state).get(NAME);
export const getUsedSkillTypesId = createSelector(
    getSkills,
    (skills) => (skills && skills.size > 0 ? skills.map((skill) => skill.getIn(["skillType", "id"])) : List()),
);
