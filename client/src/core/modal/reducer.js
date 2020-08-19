import {Map} from "immutable";

import {OPEN, CLOSE} from "./actions";

export default (state = Map(), {type, payload}) => {
    switch (type) {
        case OPEN:
            return state.set(payload, true);
        case CLOSE:
            return state.set(payload, false);
        default:
            return state;
    }
};
