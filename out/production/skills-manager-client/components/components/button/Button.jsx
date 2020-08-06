import React from "react";
import PropTypes from "prop-types";

import css from "./Button.module.scss";

const Button = ({onClick, label}) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events
    <a onClick={onClick} className={css.myButton}>{label}</a>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default Button;
