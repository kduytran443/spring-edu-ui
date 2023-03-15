import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { classMemberService } from '~/services/classMemberService';

function InvitedClassMember({ username = 'nguyena', userId, date, classId, avatar, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const cancelInvited = () => {
        classMemberService.deleteClassMember({ userId: userId, classId: classId }).then((data) => {
            reload();
        });
    };

    const submit = () => {
        cancelInvited();
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
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Hủy
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
                                    Xác nhận xóa lời mời <b>{username}</b>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Hủy</Button>
                            <Button onClick={submit} autoFocus>
                                Xác nhận
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default InvitedClassMember;
