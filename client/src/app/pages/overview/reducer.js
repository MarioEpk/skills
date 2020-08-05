import {combineReducers} from "redux-immutable";
import {List} from "immutable";

import {testDataActionGroup} from "./actions";

const testData = (state = List(), action) => {
    switch (action.type) {
        case (testDataActionGroup.REQUEST_SUCCESS): return action.payload;
        case (testDataActionGroup.REQUEST_FAIL): return List();
        default: return state;
    }
};

export default combineReducers({
    testData,
});
