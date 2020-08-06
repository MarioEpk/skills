import React from 'react';
import PropTypes from 'prop-types';

import TableColumn from './TableColumn';
import {notHidden} from './util';
import css from "./TableHead.module.scss";

const TableHead = ({columns}) => (
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
};

export default TableHead;
