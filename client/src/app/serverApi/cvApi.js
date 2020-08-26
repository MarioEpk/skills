import fetch from "core/fetch";
import {fn} from "core/util";
import {Cv} from "app/model/cv";

const fetchCvForUser = (googleId, email, firstName, lastName) => fetch.doPost("/cv/my", {googleId, email, firstName, lastName}, fn.identity, Cv.fromServer);
const fetchCvs = () => fetch.doGet("/cv", null, Cv.fromServerList);
const fetchCv = (id) => fetch.doGet(`/cv/${id}`, null, Cv.fromServer);
const createCv = (googleEmail, firstName, lastName) => fetch.doPost("/cv", {googleEmail, firstName, lastName});
const updateCv = (id, firstName, lastName, profile) => fetch.doPut("/cv", {id, user: {firstName, lastName}, profile});
const deleteCv = (id) => fetch.doDelete(`/cv/${id}`);
const fetchMyCvId = () => fetch.doGet("/cv/my-id");

const addLanguageToCv = (languageTypeId, cvId) => fetch.doPost(`/cv/${cvId}/language`, {languageType: {id: languageTypeId}});
const updateLanguage = (languageId, level) => fetch.doPut("/cv/language", {id: languageId, level});
const removeLanguageFromCv = (languageId) => fetch.doDelete(`/cv/language/${languageId}`);

const addSkillToCv = (skillTypeId, cvId) => fetch.doPost(`/cv/${cvId}/skill`, {skillType: {id: skillTypeId}});
const updateSkill = (skillId, level) => fetch.doPut("/cv/skill", {id: skillId, level});
const removeSkillFromCv = (skillId) => fetch.doDelete(`/cv/skill/${skillId}`);

const addTechnologyToCv = (technologyTypeId, cvId) => fetch.doPost(`/cv/${cvId}/technology`, {technologyType: {id: technologyTypeId}});
const updateTechnology = (technologyId, level) => fetch.doPut("/cv/technology", {id: technologyId, level});
const removeTechnologyFromCv = (technologyId) => fetch.doDelete(`/cv/technology/${technologyId}`);

const addCertificateToCv = ({name, description, date}, cvId) => fetch.doPost(`/cv/${cvId}/certificate`, {name, date, description});
const updateCertificate = ({id, name, description, date}) => fetch.doPut("/cv/certificate", {id, name, date, description});
const removeCertificateFromCv = (certificateId) => fetch.doDelete(`/cv/certificate/${certificateId}`);

const addOtherToCv = ({name, description, date}, cvId) => fetch.doPost(`/cv/${cvId}/other`, {name, date, description});
const updateOther = ({id, name, description, date}) => fetch.doPut("/cv/other", {id, name, date, description});
const removeOtherFromCv = (otherId) => fetch.doDelete(`/cv/other/${otherId}`);

const addProjectToCv = ({from, to, company, contribution, positionTypes}, cvId) => fetch.doPost(`/cv/${cvId}/project`, {from, to, company, contribution, positionTypes});
const updateProject = ({id, from, to, company, contribution, positionTypes}) => fetch.doPut("/cv/project", {id, from, to, company, contribution, positionTypes});
const removeProjectFromCv = (projectId) => fetch.doDelete(`/cv/project/${projectId}`);

export default {
    fetchCvForUser,
    fetchCvs,
    fetchCv,
    createCv,
    updateCv,
    deleteCv,
    fetchMyCvId,

    addLanguageToCv,
    updateLanguage,
    removeLanguageFromCv,

    addSkillToCv,
    updateSkill,
    removeSkillFromCv,

    addTechnologyToCv,
    updateTechnology,
    removeTechnologyFromCv,

    addCertificateToCv,
    updateCertificate,
    removeCertificateFromCv,

    addOtherToCv,
    updateOther,
    removeOtherFromCv,

    addProjectToCv,
    updateProject,
    removeProjectFromCv,
};
