import { faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { discountService } from '~/services/discountService';
import { topicService } from '~/services/topicService';

function DeleteDiscountDialog({ discountId, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const [alertSuccess, setAlertSuccess] = useState(0);

    const submit = () => {
        discountService.delete(discountId).then((data) => {
            setAlertSuccess(1);
            setTimeout(() => {
                reload();
                setAlertSuccess(0);
                handleClose();
            }, 1000);
        });
    };

    return (
        <div className="w-full">
            <Button color="error" onClick={handleClickOpen} size="small" startIcon={<FontAwesomeIcon icon={faTrash} />}>
                Xóa
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alertSuccess === 1} />
                        <AlertFailDialog open={alertSuccess === -1} />
                        <div className="p-4 min-w-[200px]">Xác nhận xóa</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={submit} color="error" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteDiscountDialog;
