import React, {useState} from 'react';
import {MoreVert} from '@material-ui/icons';
import IconButtonUi from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const MoreActionsMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        // We have to stop propagation to avoid the click event to be propagated into row
        e.stopPropagation();
        setAnchorEl(null);
    };

    // TODO :: Create general options which you can be passed to the table component or something like that.
    // TODO :: Add icons, colors, etc. for options -> https://mui.com/material-ui/react-menu/#main-content
    const options = [
        'Test1',
        'Test2',
    ];

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
                onClose={handleClose}
            >
                {options.map((option) => (
                    // TODO :: I thing we don't need "selected" prop for option, because we only have actions in menu
                    <MenuItem key={option} selected={option === 'Test1'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreActionsMenu;
