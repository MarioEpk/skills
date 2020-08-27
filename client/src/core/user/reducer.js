import {combineReducers} from "redux-immutable";

import auth from "core/auth";

const userByGoogle = (state = null, {type, user}) => {
    switch (type) {
        case auth.authActionGroup.REQUEST_SUCCESS:
            return user;
        case auth.authActionGroup.REQUEST_FAIL:
        case auth.LOGOUT:
            return null;
        default:
            return state;
    }
};

export default combineReducers({
    userByGoogle,
});
