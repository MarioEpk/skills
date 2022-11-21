import React from 'react';
import PropTypes from 'prop-types';

import i18n from "core/i18n";
import TableColumn from './TableColumn';
import {columnActionsPropTypes, notHidden} from './util';
import css from "./TableHead.module.scss";

const TableHead = ({columns, columnHiddenIds, actions}) => {
    const {t} = i18n.useTranslation();

    return (
        <thead className={css.root}>
            <tr>
                {columns.filter(notHidden).map((column) => (
                    <TableColumn
                        key={column.key || column.dataField}
                        columnHiddenIds={columnHiddenIds}
                        title={t(column.columnName)}
                        column={column}
                        header
                    >
                        {column.headerElement || t(column.columnName) || ""}
                    </TableColumn>
                ))}
                {
                    actions && (
                        <TableColumn columnHiddenIds={columnHiddenIds} key="action-header" header column={actions}>
                            {actions.columnName || ""}
                        </TableColumn>
                    )
                }
            </tr>
        </thead>
    );
};

TableHead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        key: PropTypes.string,
        defaultHidden: PropTypes.bool,
        columnName: PropTypes.string,
        headerElement: PropTypes.node,
    })).isRequired,
    columnHiddenIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    actions: columnActionsPropTypes,
};

TableHead.defaultProps = {
    actions: undefined,
};

export default TableHead;
