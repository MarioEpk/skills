import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import auth from "core/auth";
import {Button} from "components";
import i18n from "core/i18n";

const Logout = ({onLogoutSuccess}) => {
    const {t} = i18n.useTranslation();

    return (
        <Button
            onClick={() => onLogoutSuccess()}
            type={Button.type.LIGHT}
            label={t(`navigation.logout.label`)}
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
