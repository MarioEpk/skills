import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {CheckBoxRounded, CheckBoxOutlineBlankRounded} from '@material-ui/icons';

import i18n from "core/i18n";

import {columnsPropTypes} from './util';
import {Button} from "../button";

export const ColumnsVisibility = ({columns, setColumnHiddenDataFields, columnHiddenDataFields}) => {
    const {t} = i18n.useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (columnDataField) => {
        if (columnHiddenDataFields.includes(columnDataField)) {
            setColumnHiddenDataFields(columnHiddenDataFields.filter((dataField) => dataField !== columnDataField));
        } else {
            setColumnHiddenDataFields([...columnHiddenDataFields, columnDataField]);
        }
    };

    return (
        <>
            <Button
                type={Button.type.DARK}
                onClick={handleOpen}
            >
                {t("columnsVisibility")}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {columns.map((column) => (
                    <MenuItem key={column.key} onClick={() => handleClick(column.dataField)}>
                        <ListItemIcon>
                            {columnHiddenDataFields.includes(column.dataField) ? <CheckBoxOutlineBlankRounded /> : <CheckBoxRounded />}
                        </ListItemIcon>
                        {t(column.columnName)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

ColumnsVisibility.propTypes = {
    columns: columnsPropTypes.isRequired,
    columnHiddenDataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    setColumnHiddenDataFields: PropTypes.func.isRequired,
};
