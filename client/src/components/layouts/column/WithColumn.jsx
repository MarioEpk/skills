import React from "react";
import PropTypes from "prop-types";

import css from "./WithColumn.module.scss";
import {Block} from "../../components/block";

const WithColumn = ({column, children, title}) => (
    <div className={css.withColumn}>
        <div className={css.column}>
            {column}
        </div>
        <div className={css.content}>
            <Block>
                <div className={css.contentSpace}>
                    {title && <h2>{title}</h2>}
                    {children}
                </div>
            </Block>
        </div>
    </div>
);

WithColumn.propTypes = {
    children: PropTypes.node.isRequired,
    column: PropTypes.node.isRequired,
    title: PropTypes.string,
};

WithColumn.defaultProps = {
    title: null,
};

export default WithColumn;
