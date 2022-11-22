import React, {useState} from 'react';
import {MoreVert} from '@material-ui/icons';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PropTypes from 'prop-types';
import {ListItemIcon, ListItemText} from '@material-ui/core';

import classnames from 'classnames';
import {IconButton} from "../button";
import {moreActionsMenuOptionPropTypes} from './util';
import css from './Table.module.scss';
import {MENU_ITEM_COLOR} from './constants';

const MoreActionsMenu = ({options}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (onClick) => (e) => {
        // We have to stop propagation to avoid the click event to be propagated into row
        e.stopPropagation();
        setAnchorEl(null);
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <IconButton
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                icon={<MoreVert />}
                ariaLabel="more"
            />
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose()}
            >
                {options.map(({key, onClick, icon, label, color}) => {
                    const className = classnames(css.moreActionItem, {
                        [css.danger]: !!color && color === MENU_ITEM_COLOR.DANGER,
                        [css.default]: color === undefined,
                    });
                    return (
                        <MenuItem key={key} onClick={handleClose(onClick)} className={className}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText className={css.menuItemText}>{label}</ListItemText>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

MoreActionsMenu.propTypes = {
    options: PropTypes.arrayOf(moreActionsMenuOptionPropTypes),
};

MoreActionsMenu.defaultProps = {
    options: [],
};

export default MoreActionsMenu;
