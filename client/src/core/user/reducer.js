import {combineReducers} from "redux-immutable";
import {Record} from "immutable";

import auth from "core/auth";

const userByGoogle = (state = Record({}), {type, user}) => {
    switch (type) {
        case auth.authActionGroup.REQUEST_SUCCESS:
            return user;
        case auth.authActionGroup.REQUEST_FAIL:
        case auth.LOGOUT:
            return Record({});
        default:
            return state;
    }
};

export default combineReducers({
    userByGoogle,
});
