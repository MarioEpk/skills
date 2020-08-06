import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import ImmutablePropTypes from "react-immutable-proptypes";

import TableColumn from './TableColumn';
import TableHead from './TableHead';
import {getColumnData, getKeyParam, columnsPropTypes} from './util';
import css from "./Table.module.scss";
import {Loading} from "../loading";

const renderRow = (columns, keyParam, row, className) => (
    <tr className={className} key={row.get(keyParam)}>
        {columns.map((column) => (
            <TableColumn
                key={column.key || column.dataField}
                column={column}
            >
                {getColumnData(column, row)}
            </TableColumn>
        ))}
    </tr>
);

const Table = ({
    columns,
    data,
    loading,
}) => {
    const renderRowWithClassName = (row) => {
        // Here you can add conditional classes
        const className = css.row;
        return renderRow(columns, getKeyParam(columns), row, className);
    };
    return (
        <div className={css.root}>
            <Loading loading={loading}>
                <table className={css.table}>
                    <TableHead columns={columns} />
                    <tbody>
                        {data.map((row, index) => (renderRowWithClassName(row, index))).toArray()}
                    </tbody>
                </table>
            </Loading>
        </div>
    );
};

Table.propTypes = {
    columns: columnsPropTypes.isRequired,
    data: ImmutablePropTypes.list,
    loading: PropTypes.bool,
};

Table.defaultProps = {
    data: List(),
    loading: false,
};

export default Table;
