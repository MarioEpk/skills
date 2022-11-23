import {combineReducers} from "redux-immutable";
import {List} from "immutable";

import {overviewActionGroup} from "./actions";

const data = (state = List(), action) => {
    switch (action.type) {
        case (overviewActionGroup.FETCH_SUCCESS): return action.payload;
        case (overviewActionGroup.FETCH_FAIL): return List();
        default: return state;
    }
};

export default combineReducers({
    data,
});
