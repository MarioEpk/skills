import {NAME} from './constants';
import {navigate, navigateExternal, back, ROUTE_ENTERED} from "./actions";
import Routes from "./Routes";
import saga, {setPageByLocationDirectly, startRouting, delayedProgressStart, cancelProgressTask} from "./saga";
import reducer from "./reducer";
import {registerRoutes} from "./staticRouteRegister";
import LinkPlain from "./LinkPlain";
import Link from "./Link";
import {getCurrentParams, getCurrentRoute} from "./selectors";
import {isThisRouteCleared, routerWrapper, history} from "./utils";

/**
 * ROUTER MODULE
 */
const router = {
    NAME,
    ROUTE_ENTERED,
    saga,
    Routes,
    registerRoutes,
    navigate,
    navigateExternal,
    goBack: back,
    Link,
    LinkPlain,
    getCurrentRoute,
    reducer,
    setPageByLocationDirectly,
    history,
    isThisRouteCleared,
    routerWrapper,
    startRouting,
    delayedProgressStart,
    cancelProgressTask,
    getCurrentParams,
};
export default router;
