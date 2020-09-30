import {Config} from "app/model/config";

const getConfig = () => Promise.resolve(Config.fromServer({locale: "en"}));

export default {
    getConfig,
};
