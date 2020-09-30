import React from "react";
import {GoogleLogin} from "react-google-login";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import auth from "core/auth";
import {Button} from "components";

const Login = ({onLoginRequest, onLoginFailure}) => (
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
            <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type={Button.type.LIGHT}
                label="Login"
            />
        )}
        onSuccess={(response) => onLoginRequest(response)}
        onFailure={onLoginFailure}
        isSignedIn
    />
);

Login.propTypes = {
    onLoginRequest: PropTypes.func.isRequired,
    onLoginFailure: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onLoginRequest: (request) => dispatch(auth.authActionGroup.request(request)),
    onLoginFailure: (response) => dispatch(auth.authActionGroup.requestFailure(response)),
});

export default connect(null, mapDispatchToProps)(Login);
