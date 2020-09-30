import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import css from "./Block.module.scss";

const Block = ({children, className}) => (
    <div className={classnames({[className]: className}, css.block)}>
        {children}
    </div>
);

Block.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Block.defaultProps = {
    className: undefined,
};

export default Block;
