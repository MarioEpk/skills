import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import css from "./WithColumn.module.scss";
import {Block} from "../../components/block";

const WithColumn = ({column, children, title, actions}) => (
    <div className={css.withColumn}>
        {column && (
            <div className={css.column}>
                {column}
            </div>
        )}
        <div className={classnames(css.content, {[css.center]: !column})}>
            <Block className={classnames({[css.withoutColumn]: !column})}>
                <div className={css.contentSpace}>
                    {title && (
                        <div className={css.title}>
                            <h2>{title}</h2>
                            {actions}
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
    column: PropTypes.node,
    actions: PropTypes.node,
    title: PropTypes.string,
};

WithColumn.defaultProps = {
    title: null,
    actions: null,
    column: null,
};

export default WithColumn;
