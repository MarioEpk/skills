import React from "react";
import PropTypes from 'prop-types';
import {ACTION_COLUMN_DATA_ATTRIBUTE, MENU_ITEM_COLOR} from "./constants";

export const wasAnythingOtherThanRowClicked = (eventTarget) => {
    if (!eventTarget || eventTarget.tagName === "TR") {
        return false;
    }
    if (eventTarget.hasAttribute("data-column-type") && eventTarget.getAttribute("data-column-type") === ACTION_COLUMN_DATA_ATTRIBUTE) {
        return true;
    }
    return wasAnythingOtherThanRowClicked(eventTarget.parentElement);
};

export const notHidden = ({hidden}) => !hidden;

export const getKeyParam = (columns) => columns.find(({isKey}) => isKey).dataField;

export const getColumnProperty = (dataField, row) => row.getIn(dataField.split('.'), "");

export const getColumnData = (column, row) => {
    const data = getColumnProperty(column.dataField, row);
    const customFormatter = column.dataFormat;
    if (data === undefined || data === null) {
        return null;
    }
    if (customFormatter === undefined) {
        return <div>{data}</div>;
    } else {
        return customFormatter(data, row);
    }
};

export const columnPropTypes = PropTypes.shape({
    key: PropTypes.string,
    dataField: PropTypes.string.isRequired,
    isKey: PropTypes.bool,
    noWrap: PropTypes.bool,
    defaultHidden: PropTypes.bool,
    columnName: PropTypes.string,
    /** (columnData, row) => node - function to format each cell. */
    dataFormat: PropTypes.func,
    align: PropTypes.oneOf(["left", "right", "center"]),
    /** optional header which is used instead of column name */
    headerElement: PropTypes.node,
    width: PropTypes.number,
});

export const columnActionsPropTypes = PropTypes.shape({
    columnName: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    custom: PropTypes.func,
});

export const columnsPropTypes = PropTypes.arrayOf(columnPropTypes.isRequired);

export const moreActionsMenuOptionPropTypes = PropTypes.shape({
    key: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(Object.values(MENU_ITEM_COLOR)),
});
