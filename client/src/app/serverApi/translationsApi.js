// TODO show how to deal with multiple languages? (Assets lucis)
const getTranslations = () => import(/* webpackChunkName: "cs" */ "translations/cs.yaml").then((mod) => mod.default);

export default {
    getTranslations,
};
