import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import router from "core/router";
import notification from "core/notification";
import init from "core/init";

import {OVERVIEW, PAGE2, PAGE_FORM} from "./constants";

const Container = ({initialized}) => (
    <>
        {initialized && (
            <div>
                <router.Link route={OVERVIEW}>PAGE1</router.Link>
                {" "}
                |
                {" "}
                <router.Link route={PAGE2}>PAGE2</router.Link>
                {" "}
                |
                {" "}
                <router.Link route={PAGE_FORM} params={{id: 1}}>PAGE_FORM 1</router.Link>
                {" "}
                |
                {" "}
                <router.Link route={PAGE_FORM} params={{id: 2}}>PAGE_FORM 2</router.Link>
            </div>
        )}
        {initialized && <router.Routes />}
        {initialized && <notification.Container />}
    </>
);

Container.propTypes = {
    initialized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    initialized: init.isInitialized(state),
});

export default connect(mapStateToProps)(Container);
