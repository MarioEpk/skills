import React from "react";
import {GoogleLogin} from "react-google-login";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import auth from "core/auth";
import {compose} from "core/form";

const Login = ({onLoginSuccess, onLoginFailure}) => (
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={(response) => onLoginSuccess(response.tokenId)}
        onFailure={onLoginFailure}
        isSignedIn
    />
);

Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
    onLoginFailure: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onLoginSuccess: (token) => dispatch(auth.authActionGroup.requestSuccess(token)),
    onLoginFailure: () => dispatch(auth.authActionGroup.requestFailure()),
});

export default compose(
    connect(null, mapDispatchToProps),
)(Login);
