import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { choiceAnswerSerivce } from '~/services/choiceAnswerSerivce';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';
import ShowTextData from '../ShowTextData';

export default function ChoiceQuestionDetailsDeleteDialog({ choiceQuestionId, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newQuestionName, setNewQuestionName] = useState('');

    const loadQuestion = () => {
        choiceQuestionSerivce.getChoiceQuestionsById(choiceQuestionId).then((data) => {
            if (data.id) {
                setNewQuestionName(data.name);
            }
        });
    };

    useEffect(() => {
        loadQuestion();
    }, [open]);

    const submitDelete = () => {
        choiceQuestionSerivce.deleteChoiceQuestion({ id: choiceQuestionId }).then((data) => {
            reload();
        });
        handleClose();
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button color="error" startIcon={<FontAwesomeIcon icon={faTrash} />}>
                    Xóa
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 w-[320px] md:w-[500px]">
                            <div className="w-full">
                                <div className="font-bold">Tên câu hỏi</div>
                                <TextField value={newQuestionName} disabled size="small" className="w-full" />
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Đóng</Button>
                    </div>
                    <div className="select-none cursor-pointer">
                        <Button onClick={submitDelete} color="error">
                            Xóa
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
