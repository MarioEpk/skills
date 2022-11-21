import React, {useState} from 'react';
import {MoreVert} from '@material-ui/icons';
import IconButtonUi from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PropTypes from 'prop-types';
import {ListItemIcon, ListItemText} from '@material-ui/core';

import {moreActionsMenuOptionPropTypes} from './util';

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

    // TODO :: Update UX for sharing option in table and in action
    // TODO :: Fix different height of the action items
    return (
        <>
            <IconButtonUi
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {/* TODO :: change color */}
                <MoreVert />
            </IconButtonUi>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose()}
            >
                {options.map(({key, onClick, icon, label, color}) => (
                    <MenuItem key={key} onClick={handleClose(onClick)} className={color}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                    </MenuItem>
                ))}
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
