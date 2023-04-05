import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import {render} from "react-dom";
import {GoogleOAuthProvider} from '@react-oauth/google';

import router from "./core/router";
import {corePackages, createAppSaga, createProvider, getAppReducers} from "./core";
import {Container, routes, saga} from "./app";
import "./index.scss";

const reducers = getAppReducers(corePackages);
const mainSaga = createAppSaga(corePackages, saga);
const Root = createProvider(reducers, mainSaga);
router.registerRoutes(routes);

const App = () => (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Root>
            <Container />
        </Root>
    </GoogleOAuthProvider>
);

render(<App />, document.getElementById("app"));
