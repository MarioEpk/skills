import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import ImmutablePropTypes from "react-immutable-proptypes";
import {Edit, Delete} from '@material-ui/icons';
import classnames from "classnames";

import i18n from "core/i18n";
import TableColumn from './TableColumn';
import TableHead from './TableHead';
import {getColumnData, getKeyParam, columnsPropTypes, columnActionsPropTypes, wasAnythingOtherThanRowClicked} from './util';
import css from "./Table.module.scss";
import {Loading} from "../loading";
import {Button} from "../button";
import {ACTION_COLUMN_DATA_ATTRIBUTE} from "./constants";
import MoreActionsMenu from "./MoreActionsMenu";

const renderActions = (t, actions, row, key) => {
    if (!actions) {
        return null;
    }
    const actionComponents = [];
    if (actions.custom) {
        actionComponents.push(actions.custom(row));
    }
    if (actions.onEdit) {
        actionComponents.push(
            <Button key={`${key}-edit`} onClick={() => actions.onEdit(row)} label={t(`edit.button.label`)} startIcon={<Edit />} />,
        );
    }
    if (actions.onDelete) {
        actionComponents.push(
            <Button key={`${key}-delete`} type={Button.type.DANGER} onClick={() => actions.onDelete(row)} startIcon={<Delete />} label={t(`delete.button.label`)} />,
        );
    }
    return (
        <TableColumn
            // eslint-disable-next-line react/no-array-index-key
            key={`${key}-action`}
            dataAttribute={ACTION_COLUMN_DATA_ATTRIBUTE}
            column={actions}
        >
            {actionComponents.map((component) => component)}
            <MoreActionsMenu />
        </TableColumn>
    );
};

const renderRow = (t, columns, keyParam, row, className, actions, onRowClick) => {
    const onRowClickHandler = (e) => {
        if (onRowClick) {
            if (!wasAnythingOtherThanRowClicked(e.target)) {
                onRowClick(row);
            }
        }
    };

    return (
        <tr
            className={className}
            key={row.get(keyParam)}
            onClick={onRowClickHandler}
        >
            {columns.map((column) => (
                <TableColumn
                    key={column.key || column.dataField}
                    column={column}
                >
                    {getColumnData(column, row)}
                </TableColumn>
            ))}
            {renderActions(t, actions, row, row.get(keyParam))}
        </tr>
    );
};

const Table = ({
    columns,
    data,
    loading,
    actions,
    onRowClick,
}) => {
    const {t} = i18n.useTranslation();

    const renderRowWithClassName = (row) => {
        // Here you can add conditional classes
        const className = classnames({
            [css.actionRow]: !!onRowClick,
        });
        return renderRow(t, columns, getKeyParam(columns), row, className, actions, onRowClick);
    };

    return (
        <div className={css.root}>
            <Loading loading={loading}>
                <table className={css.table}>
                    <TableHead columns={columns} actions={actions} />
                    <tbody>
                        {data.map((row, index) => (renderRowWithClassName(row, index)))}
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
    onRowClick: PropTypes.func,
};

Table.defaultProps = {
    data: List(),
    actions: undefined,
    loading: false,
    onRowClick: undefined,
};

export default Table;
