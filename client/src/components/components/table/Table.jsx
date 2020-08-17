import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import ImmutablePropTypes from "react-immutable-proptypes";
import {Edit, Delete} from '@material-ui/icons';

import TableColumn from './TableColumn';
import TableHead from './TableHead';
import {getColumnData, getKeyParam, columnsPropTypes, columnActionsPropTypes} from './util';
import css from "./Table.module.scss";
import {Loading} from "../loading";
import {Button} from "../button";

const renderActions = (actions, row, key) => {
    if (!actions) return null;
    const actionComponents = [];
    if (actions.onEdit) {
        actionComponents.push(
            <Button onClick={() => actions.onEdit(row)} label="Editovat" startIcon={<Edit />} />,
        );
    }
    if (actions.onDelete) {
        actionComponents.push(
            <Button type={Button.type.DANGER} onClick={() => actions.onDelete(row)} startIcon={<Delete />} label="Smazat" />,
        );
    }
    return (
        <TableColumn
            // eslint-disable-next-line react/no-array-index-key
            key={`${key}-action`}
            column={actions}
        >
            {actionComponents.map((component) => component)}
        </TableColumn>
    );
};

const renderRow = (columns, keyParam, row, className, actions) => (
    <tr className={className} key={row.get(keyParam)}>
        {columns.map((column) => (
            <TableColumn
                key={column.key || column.dataField}
                column={column}
            >
                {getColumnData(column, row)}
            </TableColumn>
        ))}
        {renderActions(actions, row, row.get(keyParam))}
    </tr>
);

const Table = ({
    columns,
    data,
    loading,
    actions,
}) => {
    const renderRowWithClassName = (row) => {
        // Here you can add conditional classes
        const className = css.row;
        return renderRow(columns, getKeyParam(columns), row, className, actions);
    };
    return (
        <div className={css.root}>
            <Loading loading={loading}>
                <table className={css.table}>
                    <TableHead columns={columns} actions={actions} />
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
    actions: columnActionsPropTypes,
    data: ImmutablePropTypes.list,
    loading: PropTypes.bool,
};

Table.defaultProps = {
    data: List(),
    actions: undefined,
    loading: false,
};

export default Table;
