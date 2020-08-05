import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import {render} from "react-dom";

import "./index.scss";

import router from "./core/router";
import {getAppReducers, createAppSaga, createProvider, corePackages} from "./core";
import {saga, Container, routes} from "./app";

const reducers = getAppReducers(corePackages);
const mainSaga = createAppSaga(corePackages, saga);
const Root = createProvider(reducers, mainSaga);
router.registerRoutes(routes);

const App = () => (
    <Root>
        <Container />
    </Root>
);

render(<App />, document.getElementById("app"));
