import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import router from "core/router";
import notification from "core/notification";
import auth from "core/auth";
import init from "core/init";
import {MainLayout} from "components";
import {Header} from "app/containers";

const Container = ({initialized, isAuthenticated}) => (
    <>
        <MainLayout
            isAuthenticated={isAuthenticated}
            header={<Header />}
        >
            {initialized && <router.Routes />}
        </MainLayout>
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
