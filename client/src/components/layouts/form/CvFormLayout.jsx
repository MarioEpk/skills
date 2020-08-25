import React from "react";
import PropTypes from "prop-types";

import css from "./CvFormLayout.module.scss";
import {TwoColumns} from "../column";

const CvFormLayout = ({leftColumn, children, title, image}) => {
    const leftColumnComponent = <div className={css.leftColumn}>{leftColumn}</div>;
    return (
        <div className={css.main}>
            <h1>{title}</h1>
            <div className={css.twoColumnsSection}>
                <TwoColumns left={leftColumnComponent} right={image} />
            </div>
            {children}
        </div>
    );
};

CvFormLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    leftColumn: PropTypes.node.isRequired,
    image: PropTypes.node.isRequired,
};

export default CvFormLayout;
