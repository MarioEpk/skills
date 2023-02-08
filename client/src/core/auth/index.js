import {NAME} from './constants';
import {authActionGroup, logout, LOGOUT, saveToken} from "./actions";
import {getAutoLogin, getToken, isAuthenticated} from "./selectors";
import reducer from "./reducer";

const auth = {
    NAME,
    reducer,
    authActionGroup,
    getToken,
    logout,
    isAuthenticated,
    saveToken,
    getAutoLogin,
    LOGOUT,
};
export default auth;
