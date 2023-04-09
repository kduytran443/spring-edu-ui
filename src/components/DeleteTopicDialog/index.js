import { faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { topicService } from '~/services/topicService';
import AlertSuccessDialog from '../AlertSuccessDialog';

function DeleteTopicDialog({ topicId, topicName, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const submit = () => {
        topicService.deleteTopic({ id: topicId }).then((data) => {
            if (data) {
                setAlert(true);
                reload();
                setTimeout(() => {
                    setAlert(false);
                    handleClose();
                }, 1000);
            }
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
                <DialogTitle id="alert-dialog-title">Xóa chủ đề</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert} />
                        <div className="lg:w-[500px] my-2 w-[320px] flex flex-col">
                            Xác nhận xóa chủ đề: {topicName}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="error" variant="contained" onClick={submit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteTopicDialog;
