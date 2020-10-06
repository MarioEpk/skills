import {createSelector} from "reselect";
import {List} from "immutable";

import {getModel as getParentModel} from "../selectors";
import {NAME} from "./constants";

export const getLanguages = (state) => getParentModel(state).get(NAME);
export const getUsedLanguageTypesId = createSelector(
    getLanguages,
    (languages) => (languages && languages.size > 0 ? languages.map((language) => language.getIn(["languageType", "id"])) : List()),
);
