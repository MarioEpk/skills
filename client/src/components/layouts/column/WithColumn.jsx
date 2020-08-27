import React from "react";
import PropTypes from "prop-types";

import css from "./WithColumn.module.scss";

const WithColumn = ({column, children}) => (
    <div className={css.withColumn}>
        <div className={css.column}>
            {column}
        </div>
        {children}
    </div>
);

WithColumn.proTypes = {
    children: PropTypes.node.isRequired,
    column: PropTypes.node.isRequired,
};

export default WithColumn;
