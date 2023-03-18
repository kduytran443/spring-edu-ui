import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionBankService } from '~/services/questionBankService';

export default function QuestionBankDeleteDialog({ questionBankId, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const loadData = () => {
        questionBankService.getQuestionBankById(questionBankId).then((data) => {
            if (data) {
                setNewQuestionBank(data.name);
            }
        });
    };

    const handleAgree = () => {
        console.log('okok');
        questionBankService.deleteQuestionBank({ id: questionBankId }).then((data) => {
            console.log('okok');
            navigate('/question-bank');
        });
    };

    const [newQuestionBank, setNewQuestionBank] = useState('');

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button color="error" startIcon={<FontAwesomeIcon icon={faTrash} />}>
                    Xóa ngân hàng câu hỏi
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa ngân hàng câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4">Sau khi xóa không thể phục hồi, hãy chú ý</div>
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
