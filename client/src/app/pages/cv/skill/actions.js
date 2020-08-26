import {NAME} from "./constants";

export const ADD_SKILL_TO_CV = `${NAME}/ADD_SKILL_TO_CV`;
export const UPDATE_SKILL = `${NAME}/UPDATE_SKILL`;
export const REMOVE_SKILL_FROM_CV = `${NAME}/REMOVE_SKILL_FROM_CV`;

export const addSkillToCv = (id) => ({
    type: ADD_SKILL_TO_CV,
    payload: id,
});

export const updateSkill = (id, level) => ({
    type: UPDATE_SKILL,
    payload: {id, level},
});

export const removeSkillFromCv = (id) => ({
    type: REMOVE_SKILL_FROM_CV,
    payload: id,
});
