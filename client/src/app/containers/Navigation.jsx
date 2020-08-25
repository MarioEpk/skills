import React from "react";

import router from "core/router";
import {Navigation as NavigationComponent} from "components";

import {ADMINISTRATION, OVERVIEW, MY_CV} from "../constants";

const Navigation = () => (
    <NavigationComponent
        links={[
            <router.Link key={`key_${MY_CV}`} route={MY_CV}>Můj životopis</router.Link>,
            <router.Link key={`key_${OVERVIEW}`} route={OVERVIEW}>Přehled</router.Link>,
            <router.Link key={`key_${ADMINISTRATION}`} route={ADMINISTRATION}>Administrace</router.Link>,
        ]}
    />
);

export default Navigation;
