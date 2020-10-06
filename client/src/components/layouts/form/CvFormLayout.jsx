import React from "react";
import PropTypes from "prop-types";

import {TwoColumns} from "../column";
import css from "./CvFormLayout.module.scss";

const CvFormLayout = ({leftColumn, children, rightColumn}) => {
    const leftColumnComponent = <div className={css.leftColumn}>{leftColumn}</div>;
    const rightColumnComponent = <div className={css.rightColumn}>{rightColumn}</div>;
    return (
        <form>
            <div className={css.twoColumnsSection}>
                <TwoColumns left={leftColumnComponent} right={rightColumnComponent} />
            </div>
            {children}
        </form>
    );
};

CvFormLayout.propTypes = {
    children: PropTypes.node.isRequired,
    leftColumn: PropTypes.node.isRequired,
    rightColumn: PropTypes.node.isRequired,
};

export default CvFormLayout;
