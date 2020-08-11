import {combineReducers} from "redux-immutable";
import {Record} from "immutable";

import {authActionGroup, LOGOUT} from "./actions";

const isAuthenticated = (state = false, {type}) => {
    switch (type) {
        case authActionGroup.REQUEST_SUCCESS:
            return true;
        case authActionGroup.REQUEST_FAIL:
        case LOGOUT:
            return false;
        default:
            return state;
    }
};

const token = (state = null, {type, authToken}) => {
    switch (type) {
        case authActionGroup.REQUEST_SUCCESS:
            return authToken;
        case authActionGroup.REQUEST_FAIL:
        case LOGOUT:
            return null;
        default:
            return state;
    }
};

const userByGoogle = (state = Record({}), {type, user}) => {
    switch (type) {
        case authActionGroup.REQUEST_SUCCESS:
            return user;
        case authActionGroup.REQUEST_FAIL:
        case LOGOUT:
            return Record({});
        default:
            return state;
    }
};

export default combineReducers({
    isAuthenticated,
    token,
    userByGoogle,
});
