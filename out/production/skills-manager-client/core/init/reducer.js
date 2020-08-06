import {combineReducers} from "redux-immutable";

import {INITIALIZE} from "./actions";

const initialized = (state = false, {type}) => (type === INITIALIZE ? true : state);

export default combineReducers({
    initialized,
});
