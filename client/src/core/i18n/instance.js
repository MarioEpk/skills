import i18next from 'i18next';
import {initReactI18next} from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        // debug: true,
        keySeparator: false,
        parseMissingKeyHandler: (key) => `(${key})`,
        lng: "en",
    });

// eslint-disable-next-line no-unused-vars
i18next.on('languageChanged', (lng) => {
    // set locale to libraries (moment) which needs them
});

export default i18next;
