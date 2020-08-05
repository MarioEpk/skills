import {combineReducers} from "redux-immutable";
import {List} from "immutable";

import {app} from "core/util";
import router from "core/router";
import {PAGE2} from "app/constants";

import {SET_ROWS} from "./actions";

export default combineReducers({
    rows: app.createDataReducer(SET_ROWS, List(), router.isThisRouteCleared(PAGE2)),
});
