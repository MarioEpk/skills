import React from "react";
import PropTypes from "prop-types";

import css from "./Main.module.scss";

const Main = ({isAuthenticated, header, children}) => (
    <div className={css.main}>
        {header}
        {children}
    </div>
);

Main.proTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    header: PropTypes.node.isRequired,
};

export default Main;
