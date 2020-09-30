import React from "react";
import PropTypes from "prop-types";

import css from "./VerticalFormLayout.module.scss";

const VerticalFormLayout = ({title, children, buttons}) => (
    <form className={css.main}>
        <h1>{title}</h1>
        {children}
        <div className={css.buttons}>{buttons.map((button) => button)}</div>
    </form>
);

VerticalFormLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default VerticalFormLayout;
