import fetch from "core/fetch";
import {Type, Project, AllTypes} from "app/model/type";

const LANGUAGE_URL = "/type/language";
const SKILL_URL = "/type/skill";
const TECHNOLOGY_URL = "/type/technology";
const PROJECT_URL = "/type/project";
const POSITION_URL = "/type/position";

const fetchLanguageTypes = () => fetch.doGet(LANGUAGE_URL, null, Type.fromServerList);
const createLanguageType = ({name}) => fetch.doPost(LANGUAGE_URL, {name});
const updateLanguageType = ({id, name}) => fetch.doPut(LANGUAGE_URL, {id, name});
const deleteLanguageType = ({id}) => fetch.doDelete(`${LANGUAGE_URL}/${id}`);

const fetchSkillTypes = () => fetch.doGet(SKILL_URL, null, Type.fromServerList);
const createSkillType = ({name}) => fetch.doPost(SKILL_URL, {name});
const updateSkillType = ({id, name}) => fetch.doPut(SKILL_URL, {id, name});
const deleteSkillType = ({id}) => fetch.doDelete(`${SKILL_URL}/${id}`);

const fetchTechnologyTypes = () => fetch.doGet(TECHNOLOGY_URL, null, Type.fromServerList);
const createTechnologyType = ({name}) => fetch.doPost(TECHNOLOGY_URL, {name});
const updateTechnologyType = ({id, name}) => fetch.doPut(TECHNOLOGY_URL, {id, name});
const deleteTechnologyType = ({id}) => fetch.doDelete(`${TECHNOLOGY_URL}/${id}`);

const fetchProjectTypes = () => fetch.doGet(PROJECT_URL, null, Project.fromServerList);
const createProjectType = ({name, description, technologies, exportName}) => (
    fetch.doPost(PROJECT_URL, {name, description, technologies: technologies.map((technology) => ({id: technology})), exportName})
);
const updateProjectType = ({id, name, description, technologies, exportName}) => (
    fetch.doPut(PROJECT_URL, {id, name, description, technologies: technologies.map((technology) => ({id: technology})), exportName})
);
const deleteProjectType = ({id}) => fetch.doDelete(`${PROJECT_URL}/${id}`);

const fetchPositionTypes = () => fetch.doGet(POSITION_URL, null, Type.fromServerList);
const createPositionType = ({name}) => fetch.doPost(POSITION_URL, {name});
const updatePositionType = ({id, name}) => fetch.doPut(POSITION_URL, {id, name});
const deletePositionType = ({id}) => fetch.doDelete(`${POSITION_URL}/${id}`);

const fetchAllTypes = () => fetch.doGet(`/type`, null, AllTypes.fromServer);

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
