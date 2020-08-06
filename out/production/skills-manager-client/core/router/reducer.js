import {combineReducers} from "redux-immutable";

import {ROUTE_ENTERED} from "./actions";

const activeRoute = (state = null, {type, name}) => {
    switch (type) {
        case ROUTE_ENTERED:
            return name;
        default:
            return state;
    }
};

const activeRouteParams = (state = {}, {type, params}) => {
    switch (type) {
        case ROUTE_ENTERED:
            return params;
        default:
            return state;
    }
};

export default combineReducers({
    activeRoute,
    activeRouteParams,
});
