import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {columnsPropTypes} from './util';
import {Button} from "../button";
import i18n from "../../../core/i18n";

export const ColumnsVisibility = ({columns, columnHiddenKeys, setColumnHiddenKeys}) => {
    const {t} = i18n.useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (columnKey) => {
        if (columnHiddenKeys.includes(columnKey)) {
            setColumnHiddenKeys(columnHiddenKeys.filter((key) => key !== columnKey));
        } else {
            setColumnHiddenKeys([...columnHiddenKeys, columnKey]);
        }
    };

    return (
        <>
            <Button
                type={Button.type.DARK}
                onClick={handleOpen}
            >
                Columns
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
                    <MenuItem key={column.key} onClick={() => handleClick(column.key)}>
                        <ListItemIcon>
                            {columnHiddenKeys.includes(column.key) ? <VisibilityOff /> : <Visibility />}
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
    columnHiddenKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    setColumnHiddenKeys: PropTypes.func.isRequired,
};
