import {CLOSE} from "./actions";

export const closeModalMatcher = (modalName) => (action) => action.type === CLOSE
    && action.payload === modalName;
