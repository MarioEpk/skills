import {NAME, availableTypes, availableTypesArray} from './constants';
import reducer from "./reducer";

import {fetchDataForAllTypes, fetchDataForType, removeItemFromType, getApiForType} from './utils';
import {getType, getTypes, getForceDeleteConfirmationId} from './selectors';
import {createTypeActionGroup} from './actions';

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
    getTypes,
    getForceDeleteConfirmationId,
    createTypeActionGroup,
};
