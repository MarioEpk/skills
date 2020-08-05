import {fn} from "core/util";
import {ROUTE_CLEAR} from "./actions";

export const isThisRouteCleared = (route) => (action) => action.type === ROUTE_CLEAR && action.name === route;

export const routerWrapper = ({
    initPageState = () => [],
    onPageEnter = fn.noop,
    getDataForPage = () => [],
    clearDataForPage = () => [],
}) => ({
    initPageState,
    onPageEnter,
    getDataForPage,
    clearDataForPage,
});
