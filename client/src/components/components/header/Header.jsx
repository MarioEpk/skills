import React from 'react';
import PropTypes from "prop-types";

import css from './Header.module.scss';

const Header = ({
    navigation, login, logout, isAuthenticated, userImageUrl,
}) => (
    <div className={css.header}>
        <div className={css.navigationSection}>
            <h1>
                <span>MORO</span>
                <span>ŽIVOTOPIS</span>
            </h1>
            {isAuthenticated && navigation}
        </div>
        <div className={css.userSection}>
            {isAuthenticated ? logout : login}
            {userImageUrl && <img className={css.image} src={userImageUrl} alt="user" />}
        </div>
    </div>
);

Header.propTypes = {
    navigation: PropTypes.node.isRequired,
    login: PropTypes.node.isRequired,
    logout: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userImageUrl: PropTypes.string,
};

Header.defaultProps = {
    userImageUrl: null,
};

export default Header;
