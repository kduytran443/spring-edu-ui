import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classMemberService } from '~/services/classMemberService';
import { userDataService } from '~/services/userDataService';

function DialogAddNewMember({ role, classId, currentList = [] }) {
    const navigate = useNavigate();
    const [alertState, setAlertState] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setSearchValue('');
        setSearchUserState({});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [searchValue, setSearchValue] = useState('');
    const [searchUserState, setSearchUserState] = useState({});
    const [canAddState, setCanAddState] = useState(false);

    const checkInCurrentList = (username) => {
        let result = false;
        currentList.forEach((item) => {
            if (item.username === username) {
                result = true;
            }
        });
        return result;
    };

    const [errorState, setErrorState] = useState('');

    const cancel = () => {
        handleClose();
    };

    const inviteUserToClass = () => {
        const classMember = {
            classId: classId,
            classRole: role,
            memberAccepted: 0,
            classAccepted: 1,
            userId: searchUserState.id,
        };

        classMemberService.inviteClassMember(classMember).then((data) => {
            if (data) {
                console.log('lời mời', data);
                setAlertState('Đã gửi lời mời!');
                setTimeout(() => {
                    handleClose();
                }, 2000);
            } else {
            }
        });
    };

    const submit = () => {
        inviteUserToClass();
    };

    const getUser = () => {
        userDataService.getUserByUsername(searchValue).then((data) => {
            if (data.id) {
                if (checkInCurrentList(data.username)) {
                    setErrorState('Người này đã có trong lớp');
                    setCanAddState(false);
                } else {
                    setErrorState('');
                    setSearchUserState(data);
                    setCanAddState(true);
                }
            } else {
                setSearchUserState({});
                setErrorState('Không tìm thấy người này.');
                setCanAddState(false);
            }
        });
    };

    const viewUser = () => {
        getUser();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {role === 'student' && 'Mời học viên'} {role === 'supporter' && 'Mời giáo viên'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-[330px] md:w-[400px]">
                            {!alertState ? (
                                <>
                                    <div className="w-full flex flex-row items-center">
                                        <div className="my-2 w-full">
                                            <TextField
                                                label="Username"
                                                size="small"
                                                className="w-full"
                                                value={searchValue}
                                                onInput={(e) => {
                                                    setSearchValue(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Button onClick={viewUser}>Xem</Button>
                                        </div>
                                    </div>
                                    {errorState && <div className="text-red-600">*{errorState}</div>}
                                    <div className="w-full">
                                        {searchUserState.username && (
                                            <div className="w-full flex flex-row items-center p-4 rounded border slate-200">
                                                <div className="mr-4">
                                                    <Avatar src={searchUserState.avatar} />
                                                </div>
                                                <div>{searchUserState.username}</div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div>{alertState}</div>
                            )}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel}>Hủy</Button>
                    <Button variant="contained" disabled={!canAddState} onClick={submit} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogAddNewMember;
