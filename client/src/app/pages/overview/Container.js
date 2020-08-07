import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IPropTypes from "react-immutable-proptypes";
import {GoogleLogin, GoogleLogout} from 'react-google-login';

import {Button} from "components";
import {Row} from "app/model/test";
import {compose} from "core/form";
import notification from "core/notification";
import router from "core/router";
import {PageTitle} from "app/containers";
import {PAGE2} from "app/constants";
import {getTestData} from "./selectors";
import {testDataActionGroup} from "./actions";

const responseGoogle = (response) => {
    console.log(response);
};

const Container = ({onPage2, testData, fetchTestData, showNotification}) => (
    <>
        <PageTitle title="Overview" />
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn
        />
        <GoogleLogout clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} />
    </>
);

Container.propTypes = {
    onPage2: PropTypes.func.isRequired,
    testData: IPropTypes.listOf(Row).isRequired,
    fetchTestData: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    testData: getTestData(state),
});

const mapDispatchToProps = (dispatch) => ({
    onPage2: () => dispatch(router.navigate(PAGE2)),
    fetchTestData: () => dispatch(testDataActionGroup.request()),
    showNotification: (...params) => dispatch(notification.show(...params)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Container);
