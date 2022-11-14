import React from "react";
import {connect} from "react-redux";
import {GoogleLogout} from "react-google-login";
import PropTypes from "prop-types";

import auth from "core/auth";
import {Button} from "components";
import i18n from "core/i18n";

const Logout = ({onLogoutSuccess}) => {
    const {t} = i18n.useTranslation();

    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
                <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type={Button.type.LIGHT}
                    label={t(`navigation.logout.label`)}
                />
            )}
            onLogoutSuccess={onLogoutSuccess}
        />
    );
};

Logout.propTypes = {
    onLogoutSuccess: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: () => dispatch(auth.logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
