import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {GoogleLogin} from '@react-oauth/google';

import auth from "core/auth";

const Login = ({onLoginRequest, onLoginFailure, autoLogin}) => (
    <GoogleLogin
        theme="filled_black"
        onSuccess={(credentialResponse) => onLoginRequest(credentialResponse)}
        onError={() => onLoginFailure({})}
        useOneTap
        // This prop is for auto login and it will work only in useOneTap mode
        // But if you try to logout, it will log you in again,
        // therefor we have to disable it after first login
        // https://developers.google.com/identity/gsi/web/guides/automatic-sign-in-sign-out#sign-out
        auto_select={autoLogin}
    />
);

Login.propTypes = {
    onLoginRequest: PropTypes.func.isRequired,
    onLoginFailure: PropTypes.func.isRequired,
    autoLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    autoLogin: auth.getAutoLogin(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoginRequest: (request) => dispatch(auth.authActionGroup.request(request)),
    onLoginFailure: (response) => dispatch(auth.authActionGroup.requestFailure(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
