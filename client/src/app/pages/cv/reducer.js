import {combineReducers} from "redux-immutable";

import {AllTypes} from "app/model/type";

import language from "./language";
import skill from "./skill";
import technology from "./technology";
import certificate from "./certificate";
import other from "./other";
import {cvTypesActionGroup} from "./actions";

const types = (state = new AllTypes(), action) => {
    switch (action.type) {
        case (cvTypesActionGroup.FETCH_SUCCESS): return action.payload;
        case (cvTypesActionGroup.FETCH_FAIL): return new AllTypes();
        default: return state;
    }
};

export default combineReducers({
    types,
    [language.NAME]: language.reducer,
    [skill.NAME]: skill.reducer,
    [technology.NAME]: technology.reducer,
    [certificate.NAME]: certificate.reducer,
    [other.NAME]: other.reducer,
});
