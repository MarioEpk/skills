import React from "react";
import PropTypes from "prop-types";

import css from "./Main.module.scss";

const Main = ({isAuthenticated, header, children}) => (
    <div className={css.main}>
        {header}
        {isAuthenticated && children}
    </div>
);

Main.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    header: PropTypes.node.isRequired,
};

export default Main;
