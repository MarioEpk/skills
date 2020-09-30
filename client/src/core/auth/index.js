import {NAME} from './constants';
import {authActionGroup, logout, LOGOUT, saveToken} from "./actions";
import {getToken, isAuthenticated} from "./selectors";
import reducer from "./reducer";

const auth = {
    NAME,
    reducer,
    authActionGroup,
    getToken,
    logout,
    isAuthenticated,
    saveToken,
    LOGOUT,
};
export default auth;
