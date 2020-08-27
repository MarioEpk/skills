import React from "react";

import router from "core/router";
import {Navigation as NavigationComponent} from "components";

import {ADMINISTRATION, OVERVIEW} from "../constants";

const Navigation = () => (
    <NavigationComponent
        links={[
            <router.Link key="nav1" route={OVERVIEW}>Přehled</router.Link>,
            <router.Link key="nav2" route={ADMINISTRATION}>Administrace</router.Link>,
        ]}
    />
);

export default Navigation;
