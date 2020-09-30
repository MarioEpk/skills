import React from "react";

import {Access, accesses} from "core/access";
import router from "core/router";
import {Navigation as NavigationComponent} from "components";

import {ADMINISTRATION, OVERVIEW, MY_CV} from "../constants";

const Navigation = () => (
    <NavigationComponent
        links={[
            <router.Link key={`key_${MY_CV}`} route={MY_CV}>My CV</router.Link>,
            <Access key={`key_${OVERVIEW}`} accesses={[accesses.business, accesses.admin]}>
                <router.Link route={OVERVIEW}>Overview</router.Link>
            </Access>,
            <Access key={`key_${ADMINISTRATION}`} accesses={[accesses.admin]}>
                <router.Link route={ADMINISTRATION}>Administration</router.Link>
            </Access>,
        ]}
    />
);

export default Navigation;
