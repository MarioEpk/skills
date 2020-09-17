import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import css from "./Notification.module.scss";

const Notification = ({title, type, text}) => (
    <div className={classnames(css.main, css[type])}>
        {title}
        {text && <div className={css.text}>{text}</div>}
    </div>
);

Notification.types = Object.freeze({
    DANGER: "danger",
    INFO: "info",
    SUCCESS: "success",
    FAILED: "failed",
});

Notification.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.oneOf(Object.values(Notification.types)),
};

Notification.defaultProps = {
    text: null,
    type: Notification.types.INFO,
};

export default Notification;
