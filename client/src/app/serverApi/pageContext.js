import {Config} from "app/model/config";
// import {fetch} from "core/util";

// const getConfig = () => fetch.doGet(`/api/config`, null, Config.fromServer);
const getConfig = () => Promise.resolve(Config.fromServer({locale: "cs_CZ"}));

export default {
    getConfig,
};
