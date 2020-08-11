import React from "react";
import PropTypes from "prop-types";

import css from "./TwoColumns.module.scss";

const TwoColumns = ({left, right}) => (
    <div className={css.twoColumns}>
        {left}
        {right}
    </div>
);

TwoColumns.proTypes = {
    left: PropTypes.node.isRequired,
    right: PropTypes.node.isRequired,
};

export default TwoColumns;
