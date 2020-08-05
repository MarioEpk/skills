import queryString from "query-string";
import {compile} from "path-to-regexp";

import {getRegisteredRoutes} from "./staticRouteRegister";

export default (route, params = {}, query = {}) => {
    const routes = getRegisteredRoutes();
    const {path} = routes.get(route, {});
    const resolvedPath = compile(path)(params);
    const stringQuery = Object.keys(query).length > 0 ? `?${queryString.stringify(query)}` : "";
    return `${resolvedPath}${stringQuery}`;
};
