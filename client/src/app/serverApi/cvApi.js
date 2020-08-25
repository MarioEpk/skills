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

const addLanguageToCv = (languageTypeId, cvId) => fetch.doPost(`/cv/${cvId}/add-language`, {languageType: {id: languageTypeId}});
const removeLanguageFromCv = (languageId) => fetch.doPost("/cv/remove-language", {id: languageId});

export default {
    fetchCvForUser,
    fetchCvs,
    fetchCv,
    createCv,
    updateCv,
    deleteCv,
    fetchMyCvId,

    addLanguageToCv,
    removeLanguageFromCv,
};
