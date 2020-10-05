import React from "react";
import PropTypes from "prop-types";

import css from "./Unathorized.module.scss";

const Unauthorized = ({img}) => (
    <div className={css.main}>
        {img}
    </div>
);

Unauthorized.propTypes = {
    img: PropTypes.node.isRequired,
};

export default Unauthorized;
