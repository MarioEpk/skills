import {AsyncPackage} from "core";

import {
    ADMINISTRATION,
    CV,
    ERROR,
    MY_CV,
    OVERVIEW,
} from "./constants";

const createRoute = (name, path, loader) => ({[name]: {lazyPackage: AsyncPackage(loader), path}});

export default {
    ...createRoute(OVERVIEW, "/overview", () => import(/* webpackChunkName: "overview" */ './pages/overview')),
    ...createRoute(ADMINISTRATION, "/administration", () => import(/* webpackChunkName: "administration" */ './pages/administration')),
    // If you don't have id in url, saga will load your cv based on logged user and then redirect to CV with id
    ...createRoute(MY_CV, "/", () => import(/* webpackChunkName: "cv" */ './pages/cv')),
    ...createRoute(CV, "/:id", () => import(/* webpackChunkName: "cv" */ './pages/cv')),
    ...createRoute(ERROR, "/error", () => import(/* webpackChunkName: "error" */ './pages/error')),
};
