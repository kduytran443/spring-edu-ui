import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { noteFolderService } from '~/services/noteFolderService';
import { questionBankService } from '~/services/questionBankService';

export default function NoteFolderEditDialog({ button, id, reload = () => {} }) {
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
                id: id,
                name: noteFolderName.trim(),
            };
            noteFolderService.put(obj).then((data) => {
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

    const load = () => {
        noteFolderService.getById(id).then((data) => {
            if (data.id) {
                setNoteFolderName(data.name);
            }
        });
    };

    useEffect(() => {
        load();
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
                <DialogTitle id="alert-dialog-title">Sửa thư mục ghi chú</DialogTitle>
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
                            Sửa
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
