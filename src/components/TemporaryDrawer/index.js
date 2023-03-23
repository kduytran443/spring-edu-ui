import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function TemporaryDrawer({ anchor = 'right', children, button }) {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <div onClick={toggleDrawer(anchor, true)}>{button}</div>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                <Box
                    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
                    role="presentation"
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                >
                    <div
                        className="w-full flex flex-col h-full"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="w-full flex justify-end items-end">
                            <IconButton onClick={toggleDrawer(anchor, false)} color="primary" aria-label="Close">
                                <FontAwesomeIcon icon={faClose} />
                            </IconButton>
                        </div>
                        <div className="p-2 w-full h-full">{children}</div>
                    </div>
                </Box>
            </Drawer>
        </div>
    );
}
