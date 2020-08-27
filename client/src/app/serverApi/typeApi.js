import fetch from "core/fetch";
import {Type, Project, AllTypes} from "app/model/type";

const LANGUAGE_URL = "/type/language";
const SKILL_URL = "/type/skill";
const TECHNOLOGY_URL = "/type/technology";
const PROJECT_URL = "/type/project";

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
const createProjectType = ({name, description}) => fetch.doPost(PROJECT_URL, {name, description});
const updateProjectType = ({id, name, description}) => fetch.doPut(PROJECT_URL, {id, name, description});
const deleteProjectType = ({id}) => fetch.doDelete(`${PROJECT_URL}/${id}`);

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

    fetchAllTypes,
};
