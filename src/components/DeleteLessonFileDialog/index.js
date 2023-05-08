import { faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { topicService } from '~/services/topicService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { exerciseService } from '~/services/exerciseService';
import { classLessonService } from '~/services/classLessonService';

function DeleteLessonFileDialog({ fileId, id, button, fileName, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const submit = () => {
        classLessonService.deleteFile(id, fileId).then((data) => {
            if (data.id) {
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
            <div onClick={handleClickOpen}>{button}</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa file</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert} />
                        <div className="lg:w-[500px] my-2 w-[300px] flex flex-col">Xác nhận xóa file: {fileName}</div>
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

export default DeleteLessonFileDialog;
