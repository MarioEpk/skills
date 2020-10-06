import React from 'react';
import PropTypes from 'prop-types';

import errorImage from 'resources/images/skills-manager-error.png';

import css from "./ErrorScreen.module.scss";

const ErrorScreen = ({error}) => (
    <div className={css.main}>
        <img src={errorImage} alt={error} />
    </div>
);

ErrorScreen.propTypes = {
    error: PropTypes.string.isRequired,
};

export default ErrorScreen;
