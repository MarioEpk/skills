import React from "react";

import router from "core/router";
import {Navigation as NavigationComponent} from "components";

import {ADMINISTRATION} from "../constants";

const Navigation = () => (
    <NavigationComponent
        links={[
            <router.Link key="nav1" route={ADMINISTRATION}>Administration</router.Link>,
        ]}
    />
);

export default Navigation;
