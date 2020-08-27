import {Config} from "app/model/config";

const getConfig = () => Promise.resolve(Config.fromServer({locale: "cs_CZ"}));

export default {
    getConfig,
};
