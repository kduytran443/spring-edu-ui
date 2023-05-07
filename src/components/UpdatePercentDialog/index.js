import { faCertificate, faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { topicService } from '~/services/topicService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { classService } from '~/services/classService';

function UpdatePercentDialog({ percent, setData = () => {} }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const { classId } = useParams();
    const [alertSuccess, setAlertSuccess] = useState(false);

    const [minimumCompletionRate, setMinimumCompletionRate] = useState(percent);

    useEffect(() => {
        if (percent) {
            setMinimumCompletionRate(percent);
        }
    }, [percent]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const submit = () => {
        classService.putClass({ id: classId, minimumCompletionRate: minimumCompletionRate }).then((data) => {
            if (data.id) {
                setData(data.minimumCompletionRate);
                setAlertSuccess(true);

                setTimeout(() => {
                    setAlertSuccess(false);
                    handleClose();
                }, 1000);
            }
        });
    };

    return (
        <div className="w-full">
            <Button
                color="primary"
                onClick={handleClickOpen}
                size="small"
                startIcon={<FontAwesomeIcon icon={faCertificate} />}
            >
                Cập nhật
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Tỉ lệ hoàn thành tối thiểu cấp chứng nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="lg:w-[500px] my-2 w-[320px] flex flex-col">
                            <AlertSuccessDialog open={alertSuccess} />
                            <TextField
                                className="w-full"
                                type="number"
                                value={minimumCompletionRate}
                                onInput={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= 100) {
                                        setMinimumCompletionRate(e.target.value);
                                    }
                                }}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="primary" variant="contained" onClick={submit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdatePercentDialog;
