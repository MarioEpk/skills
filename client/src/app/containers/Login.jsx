import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import auth from "core/auth";
import {GoogleLogin} from '@react-oauth/google';

const Login = ({onLoginRequest, onLoginFailure}) => {
    return (
        <GoogleLogin
            theme="filled_black"
            onSuccess={(credentialResponse) => {onLoginRequest(credentialResponse)}}
            onError={() => onLoginFailure({})}
        />
    );
};

Login.propTypes = {
    onLoginRequest: PropTypes.func.isRequired,
    onLoginFailure: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onLoginRequest: (request) => dispatch(auth.authActionGroup.request(request)),
    onLoginFailure: (response) => dispatch(auth.authActionGroup.requestFailure(response)),
});

export default connect(null, mapDispatchToProps)(Login);
