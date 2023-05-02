import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { noteFolderService } from '~/services/noteFolderService';
import { questionBankService } from '~/services/questionBankService';

export default function NoteFolderCreateDialog({ reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        if (noteFolderName.trim()) {
            const obj = {
                name: noteFolderName.trim(),
            };
            noteFolderService.post(obj).then((data) => {
                if (data.id) {
                    reload();
                }
            });
            handleClose();
        } else {
            setError(true);
        }
    };

    const [noteFolderName, setNoteFolderName] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setNoteFolderName('');
    }, [open]);

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faPlus} />}>Tạo thư mục</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Tạo thư mục ghi chú</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 md:w-[300px]">
                            <TextField
                                className="w-full"
                                value={noteFolderName}
                                onInput={(e) => {
                                    setNoteFolderName(e.target.value);
                                    setError(false);
                                }}
                                label="Tên thư mục ghi chú"
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
                        <Button disabled={!noteFolderName.trim().length} color="primary" variant="contained">
                            Tạo
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
