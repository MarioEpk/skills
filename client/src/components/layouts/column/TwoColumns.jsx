import React from "react";
import PropTypes from "prop-types";

import css from "./TwoColumns.module.scss";

const TwoColumns = ({left, right}) => (
    <div className={css.twoColumns}>
        {left && (
            <div>
                {left}
            </div>
        )}
        {right && (
            <div>
                {right}
            </div>
        )}
    </div>
);

TwoColumns.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
};

TwoColumns.defaultProps = {
    left: null,
    right: null,
};

export default TwoColumns;
