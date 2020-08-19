import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

import css from "./TableColumn.module.scss";

const createColumnElement = (Tag, columnClassname, width, hidden, children, rest) => {
    const columnStyle = {width: `${width}px`};
    return !hidden && (
        <Tag {...rest} style={columnStyle}>
            <div style={columnStyle} className={columnClassname}>
                {children}
            </div>
        </Tag>
    );
};

const TableColumn = ({column, header, children, ...rest}) => {
    const Tag = header ? 'th' : 'td';
    const columnClassname = classnames(css.root, {
        [css.right]: column.align === "right",
    });
    return createColumnElement(Tag, columnClassname, column.width, column.hidden, children, rest);
};

TableColumn.propTypes = {
    column: PropTypes.shape({
        name: PropTypes.string,
        hidden: PropTypes.bool,
        width: PropTypes.number,
        align: PropTypes.oneOf(["left", "right"]),
    }).isRequired,
    header: PropTypes.bool,
    children: PropTypes.node,
};

TableColumn.defaultProps = {
    header: false,
    children: null,
};

export default TableColumn;
