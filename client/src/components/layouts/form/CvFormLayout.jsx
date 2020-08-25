import React from "react";
import PropTypes from "prop-types";

import css from "./CvFormLayout.module.scss";
import {TwoColumns} from "../column";

const CvFormLayout = ({leftColumn, children, image}) => {
    const leftColumnComponent = <div className={css.leftColumn}>{leftColumn}</div>;
    return (
        <div>
            <div className={css.twoColumnsSection}>
                <TwoColumns left={leftColumnComponent} right={image} />
            </div>
            {children}
        </div>
    );
};

CvFormLayout.propTypes = {
    children: PropTypes.node.isRequired,
    leftColumn: PropTypes.node.isRequired,
    image: PropTypes.node.isRequired,
};

export default CvFormLayout;
