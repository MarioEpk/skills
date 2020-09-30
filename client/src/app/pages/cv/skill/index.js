import {NAME} from "./constants";
import reducer from "./reducer";
import {getSkills} from "./selectors";
import {addSkillToCv} from "./actions";
import createSaga from "./createSaga";

export {default as Skill} from "./Container";

export default {
    NAME,
    reducer,
    createSaga,
    getSkills,
    addSkillToCv,
};
