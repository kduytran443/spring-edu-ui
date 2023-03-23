import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { classService } from '~/services/classService';

export default function ClassDeleteDialog() {
    const [open, setOpen] = useState(false);
    const { classId } = useParams();
    const navigate = useNavigate();
    const [alertSuccess, setAlertSuccess] = useState(false);

    const handleClickOpen = () => {
        setAlertSuccess(0);
        setConfirm('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteClass = () => {
        const obj = {
            status: 0,
            id: classId,
        };
        if (confirm === 'XÓA') {
            classService.changeClassStatus(obj).then((data) => {
                if (data) {
                    setAlertSuccess(1);
                    setTimeout(() => {
                        setAlertSuccess(0);
                        navigate('/home');
                        handleClose();
                    }, 1000);
                } else {
                    setAlertSuccess(-1);
                    setTimeout(() => {
                        setAlertSuccess(0);
                    }, 1000);
                }
            });
        } else {
            setAlertSuccess(-1);
            setTimeout(() => {
                setAlertSuccess(0);
            }, 1000);
        }
    };

    const [confirm, setConfirm] = useState('');

    return (
        <div>
            <Button
                variant="outlined"
                color="error"
                startIcon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleClickOpen}
            >
                Xóa lớp học
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xóa lớp</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="p-4">
                            <AlertSuccessDialog open={alertSuccess === 1} />
                            <AlertFailDialog open={alertSuccess === -1} />
                            <div className="w-full">
                                <p>Nhập vào "XÓA" để xác nhận xóa vĩnh viễn lớp này</p>
                                <TextField
                                    className="w-full"
                                    size="small"
                                    value={confirm}
                                    onInput={(e) => {
                                        setConfirm(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button color="error" variant="contained" onClick={deleteClass} autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
