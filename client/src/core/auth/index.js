import {NAME} from './constants';
import {authActionGroup, logout} from "./actions";
import {getToken, isAuthenticated} from "./selectors";
import reducer from "./reducer";

const auth = {
    NAME,
    reducer,
    authActionGroup,
    getToken,
    logout,
    isAuthenticated,
};
export default auth;
