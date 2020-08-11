import React from "react";

import router from "core/router";
import {Navigation as NavigationComponent} from "components";

import {OVERVIEW, CV, PAGE_FORM} from "../constants";

const Navigation = () => (
    <NavigationComponent
        links={[
            <router.Link key="nav1" route={OVERVIEW}>Page 1</router.Link>,
            <router.Link key="nav2" route={CV}>Page 2</router.Link>,
            <router.Link key="nav3" route={PAGE_FORM} params={{id: 1}}>Page form 1</router.Link>,
            <router.Link key="nav4" route={PAGE_FORM} params={{id: 2}}>Page form 2</router.Link>,
        ]}
    />
);

export default Navigation;
