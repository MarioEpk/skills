import {NAME, availableTypes, availableTypesArray} from './constants';
import reducer from "./reducer";

import {fetchDataForAllTypes, fetchDataForType, removeItemFromType, getApiForType} from './utils';
import {getType} from './selectors';

export default {
    NAME,
    reducer,
    fetchDataForAllTypes,
    fetchDataForType,
    removeItemFromType,
    getApiForType,
    availableTypes,
    availableTypesArray,
    getType,
};
