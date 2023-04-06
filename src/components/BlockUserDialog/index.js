import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { userDataService } from '~/services/userDataService';
import AlertSuccessDialog from '../AlertSuccessDialog';

export default function BlockUserDialog({ usernameToBlock, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [success, setSuccess] = useState(false);
    const submit = () => {
        userDataService.deleteUser(usernameToBlock).then((data) => {
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
                <DialogTitle id="alert-dialog-title">Chặn người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[400px]">
                            <AlertSuccessDialog message="Chặn thành công" open={success} />
                            <div className="flex flex-col w-full">Chặn người dùng: {usernameToBlock}</div>
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
