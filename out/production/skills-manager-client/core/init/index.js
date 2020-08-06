import {NAME} from './constants';
import reducer from './reducer';
import {initialize} from "./actions";
import {isInitialized} from "./selectors";

export default {
    NAME,
    reducer,
    initialize,
    isInitialized,
};
