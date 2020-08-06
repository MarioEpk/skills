import {combineReducers} from "redux-immutable";

import {SHOW, HIDE} from "./actions";

const show = (state = false, {type}) => {
    switch (type) {
        case SHOW:
            return true;
        case HIDE:
            return false;
        default:
            return state;
    }
};

const title = (state = "", {type, payload}) => {
    switch (type) {
        case SHOW:
            return payload.title;
        case HIDE:
            return "";
        default:
            return state;
    }
};

const text = (state = "", {type, payload}) => {
    switch (type) {
        case SHOW:
            return payload.text;
        case HIDE:
            return "";
        default:
            return state;
    }
};

const notificationType = (state = "", {type, payload}) => {
    switch (type) {
        case SHOW:
            return payload.type;
        case HIDE:
            return "";
        default:
            return state;
    }
};

export default combineReducers({
    show,
    title,
    text,
    notificationType,
});
