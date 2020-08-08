import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {GoogleLogin, GoogleLogout} from 'react-google-login';

import {Button} from "components";
import {compose} from "core/form";
import auth from "core/auth";
import {PageTitle} from "app/containers";
import {getTestData} from "./selectors";
import {testDataActionGroup} from "./actions";

const Container = ({fetchTestData, onLoginSuccess, onLoginFailure, onLogoutSuccess}) => (
    <>
        <PageTitle title="Overview" />
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={(response) => onLoginSuccess(response.tokenId)}
            onFailure={onLoginFailure}
            isSignedIn
        />
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onLogoutSuccess={onLogoutSuccess}
        />
        <Button onClick={fetchTestData} label="Get test data" />
    </>
);

Container.propTypes = {
    fetchTestData: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
    onLoginFailure: PropTypes.func.isRequired,
    onLogoutSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    testData: getTestData(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchTestData: () => dispatch(testDataActionGroup.request()),
    onLoginSuccess: (token) => dispatch(auth.authActionGroup.requestSuccess(token)),
    onLoginFailure: () => dispatch(auth.authActionGroup.requestFailure()),
    onLogoutSuccess: () => dispatch(auth.logout())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
