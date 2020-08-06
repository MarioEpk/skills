import {useTranslation, withTranslation} from "react-i18next";

import {NAME} from './constants';
import instance from "./instance";

/**
 * INTERNATIONALIZATION MODULE

 * There is no support for switching yet, but it should be quite simple to add.
 *
 */
export default {
    NAME,
    useTranslation,
    withTranslation,
    addTranslations: (language, translations) => instance.addResourceBundle(language, 'translation', translations, true, false),
    changeLanguage: (lng) => new Promise((resolve) => instance.changeLanguage(lng, resolve)),
    translateDirectly: (key, ...args) => instance.t(key, args),
};
