import {NAME} from "./constants";

export const ADD_TECHNOLOGY_TO_CV = `${NAME}/ADD_TECHNOLOGY_TO_CV`;
export const UPDATE_TECHNOLOGY = `${NAME}/UPDATE_TECHNOLOGY`;
export const REMOVE_TECHNOLOGY_FROM_CV = `${NAME}/REMOVE_TECHNOLOGY_FROM_CV`;

export const addTechnologyToCv = (id) => ({
    type: ADD_TECHNOLOGY_TO_CV,
    payload: id,
});

export const updateTechnology = (id, level) => ({
    type: UPDATE_TECHNOLOGY,
    payload: {id, level},
});

export const removeTechnologyFromCv = (id) => ({
    type: REMOVE_TECHNOLOGY_FROM_CV,
    payload: id,
});
