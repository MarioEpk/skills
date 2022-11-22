import {combineReducers} from "redux-immutable";
import {List, Map} from "immutable";

import {createTypeActionGroup} from "./actions";
import {availableTypesArray} from "./constants";

export default combineReducers(availableTypesArray.reduce((reducers, name) => {
    const actions = createTypeActionGroup(name);
    return {
        ...reducers,
        // forceDeleteConfirmationId,
        [name]: (state = Map(), action) => {
            switch (action.type) {
                case (actions.FETCH_SUCCESS): return state.set("data", action.payload);
                case (actions.FETCH_FAIL): return state.set("data", List());
                case (actions.FORCE_DELETE_CONFIRMATION): return state.set("forceDeleteConfirmationId", action.payload.forceDeleteConfirmationId);
                default: return state;
            }
        },
    };
}, {}));
