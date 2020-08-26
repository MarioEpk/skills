import {NAME} from "./constants";
import reducer from "./reducer";
import {getTechnologies} from "./selectors";
import {addTechnologyToCv} from "./actions";
import createSaga from "./createSaga";

export {default as Technology} from "./Container";

export default {
    NAME,
    reducer,
    createSaga,
    getTechnologies,
    addTechnologyToCv,
};
