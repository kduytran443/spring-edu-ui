import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';

export default function RemoveQuestionBankFromClassDialog({ questionBankId, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [userState, dispatchUserState] = useUser();
    const { classId } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        if (questionBankId) {
            questionBankService.deleteQuestionBankFromClass(classId, { id: questionBankId }).then((data) => {
                if (data) {
                    handleClose();
                    reload();
                }
            });
        }
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button color="error">Gỡ</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Gỡ ngân hàng câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4">
                            <div>Bạn xác nhận gỡ khỏi lớp học này?</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={handleAgree} autoFocus>
                        <Button color="error" variant="contained">
                            Đồng ý
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
