import {AsyncPackage} from "core";

import {
    OVERVIEW,
    CV,
    PAGE_FORM,
    ERROR,
} from "./constants";

const createRoute = (name, path, loader) => ({[name]: {lazyPackage: AsyncPackage(loader), path}});

export default {
    ...createRoute(OVERVIEW, "/", () => import(/* webpackChunkName: "page1" */ './pages/overview')),
    ...createRoute(CV, "/cv", () => import(/* webpackChunkName: "page2" */ './pages/cv')),
    ...createRoute(PAGE_FORM, "/form/:id", () => import(/* webpackChunkName: "form" */ './pages/form')),
    ...createRoute(ERROR, "/error", () => import(/* webpackChunkName: "error" */ './pages/error')),
};
