import {AsyncPackage} from "core";

import {
    OVERVIEW,
    PAGE2,
    PAGE_FORM,
    ERROR,
} from "./constants";

const createRoute = (name, path, loader) => ({[name]: {lazyPackage: AsyncPackage(loader), path}});

export default {
    ...createRoute(OVERVIEW, "/", () => import(/* webpackChunkName: "page1" */ './pages/overview')),
    ...createRoute(PAGE2, "/page2", () => import(/* webpackChunkName: "page2" */ './pages/page2')),
    ...createRoute(PAGE_FORM, "/form/:id", () => import(/* webpackChunkName: "form" */ './pages/form')),
    ...createRoute(ERROR, "/error", () => import(/* webpackChunkName: "error" */ './pages/error')),
};
