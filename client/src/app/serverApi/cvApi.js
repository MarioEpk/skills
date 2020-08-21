import fetch from "core/fetch";
import {fn} from "core/util";
import {Cv} from "app/model/cv";

const fetchCvForUser = (googleId, email, firstName, lastName) => fetch.doPost("/cv/process", {googleId, email, firstName, lastName}, fn.identity, Cv.fromServer);
const fetchCvs = () => fetch.doGet("/cv", null, Cv.fromServerList);
const fetchCv = (id) => fetch.doGet(`/cv/${id}`, null, Cv.fromServer);
const createCv = (googleEmail, firstName, lastName) => fetch.doPut("/cv", {googleEmail, firstName, lastName});
const deleteCv = (id) => fetch.doDelete(`/cv/${id}`);

export default {
    fetchCvForUser,
    fetchCvs,
    fetchCv,
    createCv,
    deleteCv,
};
