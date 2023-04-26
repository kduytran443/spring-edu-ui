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
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationSocketContext } from '~/components/NotificationSocketProvider';
import { classLessonService } from '~/services/classLessonService';
import { commentService } from '~/services/commentService';
import { questionBankService } from '~/services/questionBankService';

export default function CommentDeleteDialog({ id, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { classId } = useParams();

    const sendContext = useContext(NotificationSocketContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        commentService.delete(id).then((data) => {
            if (data.status !== 500) {
                reload();
                sendContext([], 'COMMENT');
                setOpen(false);
            }
        });
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <IconButton size="small" color="error">
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa bình luận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-[260px]">Xác nhận xóa bình luận?</div>
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
