import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { userDataService } from '~/services/userDataService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { classService } from '~/services/classService';

export default function BlockClassDialog({ id, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [success, setSuccess] = useState(false);
    const submit = () => {
        const obj = {
            status: 0,
            id: id,
        };
        classService.changeClassStatus(obj).then((data) => {
            setSuccess(true);
            reload();
            setTimeout(() => {
                setSuccess(false);
                handleClose();
            }, 2000);
        });
    };

    return (
        <div>
            <Button color="error" variant="outlined" onClick={handleClickOpen}>
                Chặn
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chặn lớp</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[400px]">
                            <AlertSuccessDialog message="Chặn thành công" open={success} />
                            <div className="flex flex-col w-full">Chặn lớp: {id}</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="error" variant="contained" onClick={submit} autoFocus>
                        Chặn
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
