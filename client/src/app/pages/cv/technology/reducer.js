import {List} from "immutable";

import {cvActionGroup} from "../actions";

export default (state = new List(), action) => {
    switch (action.type) {
        case (cvActionGroup.FETCH_SUCCESS): return action.payload.technologies;
        case (cvActionGroup.FETCH_FAIL): return new List();
        default: return state;
    }
};
