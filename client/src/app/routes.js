import {AsyncPackage} from "core";

import {
    ADMINISTRATION,
    ERROR,
    OVERVIEW,
} from "./constants";

const createRoute = (name, path, loader) => ({[name]: {lazyPackage: AsyncPackage(loader), path}});

export default {
    ...createRoute(OVERVIEW, "/", () => import(/* webpackChunkName: "overview" */ './pages/overview')),
    ...createRoute(ADMINISTRATION, "/administration", () => import(/* webpackChunkName: "administration" */ './pages/administration')),
    ...createRoute(ERROR, "/error", () => import(/* webpackChunkName: "error" */ './pages/error')),
};
