import {combineReducers} from "redux-immutable";
import {List} from "immutable";

import {cvActionGroup} from "./actions";

const data = (state = List(), action) => {
    switch (action.type) {
        case (cvActionGroup.FETCH_SUCCESS): return action.payload;
        case (cvActionGroup.FETCH_FAIL): return List();
        default: return state;
    }
};

export default combineReducers({
    data,
});
