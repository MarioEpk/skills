import {NAME} from './constants';
import {authActionGroup, logout} from "./actions";
import {getToken, getUserImageUrl, isAuthenticated} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

const auth = {
    NAME,
    reducer,
    authActionGroup,
    getToken,
    logout,
    isAuthenticated,
    saga,
    getUserImageUrl,
};
export default auth;
