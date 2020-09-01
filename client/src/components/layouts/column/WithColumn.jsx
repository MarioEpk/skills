import React from "react";
import PropTypes from "prop-types";

import css from "./WithColumn.module.scss";
import {Block} from "../../components/block";

const WithColumn = ({column, children, title, titleButton}) => (
    <div className={css.withColumn}>
        <div className={css.column}>
            {column}
        </div>
        <div className={css.content}>
            <Block>
                <div className={css.contentSpace}>
                    {title && (
                        <div className={css.title}>
                            <h2>{title}</h2>
                            {titleButton}
                        </div>
                    )}
                    {children}
                </div>
            </Block>
        </div>
    </div>
);

WithColumn.propTypes = {
    children: PropTypes.node.isRequired,
    column: PropTypes.node.isRequired,
    titleButton: PropTypes.node,
    title: PropTypes.string,
};

WithColumn.defaultProps = {
    title: null,
    titleButton: null,
};

export default WithColumn;
