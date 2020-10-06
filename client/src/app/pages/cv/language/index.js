import {NAME} from "./constants";
import reducer from "./reducer";
import {getLanguages, getUsedLanguageTypesId} from "./selectors";
import {addLanguageToCv} from "./actions";
import createSaga from "./createSaga";

export {default as Language} from "./Container";

export default {
    NAME,
    reducer,
    createSaga,
    getLanguages,
    addLanguageToCv,
    getUsedLanguageTypesId,
};
