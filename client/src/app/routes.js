import {AsyncPackage} from "core";

import {
    ADMINISTRATION,
    ERROR,
} from "./constants";

const createRoute = (name, path, loader) => ({[name]: {lazyPackage: AsyncPackage(loader), path}});

export default {
    ...createRoute(ADMINISTRATION, "/administration", () => import(/* webpackChunkName: "page1" */ './pages/administration')),
    ...createRoute(ERROR, "/error", () => import(/* webpackChunkName: "error" */ './pages/error')),
};
