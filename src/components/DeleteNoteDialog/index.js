import { faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { topicService } from '~/services/topicService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { noteFolderService } from '~/services/noteFolderService';
import { noteService } from '~/services/noteService';

function DeleteNoteDialog({ id, noteName, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const submit = () => {
        noteService.delete(id).then((data) => {
            reload();
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                handleClose();
            }, 1000);
        });
    };

    return (
        <div>
            <Button color="error" onClick={handleClickOpen} size="small" startIcon={<FontAwesomeIcon icon={faTrash} />}>
                Xóa
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa ghi chú</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert} />
                        <div className="lg:w-[500px] my-2 w-[320px] flex flex-col">
                            Xác nhận xóa ghi chú: {noteName}
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

export default DeleteNoteDialog;
