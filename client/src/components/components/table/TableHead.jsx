import React from 'react';
import PropTypes from 'prop-types';

import TableColumn from './TableColumn';
import {columnActionsPropTypes, notHidden} from './util';
import css from "./TableHead.module.scss";

const TableHead = ({columns, actions}) => (
    <thead className={css.root}>
        <tr>
            {columns.filter(notHidden).map((column) => (
                <TableColumn
                    key={column.key || column.dataField}
                    title={column.columnName}
                    column={column}
                    header
                >
                    {column.headerElement || column.columnName || ""}
                </TableColumn>
            ))}
            {
                actions && (
                    <TableColumn key="action-header" header column={actions}>
                        {actions.columnName || ""}
                    </TableColumn>
                )
            }
        </tr>
    </thead>
);

TableHead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        key: PropTypes.string,
        hidden: PropTypes.bool,
        columnName: PropTypes.string,
        headerElement: PropTypes.node,
    })).isRequired,
    actions: columnActionsPropTypes,
};

TableHead.defualtProps = {
    actions: undefined,
};

export default TableHead;
