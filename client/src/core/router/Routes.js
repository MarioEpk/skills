import React from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import invariant from "invariant";

import {getCurrentRoute, getCurrentParams} from "./selectors";
import {getRegisteredRoutes} from "./staticRouteRegister";

const Component = ({currentRoute, currentParams}) => {
    const currentRouteDefinition = getRegisteredRoutes().get(currentRoute);
    invariant(currentRouteDefinition, "No route to display!");
    invariant(currentRouteDefinition.Container, "Accessed route has no Container component!");
    return <currentRouteDefinition.Container {...currentParams} />;
};

Component.propTypes = {
    currentRoute: PropTypes.string.isRequired,
    currentParams: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    currentRoute: getCurrentRoute(state),
    currentParams: getCurrentParams(state),
});

export default connect(mapStateToProps)(Component);
