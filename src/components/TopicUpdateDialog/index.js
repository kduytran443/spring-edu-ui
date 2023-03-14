import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { topicService } from '~/services/topicService';
import { useParams } from 'react-router-dom';

export default function TopicUpdateDialog({ buttonOpen, topicId, isUpdate = false, loadTopic = () => {} }) {
    const [open, setOpen] = React.useState(false);
    const { classId } = useParams();

    const [topicState, setTopicState] = useState('');

    const [alertState, setAlertState] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        clearInfo();
    };

    const handleClose = () => {
        setOpen(false);
        clearInfo();
    };

    const onInputTopic = (e) => {
        setTopicState(e.target.value);
    };

    const insertTopic = () => {
        topicService.postTopic({ name: topicState, classId: classId }).then((data) => {
            if (data.status !== 500) {
                setAlertState('Thêm thành công, đang cập nhật dữ liệu!');
                setTimeout(() => {
                    loadTopic();
                    handleClose();
                }, 2000);
            }
        });
    };

    const clearInfo = () => {
        setTopicState('');
        setAlertState('');
    };

    const submit = () => {
        if (topicState) {
            if (topicId) {
                //sửa
            } else {
                insertTopic();
                clearInfo();
            }
        }
    };

    return (
        <div>
            <div onClick={handleClickOpen}>{buttonOpen}</div>
            <Dialog
                className="p-4"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{topicId ? 'Sửa tên chủ đề' : 'Thêm chủ đề'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="p-4 max-w-[320px]">
                            {!alertState ? (
                                <div>
                                    {!topicId && (
                                        <TextField label="Tên chủ đề" onInput={onInputTopic} value={topicState} />
                                    )}
                                </div>
                            ) : (
                                <div>{alertState}</div>
                            )}
                        </div>
                    </DialogContentText>
                </DialogContent>
                {!alertState && (
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button disabled={!topicState} variant="contained" color="primary" onClick={submit} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}
