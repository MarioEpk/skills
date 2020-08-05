import {reducer} from 'redux-form/immutable';
import {combineReducers} from "redux-immutable";

export default combineReducers({
    form: reducer,
});
