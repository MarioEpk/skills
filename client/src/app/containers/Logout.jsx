import React from "react";
import {GoogleLogout} from "react-google-login";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import auth from "core/auth";
import {Button} from "components";

const Logout = ({onLogoutSuccess}) => (
    <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
            <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type={Button.type.LIGHT}
                label="Logout"
            />
        )}
        onLogoutSuccess={onLogoutSuccess}
    />
);

Logout.propTypes = {
    onLogoutSuccess: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: () => dispatch(auth.logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
