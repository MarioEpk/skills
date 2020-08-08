import React from "react";
import {GoogleLogout} from "react-google-login";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import auth from "core/auth";
import {compose} from "core/form";

const Logout = ({onLogoutSuccess}) => (
    <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onLogoutSuccess={onLogoutSuccess}
    />
);

Logout.propTypes = {
    onLogoutSuccess: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: () => dispatch(auth.logout()),
});

export default compose(
    connect(null, mapDispatchToProps),
)(Logout);
