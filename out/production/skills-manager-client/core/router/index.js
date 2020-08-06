import {NAME} from './constants';
import {navigate, navigateExternal, back, ROUTE_ENTERED} from "./actions";
import Routes from "./Routes";
import saga, {setPageByLocationDirectly, history, startRouting, delayedProgressStart, cancelProgressTask} from "./saga";
import reducer from "./reducer";
import {registerRoutes} from "./staticRouteRegister";
import LinkPlain from "./LinkPlain";
import Link from "./Link";
import {getCurrentRoute} from "./selectors";
import {isThisRouteCleared, routerWrapper} from "./utils";

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
};
export default router;
