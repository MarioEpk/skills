import {combineReducers} from "redux-immutable";
import {List} from "immutable";

import {createTypeActionGroup} from "./actions";
import {availableTypesArray} from "./constants";


const removeConfirmationRequested = (state = false, action) => {
    const actions = createTypeActionGroup(action);
    switch (action.type) {
        case (actions.FORCE_DELETE_CONFIRMATION): return action.payload.forceDeleteConfirmationRequested;
        default: return state;
    }
};

export default combineReducers(availableTypesArray.reduce((reducers, name) => {
    const actions = createTypeActionGroup(name);
    return {
        ...reducers,
        removeConfirmationRequested,
        [name]: (state = List(), action) => {
            switch (action.type) {
                case (actions.FETCH_SUCCESS): return action.payload;
                case (actions.FETCH_FAIL): return List();
                default: return state;
            }
        },
    };
}, {}));
