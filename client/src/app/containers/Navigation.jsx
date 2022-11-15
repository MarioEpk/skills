import React from "react";

import {Access, accesses} from "core/access";
import router from "core/router";
import {Navigation as NavigationComponent} from "components";
import i18n from "core/i18n";

import {ADMINISTRATION, OVERVIEW, MY_CV} from "../constants";

const Navigation = () => {
    const {t} = i18n.useTranslation();

    return (
        <NavigationComponent
            links={[
                <router.Link key={`key_${MY_CV}`} route={MY_CV}>{t(`navigation.cv.label`)}</router.Link>,
                <Access key={`key_${OVERVIEW}`} accesses={[accesses.business, accesses.admin]}>
                    <router.Link route={OVERVIEW}>{t(`navigation.overview.label`)}</router.Link>
                </Access>,
                <Access key={`key_${ADMINISTRATION}`} accesses={[accesses.admin]}>
                    <router.Link route={ADMINISTRATION}>{t(`navigation.administration.label`)}</router.Link>
                </Access>,
            ]}
        />
    );
};

export default Navigation;
