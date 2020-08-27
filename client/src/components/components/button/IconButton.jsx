import React from "react";
import PropTypes from "prop-types";
import IconButtonUi from '@material-ui/core/IconButton';
import classnames from "classnames";

import css from "./Button.module.scss";

const IconButton = ({ariaLabel, type, icon, onClick}) => {
    const buttonClassname = classnames(css.button, css.normalize, {
        [css.dark]: type === IconButton.type.DARK,
        [css.light]: type === IconButton.type.LIGHT,
        [css.danger]: type === IconButton.type.DANGER,
    });
    return (
        <IconButtonUi
            onClick={onClick}
            className={buttonClassname}
            aria-label={ariaLabel}
        >
            {icon}
        </IconButtonUi>
    );
};

IconButton.type = Object.freeze({
    LIGHT: "light",
    DARK: "dark",
    DANGER: "danger",
});

IconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.values(IconButton.type)),
    icon: PropTypes.node.isRequired,
    ariaLabel: PropTypes.string.isRequired,
};

IconButton.defaultProps = {
    type: IconButton.type.DARK,
};

export default IconButton;
