import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { noteFolderService } from '~/services/noteFolderService';
import { noteService } from '~/services/noteService';
import { questionBankService } from '~/services/questionBankService';

export default function NoteEditDialog({ button, id, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        if (noteName.trim()) {
            const obj = {
                id: id,
                name: noteName.trim(),
            };
            noteService.put(obj).then((data) => {
                if (data.id) {
                    reload();
                }
            });
            handleClose();
        } else {
            setError(true);
        }
    };

    const [noteName, setNoteName] = useState('');
    const [error, setError] = useState(false);

    const load = () => {
        noteService.getById(id).then((data) => {
            if (data.id) {
                setNoteName(data.name);
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
                <DialogTitle id="alert-dialog-title">Sửa ghi chú</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 md:w-[300px]">
                            <TextField
                                className="w-full"
                                value={noteName}
                                onInput={(e) => {
                                    setNoteName(e.target.value);
                                    setError(false);
                                }}
                                label="Tên ghi chú"
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
                        <Button disabled={!noteName.trim().length} color="primary" variant="contained">
                            Sửa
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
