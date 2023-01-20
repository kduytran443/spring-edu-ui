import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    title = 'Tiêu đề',
    content = 'Nội dung',
    noButton = 'No',
    yesButton = 'Yes',
    handleClickOpen = () => {},
    handleClose = () => {},
    handleSubmit = () => {},
    open = false,
}) {
    const submit = () => {
        handleSubmit();
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{noButton}</Button>
                    <Button onClick={submit}>{yesButton}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
