import React from "react";
import PropTypes from "prop-types";
import ButtonUI from '@material-ui/core/Button';
import classnames from "classnames";
import invariant from "invariant";

import css from "./Button.module.scss";

const Button = ({onClick, label, href, children, type, startIcon, submit}) => {
    invariant(label || children, "label or children must be present");
    const buttonClassname = classnames(css.button, css.normalize, {
        [css.dark]: type === Button.type.DARK,
        [css.light]: type === Button.type.LIGHT,
        [css.colored]: type === Button.type.COLORED,
        [css.danger]: type === Button.type.DANGER,
    });
    return (
        <ButtonUI
            disableElevation
            onClick={onClick}
            className={buttonClassname}
            href={href}
            startIcon={startIcon}
            type={submit ? "submit" : undefined}
        >
            {label || children}
        </ButtonUI>
    );
};

Button.type = Object.freeze({
    LIGHT: "light",
    DARK: "dark",
    DANGER: "danger",
    COLORED: "colored",
});

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    children: PropTypes.node,
    href: PropTypes.string,
    type: PropTypes.oneOf(Object.values(Button.type)),
    startIcon: PropTypes.node,
    submit: PropTypes.bool,
};

Button.defaultProps = {
    href: undefined,
    children: null,
    label: null,
    type: Button.type.DARK,
    onClick: undefined,
    startIcon: null,
    submit: false,
};

export default Button;
