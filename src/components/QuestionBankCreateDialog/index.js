import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { questionBankService } from '~/services/questionBankService';

export default function QuestionBankCreateDialog({ button, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        if (newQuestionBank.trim()) {
            const obj = {
                name: newQuestionBank.trim(),
            };
            questionBankService.postQuestionBank(obj).then((data) => {
                if (data.id) {
                    reload();
                }
            });
            handleClose();
        } else {
            setError(true);
        }
    };

    const [newQuestionBank, setNewQuestionBank] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setNewQuestionBank('');
    }, [open]);

    return (
        <div>
            <div onClick={handleClickOpen}>{button}</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Tạo ngân hàng câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 md:w-[300px]">
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
