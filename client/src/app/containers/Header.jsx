import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import auth from "core/auth";
import {compose} from "core/form";
import {Header as HeaderComponent} from "components";
import Login from "./Login";
import Logout from "./Logout";
import Navigation from "./Navigation";

const Header = ({isAuthenticated}) => (
    <HeaderComponent
        isAuthenticated={isAuthenticated}
        login={<Login />}
        logout={<Logout />}
        navigation={<Navigation />}
    />
);

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: auth.isAuthenticated(state),
});

export default compose(
    connect(mapStateToProps),
)(Header);
