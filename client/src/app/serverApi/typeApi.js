import fetch from "core/fetch";
import {Type, Project, AllTypes} from "app/model/type";

const fetchLanguageTypes = () => fetch.doGet("/type/language", null, Type.fromServerList);
const createLanguageType = ({name}) => fetch.doPost("/type/language", {name});
const updateLanguageType = ({id, name}) => fetch.doPut("/type/language", {id, name});
const deleteLanguageType = ({id}) => fetch.doDelete(`/type/language/${id}`);

const fetchSkillTypes = () => fetch.doGet("/type/skill", null, Type.fromServerList);
const createSkillType = ({name}) => fetch.doPost("/type/skill", {name});
const updateSkillType = ({id, name}) => fetch.doPut("/type/skill", {id, name});
const deleteSkillType = ({id}) => fetch.doDelete(`/type/skill/${id}`);

const fetchTechnologyTypes = () => fetch.doGet("/type/technology", null, Type.fromServerList);
const createTechnologyType = ({name}) => fetch.doPost("/type/technology", {name});
const updateTechnologyType = ({id, name}) => fetch.doPut("/type/technology", {id, name});
const deleteTechnologyType = ({id}) => fetch.doDelete(`/type/technology/${id}`);

const fetchProjectTypes = () => fetch.doGet("/type/project", null, Project.fromServerList);
const createProjectType = ({name, description}) => fetch.doPost("/type/project", {name, description});
const updateProjectType = ({id, name, description}) => fetch.doPut("/type/project", {id, name, description});
const deleteProjectType = ({id}) => fetch.doDelete(`/type/project/${id}`);

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
