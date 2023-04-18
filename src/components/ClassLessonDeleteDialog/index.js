import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { classLessonService } from '~/services/classLessonService';
import { questionBankService } from '~/services/questionBankService';

export default function ClassLessonDeleteDialog({ id, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { classId } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        classLessonService.deleteClassLesson({ id: id }).then((data) => {
            if (data.status !== 500) {
                navigate('/class/' + classId);
            }
        });
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <IconButton color="error">
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa bài học</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-[260px]">Xác nhận xóa bài học?</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={handleAgree} autoFocus>
                        <Button color="error" variant="contained">
                            Xóa
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
