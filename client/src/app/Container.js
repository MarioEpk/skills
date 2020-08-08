import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import router from "core/router";
import notification from "core/notification";
import auth from "core/auth";
import init from "core/init";
import {MainLayout} from "components";

import {OVERVIEW, PAGE2, PAGE_FORM} from "./constants";

const Container = ({initialized, isAuthenticated}) => (
    <>
        {initialized && (
            <MainLayout
                isAuthenticated={isAuthenticated}
                header={<div>header</div>}
            >
                <router.Link route={OVERVIEW}>PAGE1</router.Link>
                <router.Link route={PAGE2}>PAGE2</router.Link>
                <router.Link route={PAGE_FORM} params={{id: 1}}>PAGE_FORM 1</router.Link>
                <router.Link route={PAGE_FORM} params={{id: 2}}>PAGE_FORM 2</router.Link>
            </MainLayout>
        )}
        {initialized && <router.Routes />}
        {initialized && <notification.Container />}
    </>
);

Container.propTypes = {
    initialized: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    initialized: init.isInitialized(state),
    isAuthenticated: auth.isAuthenticated(state),
});

export default connect(mapStateToProps)(Container);
