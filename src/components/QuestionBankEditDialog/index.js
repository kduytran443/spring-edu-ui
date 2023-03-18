import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { questionBankService } from '~/services/questionBankService';

export default function QuestionBankEditDialog({ questionBankId, reload = () => {} }) {
    const [open, setOpen] = useState(false);

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
        if (newQuestionBank.trim()) {
            const obj = {
                id: questionBankId,
                name: newQuestionBank.trim(),
            };
            questionBankService.putQuestionBank(obj).then((data) => {
                if (data.id) {
                    reload();
                }
            });
            handleClose();
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        loadData();
    }, [open]);

    const [newQuestionBank, setNewQuestionBank] = useState('');
    const [error, setError] = useState(false);

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faPen} />}>Đổi tên</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Đổi tên ngân hàng câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 w-[300px]">
                            <TextField
                                className="w-full"
                                value={newQuestionBank}
                                onInput={(e) => {
                                    setNewQuestionBank(e.target.value);
                                    setError(false);
                                }}
                                label="Tên ngân hàng câu hỏi"
                            />
                            {error && <div className="text-red-600">*Tên không được bỏ trống</div>}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={handleAgree} autoFocus>
                        <Button disabled={!newQuestionBank.trim().length} color="primary" variant="contained">
                            Tạo
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
