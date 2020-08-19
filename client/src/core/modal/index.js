import {NAME} from './constants';
import {isOpen} from "./selectors";
import reducer from "./reducer";
import {open, close} from "./actions";

export default {
    NAME,
    reducer,
    isOpen,
    open,
    close,
};
