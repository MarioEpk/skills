import React from 'react';
import PropTypes from "prop-types";

import classnames from "classnames";

import css from './Loading.module.scss';

const Loading = ({children, loading}) => {
    const classes = classnames(css.root, {
        [css.loading]: loading,
    });
    return (
        <div className={classes}>
            {children}
        </div>
    );
};

Loading.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool.isRequired,
};

Loading.defaultProps = {
    children: null,
};

export default Loading;
