import { faEdit, faFile, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { topicService } from '~/services/topicService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import SubmittedExerciseUploadWidget from '../SubmittedExerciseUploadWidget';

function FileListViewDialog({ fileId, submittedExerciseId, fileName, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const [fileList, setFileList] = useState([]);
    const loadFiles = () => {
        submittedExerciseService.getFiles(submittedExerciseId).then((data) => {
            if (data.length >= 0) {
                setFileList(data);
            }
        });
    };

    useEffect(() => {
        loadFiles();
    }, [submittedExerciseId, open]);

    return (
        <div className="w-full">
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faFile} />}>Xem danh sách tập tin ({fileList.length})</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Danh sách tập tin</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="lg:w-[500px] my-2 w-[300px] flex flex-col">
                            <SubmittedExerciseUploadWidget disable fileList={fileList} multiple />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FileListViewDialog;
