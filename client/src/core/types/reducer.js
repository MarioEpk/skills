import {Map, List} from "immutable";
import {combineReducers} from "redux-immutable";
import {availableTypesArray} from "./constants";
import {createTypeActionGroup} from "./actions";

// Generic reducer for all types
export default combineReducers(availableTypesArray.reduce((reducers, name) => {
    const actions = createTypeActionGroup(name);
    return {
        ...reducers,
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
