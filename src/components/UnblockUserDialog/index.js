import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { userDataService } from '~/services/userDataService';
import AlertSuccessDialog from '../AlertSuccessDialog';

export default function UnblockUserDialog({ usernameToUnblock, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [success, setSuccess] = useState(false);
    const submit = () => {
        userDataService.unblockUser(usernameToUnblock).then((data) => {
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
            <Button color="primary" variant="outlined" onClick={handleClickOpen}>
                Mở chặn
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Mở chặn người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[400px]">
                            <AlertSuccessDialog message="Mở chặn thành công" open={success} />
                            <div className="flex flex-col w-full">Mở chặn người dùng: {usernameToUnblock}</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="primary" variant="contained" onClick={submit} autoFocus>
                        Mở chặn
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
