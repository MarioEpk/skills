import React from "react";
import PropTypes from "prop-types";

import css from "./Notification.module.scss";

const Notification = ({title}) => (
    <div className={css.main}>
        {title}
    </div>
);

Notification.propTypes = {
    title: PropTypes.string.isRequired,
};

Notification.types = Object.freeze({
    DANGER: "danger",
    INFO: "info",
    SUCCESS: "success",
    FAILED: "failed",
});

export default Notification;
