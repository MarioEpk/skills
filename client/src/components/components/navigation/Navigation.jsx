import React from 'react';
import PropTypes from "prop-types";

import css from './Navigation.module.scss';

const Navigation = ({links}) => (
    <div className={css.navigation}>
        {links.map((link) => link)}
    </div>
);

Navigation.propTypes = {
    links: PropTypes.arrayOf(PropTypes.node),
};

Navigation.defaultProps = {
    links: [],
};

export default Navigation;
