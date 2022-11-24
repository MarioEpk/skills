import React from "react";
import PropTypes from "prop-types";

import css from "./Toolbar.module.scss";

const Toolbar = ({children}) => (
    <div className={css.toolbar}>
        {children}
    </div>
);

Toolbar.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Toolbar;
