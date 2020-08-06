import {Record} from 'immutable';

const Locale = Record({id: null, languageCode: null});

export default Object.freeze({
    cs_CZ: new Locale({id: 'cs_CZ', languageCode: 'CS'}),
});
