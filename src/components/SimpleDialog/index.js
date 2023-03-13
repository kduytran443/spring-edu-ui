import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function SimpleDialog({
    openButton,
    children,
    title,
    agreeButton = 'Đồng ý',
    agreeAction = () => {},
    color,
    visibleButton = true,
    closeAftarAgree = true,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const submit = () => {
        agreeAction();
        if (closeAftarAgree) handleClose();
    };

    return (
        <div>
            <div className="w-full" onClick={handleClickOpen}>
                {openButton}
            </div>
            <Dialog className="w-full" onClose={handleClose} open={open}>
                <DialogTitle>{title}</DialogTitle>
                <div className="w-full min-w-[280px] px-6 py-4">{children}</div>
                {visibleButton && (
                    <div className="w-full flex flex-row items-center my-4 justify-end pr-6">
                        <Button onClick={handleClose}>Hủy</Button>
                        <div onClick={submit}>
                            <Button variant="contained" color={color}>
                                {agreeButton}
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
