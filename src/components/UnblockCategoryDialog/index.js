import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { userDataService } from '~/services/userDataService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { classService } from '~/services/classService';
import { categoryService } from '~/services/categoryService';

export default function UnblockCategoryDialog({ id, reload = () => {} }) {
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
            id: id,
        };
        categoryService.unblockCategory(obj).then((data) => {
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
                Khôi phục
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Khôi phục</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[400px]">
                            <AlertSuccessDialog message="Chặn thành công" open={success} />
                            <div className="flex flex-col w-full">Khôi phục danh mục id: {id}</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="primary" variant="contained" onClick={submit} autoFocus>
                        Khôi phục
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
