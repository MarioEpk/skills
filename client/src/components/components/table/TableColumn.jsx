import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

import css from "./TableColumn.module.scss";

const TableColumn = ({column, header, children, dataAttribute, ...rest}) => {
    const Tag = header ? 'th' : 'td';
    const columnInnerClassname = classnames(css.root, {
        [css.right]: column.align === "right",
    });

    const columnClassName = classnames({
        [css.collapsed]: column.collapsed,
    });

    const columnStyle = {width: `${column.width}px`};
    return !column.hidden && (
        <Tag {...rest} data-column-type={dataAttribute} className={columnClassName} style={columnStyle}>
            <div style={columnStyle} className={columnInnerClassname}>
                {children}
            </div>
        </Tag>
    );
};

TableColumn.propTypes = {
    column: PropTypes.shape({
        name: PropTypes.string,
        hidden: PropTypes.bool,
        width: PropTypes.number,
        align: PropTypes.oneOf(["left", "right"]),
        collapsed: PropTypes.bool,
    }).isRequired,
    header: PropTypes.bool,
    children: PropTypes.node,
    dataAttribute: PropTypes.string,
};

TableColumn.defaultProps = {
    header: false,
    children: null,
    dataAttribute: "normal",
};

export default TableColumn;
