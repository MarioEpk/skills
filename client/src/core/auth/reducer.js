import {combineReducers} from "redux-immutable";

import {authActionGroup, LOGOUT, SAVE_TOKEN} from "./actions";

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

const token = (state = null, {type, token: authToken}) => {
    switch (type) {
        case SAVE_TOKEN:
            return authToken;
        case authActionGroup.REQUEST_FAIL:
        case LOGOUT:
            return null;
        default:
            return state;
    }
};

export default combineReducers({
    isAuthenticated,
    token,
});
