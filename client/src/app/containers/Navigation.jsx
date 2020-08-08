import React from "react";

import router from "core/router";
import {Navigation as NavigationComponent} from "components";

import {OVERVIEW, PAGE2, PAGE_FORM} from "../constants";

const Navigation = () => (
    <NavigationComponent
        links={[
            <router.Link key="nav1" route={OVERVIEW}>PAGE1</router.Link>,
            <router.Link key="nav2" route={PAGE2}>PAGE2</router.Link>,
            <router.Link key="nav3" route={PAGE_FORM} params={{id: 1}}>PAGE_FORM 1</router.Link>,
            <router.Link key="nav4" route={PAGE_FORM} params={{id: 2}}>PAGE_FORM 2</router.Link>,
        ]}
    />
);

export default Navigation;
