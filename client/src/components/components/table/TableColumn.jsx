import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

import css from "./TableColumn.module.scss";
import {columnActionsPropTypes, columnPropTypes} from "./util";

const TableColumn = ({column, columnHiddenDataFields, header, children, dataAttribute, ...rest}) => {
    const Tag = header ? 'th' : 'td';
    const columnInnerClassname = classnames(css.root, {
        [css.right]: column.align === "right",
        [css.center]: column.align === "center",
        [css.noWrap]: column.noWrap,
    });

    const columnClassName = classnames({
        [css.collapsed]: column.collapsed,
    });

    const columnStyle = {width: `${column.width}px`};
    return !columnHiddenDataFields.includes(column.dataField) && (
        <Tag {...rest} data-column-type={dataAttribute} className={columnClassName} style={columnStyle}>
            <div style={columnStyle} className={columnInnerClassname}>
                {children}
            </div>
        </Tag>
    );
};

TableColumn.propTypes = {
    column: PropTypes.oneOfType([columnPropTypes, columnActionsPropTypes]).isRequired,
    columnHiddenDataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
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
