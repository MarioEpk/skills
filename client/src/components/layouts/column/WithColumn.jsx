import React from "react";
import PropTypes from "prop-types";

import css from "./WithColumn.module.scss";
import {Block} from "../../components/block";

const WithColumn = ({column, children}) => (
    <div className={css.withColumn}>
        <div className={css.column}>
            {column}
        </div>
        <div className={css.content}>
            <Block>
                <div className={css.contentSpace}>
                    {children}
                </div>
            </Block>
        </div>
    </div>
);

WithColumn.propTypes = {
    children: PropTypes.node.isRequired,
    column: PropTypes.node.isRequired,
};

export default WithColumn;
