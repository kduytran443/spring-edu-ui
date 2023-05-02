import { faNoteSticky, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { noteFolderService } from '~/services/noteFolderService';
import { noteService } from '~/services/noteService';
import { questionBankService } from '~/services/questionBankService';
import { openInNewTab } from '~/utils';

export default function NoteCreateDialog({ noteFolderId, id, reload = () => {} }) {
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
                name: noteName.trim(),
                noteFolder: { id: noteFolderId },
            };
            noteService.post(obj).then((data) => {
                if (data.id) {
                    reload();
                    openInNewTab('/note/' + data.id);
                }
            });
            handleClose();
        } else {
            setError(true);
        }
    };

    const [noteName, setNoteName] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setNoteName('');
    }, [open]);

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faNoteSticky} />}>Tạo ghi chú</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Tạo ghi chú</DialogTitle>
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
                            Tạo
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
