import {NAME} from './constants';
import saga from "./saga";
import {getUserImageUrl} from "./selectors";
import reducer from "./reducer";

export default {
    NAME,
    saga,
    reducer,
    getUserImageUrl,
};
