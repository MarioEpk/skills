import {AsyncPackage} from "core";
import {accesses as coreAccesses} from "core/access";

import {
    ADMINISTRATION,
    CV,
    ERROR,
    MY_CV,
    OVERVIEW,
} from "./constants";

const createRoute = (name, path, loader, accesses) => ({[name]: {lazyPackage: AsyncPackage(loader), path, accesses}});

export default {
    ...createRoute(OVERVIEW, "/overview", () => import(/* webpackChunkName: "overview" */ './pages/overview'), [coreAccesses.admin, coreAccesses.business]),
    ...createRoute(ADMINISTRATION, "/administration", () => import(/* webpackChunkName: "administration" */ './pages/administration'), [coreAccesses.admin]),
    // If you don't have id in url, saga will load your cv based on logged user and then redirect to CV with id
    ...createRoute(MY_CV, "/", () => import(/* webpackChunkName: "cv" */ './pages/cv')),
    ...createRoute(CV, "/:id", () => import(/* webpackChunkName: "cv" */ './pages/cv')),
    ...createRoute(ERROR, "/error", () => import(/* webpackChunkName: "error" */ './pages/error')),
};
