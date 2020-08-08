import React from 'react';
import PropTypes from "prop-types";

import css from './Header.module.scss';

const Header = ({navigation, login, logout, isAuthenticated}) => (
    <div className={css.header}>
        {navigation}
        {isAuthenticated ? logout : login}
    </div>
);

Header.propTypes = {
    navigation: PropTypes.node.isRequired,
    login: PropTypes.node.isRequired,
    logout: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

};

export default Header;
