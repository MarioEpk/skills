import {List} from "immutable";
import {combineReducers} from "redux-immutable";

import {cvActionGroup} from "../actions";

const projects = (state = new List(), action) => {
    switch (action.type) {
        case (cvActionGroup.FETCH_SUCCESS): return action.payload.projects;
        case (cvActionGroup.FETCH_FAIL): return new List();
        default: return state;
    }
};

export default combineReducers({
    projects,
});
