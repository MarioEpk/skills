import React from "react";
import PropTypes from "prop-types";

import css from "./Flex.module.scss";

const Flex = ({vertical, children}) => (<div className={vertical ? css.vertical : css.horizontal}>{children}</div>);

Flex.propTypes = {
    children: PropTypes.node.isRequired,
    vertical: PropTypes.bool.isRequired,
};

export default Flex;
