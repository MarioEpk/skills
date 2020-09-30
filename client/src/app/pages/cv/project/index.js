import {MODAL_NAME, NAME} from "./constants";
import reducer from "./reducer";
import createSaga from "./createSaga";
import {openForm} from "./actions";

export {default as Project} from "./Container";

export default {
    NAME,
    MODAL_NAME,
    reducer,
    createSaga,
    openForm,
};
