import {Record} from 'immutable';

const Locale = Record({id: null, languageCode: null});

export default Object.freeze({
    en: new Locale({id: 'en', languageCode: ''}),
});
