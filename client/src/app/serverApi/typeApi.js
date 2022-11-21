import fetch from "core/fetch";
import {Type, Project, AllTypes} from "app/model/type";

const LANGUAGE_URL = "/types/language";
const SKILL_URL = "/types/skill";
const TECHNOLOGY_URL = "/types/technology";
const PROJECT_URL = "/types/project";
const POSITION_URL = "/types/position";

const fetchLanguageTypes = () => fetch.doGet(LANGUAGE_URL, null, Type.fromServerList);
const createLanguageType = ({name}) => fetch.doPost(LANGUAGE_URL, {name});
const updateLanguageType = ({id, name}) => fetch.doPut(LANGUAGE_URL, {id, name});
const deleteLanguageType = ({id, forceRemove = false}) => fetch.doDelete(`${LANGUAGE_URL}/${id}`, {force: `${forceRemove}`});

const fetchSkillTypes = () => fetch.doGet(SKILL_URL, null, Type.fromServerList);
const createSkillType = ({name}) => fetch.doPost(SKILL_URL, {name});
const updateSkillType = ({id, name}) => fetch.doPut(SKILL_URL, {id, name});
const deleteSkillType = ({id, forceRemove = false}) => fetch.doDelete(`${SKILL_URL}/${id}`, {force: `${forceRemove}`});

const fetchTechnologyTypes = () => fetch.doGet(TECHNOLOGY_URL, null, Type.fromServerList);
const createTechnologyType = ({name}) => fetch.doPost(TECHNOLOGY_URL, {name});
const updateTechnologyType = ({id, name}) => fetch.doPut(TECHNOLOGY_URL, {id, name});
const deleteTechnologyType = ({id, forceRemove = false}) => fetch.doDelete(`${TECHNOLOGY_URL}/${id}`, {force: `${forceRemove}`});

const fetchProjectTypes = () => fetch.doGet(PROJECT_URL, null, Project.fromServerList);
const createProjectType = ({name, description, technologies, exportName}) => (
    fetch.doPost(PROJECT_URL, {name, description, technologies: technologies.map((technology) => ({id: technology})), exportName}));
const updateProjectType = ({id, name, description, technologies, exportName}) => (
    fetch.doPut(PROJECT_URL, {id, name, description, technologies: technologies.map((technology) => ({id: technology})), exportName}));
const deleteProjectType = ({id, forceRemove = false}) => fetch.doDelete(`${PROJECT_URL}/${id}`, {force: `${forceRemove}`});

const fetchPositionTypes = () => fetch.doGet(POSITION_URL, null, Type.fromServerList);
const createPositionType = ({name}) => fetch.doPost(POSITION_URL, {name});
const updatePositionType = ({id, name}) => fetch.doPut(POSITION_URL, {id, name});
const deletePositionType = ({id, forceRemove = false}) => fetch.doDelete(`${POSITION_URL}/${id}`, {force: `${forceRemove}`});

const fetchAllTypes = () => fetch.doGet(`/types`, null, AllTypes.fromServer);

export default {
    fetchLanguageTypes,
    createLanguageType,
    updateLanguageType,
    deleteLanguageType,

    fetchSkillTypes,
    createSkillType,
    updateSkillType,
    deleteSkillType,

    fetchTechnologyTypes,
    createTechnologyType,
    updateTechnologyType,
    deleteTechnologyType,

    fetchProjectTypes,
    createProjectType,
    updateProjectType,
    deleteProjectType,

    fetchPositionTypes,
    createPositionType,
    updatePositionType,
    deletePositionType,

    fetchAllTypes,
};
