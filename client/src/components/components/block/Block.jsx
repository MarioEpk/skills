import React from "react";
import PropTypes from "prop-types";

import css from "./Block.module.scss";

const Block = ({children}) => (
    <div className={css.block}>
        {children}
    </div>
);

Block.proTypes = {
    children: PropTypes.node.isRequired,
};

export default Block;
