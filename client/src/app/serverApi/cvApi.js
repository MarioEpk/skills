import fetch from "core/fetch";
import {fn} from "core/util";
import {Cv} from "app/model/cv";
import {AllTypes} from "app/model/type";

const CV_URL = "/cv";

const addTypeToObject = (type) => (type ? type.map((item) => ({id: item})) : undefined);

const fetchCvForUser = (googleId, email, firstName, lastName) => fetch.doPost(`${CV_URL}/my`, {googleId, email, firstName, lastName}, fn.identity, Cv.fromServer);
const fetchCvs = () => fetch.doGet(CV_URL, null, Cv.fromServerList);
const fetchCv = (id) => fetch.doGet(`${CV_URL}/${id}`, null, Cv.fromServer);
const createCv = (email, firstName, lastName) => fetch.doPost(CV_URL, {email, firstName, lastName});
const updateCv = (
    id, userId, firstName, lastName, positions, profile, avatar,
) => fetch.doPut(CV_URL, {id, user: {id: userId, firstName, lastName}, avatar, profile, positions: positions.map((position) => ({id: position}))});
const deleteCv = (id) => fetch.doDelete(`${CV_URL}/${id}`);
const fetchMyCvId = () => fetch.doGet(`${CV_URL}/my-id`);
const exportCv = (id) => fetch.doGetPlain(`${CV_URL}/${id}/export`);
const exportCvToDoc = (id) => fetch.doGetPlain(`${CV_URL}/${id}/export/doc`);

const addLanguageToCv = (languageTypeId, cvId) => fetch.doPost(`${CV_URL}/${cvId}/language`, {languageType: {id: languageTypeId}});
const updateLanguage = (languageId, level) => fetch.doPut(`${CV_URL}/language`, {id: languageId, level});
const removeLanguageFromCv = (languageId) => fetch.doDelete(`${CV_URL}/language/${languageId}`);

const addSkillToCv = (skillTypeId, cvId) => fetch.doPost(`${CV_URL}/${cvId}/skill`, {skillType: {id: skillTypeId}});
const updateSkill = (skillId, level) => fetch.doPut(`${CV_URL}/skill`, {id: skillId, level});
const removeSkillFromCv = (skillId) => fetch.doDelete(`${CV_URL}/skill/${skillId}`);

const addTechnologyToCv = (technologyTypeId, cvId) => fetch.doPost(`${CV_URL}/${cvId}/technology`, {technologyType: {id: technologyTypeId}});
const updateTechnology = (technologyId, level) => fetch.doPut(`${CV_URL}/technology`, {id: technologyId, level});
const removeTechnologyFromCv = (technologyId) => fetch.doDelete(`${CV_URL}/technology/${technologyId}`);

const addCertificateToCv = ({name, description, date}, cvId) => fetch.doPost(`${CV_URL}/${cvId}/certificate`, {name, date, description});
const updateCertificate = ({id, name, description, date}) => fetch.doPut(`${CV_URL}/certificate`, {id, name, date, description});
const removeCertificateFromCv = (certificateId) => fetch.doDelete(`${CV_URL}/certificate/${certificateId}`);

const addOtherToCv = ({name, description, date}, cvId) => fetch.doPost(`${CV_URL}/${cvId}/other`, {name, date, description});
const updateOther = ({id, name, description, date}) => fetch.doPut(`${CV_URL}/other`, {id, name, date, description});
const removeOtherFromCv = (otherId) => fetch.doDelete(`${CV_URL}/other/${otherId}`);

const addProjectToCv = (
    {from, to, company, contribution, positions, projectType, technologies}, cvId,
) => fetch.doPost(`${CV_URL}/${cvId}/project`, {from, to, company, contribution, positions: addTypeToObject(positions), projectType, technologies: addTypeToObject(technologies)});
const updateProject = (
    {id, from, to, company, contribution, positions, projectType, technologies},
) => fetch.doPut(`${CV_URL}/project`, {id, from, to, company, contribution, positions: addTypeToObject(positions), projectType, technologies: addTypeToObject(technologies)});
const removeProjectFromCv = (projectId) => fetch.doDelete(`${CV_URL}/project/${projectId}`);

const fetchAllTypes = () => fetch.doGet(`${CV_URL}/types`, null, AllTypes.fromServer);

const shareCv = (cvId) => fetch.doPut(`${CV_URL}/${cvId}/share`);

export default {
    fetchCvForUser,
    fetchCvs,
    fetchCv,
    createCv,
    updateCv,
    deleteCv,
    fetchMyCvId,
    exportCv,
    exportCvToDoc,

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

    fetchAllTypes,

    shareCv
};
