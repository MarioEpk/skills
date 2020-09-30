// TODO show how to deal with multiple languages? (Assets lucis)
const getTranslations = () => import(/* webpackChunkName: "en" */ "translations/en.yaml").then((mod) => mod.default);

export default {
    getTranslations,
};
