import {NAME} from './constants';
import {authActionGroup, logout, LOGOUT} from "./actions";
import {getToken, isAuthenticated} from "./selectors";
import reducer from "./reducer";

const auth = {
    NAME,
    reducer,
    authActionGroup,
    getToken,
    logout,
    isAuthenticated,
    LOGOUT,
};
export default auth;
