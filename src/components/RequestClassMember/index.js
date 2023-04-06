import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { classMemberService } from '~/services/classMemberService';
import { notificationService } from '~/services/notificationService';
import { NotificationSocketContext } from '../NotificationSocketProvider';

function RequestClassMember({ username = 'nguyena', userId, date, classId, classDataName, avatar, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const sendContext = useContext(NotificationSocketContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const cancelRequest = () => {
        classMemberService.deleteClassMember({ userId: userId, classId: classId }).then((data) => {
            reload();
            const obj = {
                content: 'Bạn đã bị từ chối trở thành học viên của: ' + classDataName,
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

    const acceptRequest = () => {
        classMemberService.acceptClassMember({ userId: userId, classId: classId }).then((data) => {
            reload();
            const obj = {
                content: 'Bạn đã được chấp nhận trở thành học viên của: ' + classDataName,
                redirectUrl: '/class/' + classId + '/',
                receiverIds: [userId],
            };

            notificationService.post(obj).then((data) => {
                setTimeout(() => {
                    sendContext([userId]);
                }, 3000);
            });
        });
    };

    const cancelUser = () => {
        cancelRequest();
        reload();
        handleClose();
    };

    const submitUser = () => {
        acceptRequest();
        handleClose();
    };

    return (
        <div>
            <div className="w-full flex bg-white hover:bg-blue-200 duration-100 flex-row items-center p-4 rounded border slate-200 justify-between">
                <div className="flex flex-row items-center">
                    <div className="mr-4">
                        <Avatar src={avatar} />
                    </div>
                    <div>{username}</div>
                </div>
                <div className="flex flex-row items-center">
                    <div>
                        <Button onClick={cancelUser} autoFocus>
                            Hủy
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Đồng ý
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{'Xác nhận'}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <div className="min-w-[300px]">
                                        Đồng ý chấp nhận <b>{username}</b>
                                    </div>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Hủy</Button>
                                <Button variant="contained" onClick={submitUser} autoFocus>
                                    Xác nhận
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestClassMember;
