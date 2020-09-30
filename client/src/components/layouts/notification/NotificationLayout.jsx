import React from "react";
import PropTypes from "prop-types";

import css from "./NotificationLayout.module.scss";

const NotificationLayout = ({children}) => (
    <div className={css.main}>
        {children}
    </div>
);

NotificationLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NotificationLayout;
