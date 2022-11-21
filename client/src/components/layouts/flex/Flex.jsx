import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import css from "./Flex.module.scss";

const Flex = ({vertical, gap, children}) => (<div className={classnames(css.flex, {[css.vertical]: vertical})} style={{gap: gap ?? "0"}}>{children}</div>);

Flex.propTypes = {
    children: PropTypes.node.isRequired,
    vertical: PropTypes.bool,
    gap: PropTypes.string,
};

Flex.defaultProps = {
    gap: undefined,
    vertical: false,
};

export default Flex;
