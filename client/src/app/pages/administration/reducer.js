import {combineReducers} from "redux-immutable";
import {List} from "immutable";

import {createTypeActionGroup} from "./actions";
import {availableTypesArray} from "./constants";

export default combineReducers(availableTypesArray.reduce((reducers, name) => {
    const actions = createTypeActionGroup(name);
    console.log(actions);
    return {
        ...reducers,
        [name]: (state = List(), action) => {
            switch (action.type) {
                case (actions.FETCH_SUCCESS): return action.payload;
                case (actions.FETCH_FAIL): return List();
                default: return state;
            }
        },
    };
}, {}));
