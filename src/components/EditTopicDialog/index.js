import { faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { topicService } from '~/services/topicService';

function EditTopicDialog({ topicId, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const [error, setError] = useState();
    const location = useLocation();

    const [topicName, setTopicName] = useState('');

    const loadData = () => {
        topicService.getTopicById(topicId).then((data) => {
            if (data) {
                setTopicName(data.name);
            }
        });
    };

    useEffect(() => {
        loadData();
    }, [open]);

    const submit = () => {
        if (topicName.trim()) {
            const obj = {
                id: topicId,
                name: topicName.trim(),
            };
            topicService.putTopic(obj).then((data) => {
                if (data) {
                    reload();
                    handleClose();
                }
            });
        }
    };

    return (
        <div className="w-full">
            <Button onClick={handleClickOpen} size="small" startIcon={<FontAwesomeIcon icon={faEdit} />}>
                Thay đổi
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Sửa chủ đề</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="lg:w-[500px] my-2 w-[320px] flex flex-col">
                            <TextField
                                value={topicName}
                                onInput={(e) => {
                                    setTopicName(e.target.value);
                                }}
                                label="Tên chủ đề"
                            />
                        </div>
                        {error && <div className="text-red-500">*Thông tin nhập không chính xác, hãy kiểm tra lại</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button variant="contained" disabled={!topicName.trim()} onClick={submit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditTopicDialog;
