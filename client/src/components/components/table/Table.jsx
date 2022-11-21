import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import ImmutablePropTypes from "react-immutable-proptypes";
import {Edit, Delete, CancelScheduleSend} from '@material-ui/icons';
import classnames from "classnames";

import i18n from "core/i18n";
import TableColumn from './TableColumn';
import TableHead from './TableHead';
import {getColumnData, getKeyParam, columnsPropTypes, columnActionsPropTypes, wasAnythingOtherThanRowClicked} from './util';
import css from "./Table.module.scss";
import {Loading} from "../loading";
import {ACTION_COLUMN_DATA_ATTRIBUTE, MENU_ITEM_COLOR} from "./constants";
import MoreActionsMenu from "./MoreActionsMenu";

const renderActions = (t, actions, row, key) => {
    if (!actions) {
        return null;
    }
    const actionComponents = [];
    const moreActionsMenuComponents = [];
    if (actions.custom) {
        actionComponents.push(...actions.custom(row));
    }
    if (actions.onEdit) {
        moreActionsMenuComponents.push(
            {key: `${key}-edit`, onClick: () => actions.onEdit(row), label: t(`edit.button.label`), icon: <Edit />},
        );
    }
    if (actions.onUnshare && row.get('shared')) {
        moreActionsMenuComponents.push(
            {key: `${key}-unshare`, onClick: () => actions.onUnshare(row), label: t(`unshare.button.label`), icon: <CancelScheduleSend />},
        );
    }
    if (actions.onDelete) {
        moreActionsMenuComponents.push(
            {key: `${key}-delete`, onClick: () => actions.onDelete(row), label: t(`delete.button.label`), icon: <Delete />, color: MENU_ITEM_COLOR.SECONDARY},
        );
    }
    return (
        <TableColumn
            // eslint-disable-next-line react/no-array-index-key
            key={`${key}-action`}
            dataAttribute={ACTION_COLUMN_DATA_ATTRIBUTE}
            column={actions}
        >
            {actionComponents}
            <MoreActionsMenu options={moreActionsMenuComponents} />
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
