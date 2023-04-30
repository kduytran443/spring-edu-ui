import { faEdit, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { topicService } from '~/services/topicService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { useContext } from 'react';
import { NotificationSocketContext } from '../NotificationSocketProvider';
import { classMemberService } from '~/services/classMemberService';
import { notificationService } from '~/services/notificationService';

function DeleteMemberDialog({ userId, transaction, classDataState = {}, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const { classId } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const sendContext = useContext(NotificationSocketContext);

    const submit = () => {
        classMemberService.deleteClassMember({ userId: userId, classId: classId }).then((data) => {
            reload();
            setAlert(true);

            setTimeout(() => {
                setAlert(false);
                handleClose();
            }, 1000);
            const obj = {
                content: 'Bạn đã bị xóa khỏi lớp: ' + classDataState.name,
                redirectUrl: '/class/' + classId + '/intro',
                receiverIds: [userId],
            };

            notificationService.post(obj).then((data) => {
                setTimeout(() => {
                    sendContext([userId]);
                }, 3000);
            });
        });
    };

    return (
        <div className="w-full">
            <Button
                color="error"
                disabled={transaction}
                onClick={handleClickOpen}
                size="small"
                startIcon={<FontAwesomeIcon icon={faTrash} />}
            >
                Xóa
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa thành viên</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert} />
                        <div className="my-2 md:w-[320px] flex flex-col">Xác nhận xóa thành viên này khỏi lớp</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="error" variant="contained" onClick={submit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteMemberDialog;
