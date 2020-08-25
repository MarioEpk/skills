import React from "react";
import PropTypes from "prop-types";

import css from "./CardLayout.module.scss";

const CardLayout = ({title, children}) => (
    <div className={css.main}>
        <h2>{title}</h2>
        <div className={css.grid}>
            {children}
        </div>
    </div>
);

CardLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default CardLayout;
