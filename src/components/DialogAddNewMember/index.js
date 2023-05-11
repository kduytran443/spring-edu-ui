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
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classMemberService } from '~/services/classMemberService';
import { classService } from '~/services/classService';
import { notificationService } from '~/services/notificationService';
import { userDataService } from '~/services/userDataService';
import { NotificationSocketContext } from '../NotificationSocketProvider';
import { renderToVND } from '~/utils';

function DialogAddNewMember({ role, reload = () => {}, classId, currentList = [] }) {
    const navigate = useNavigate();
    const [alertState, setAlertState] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setSearchValue('');
        setSearchUserState({});
        setOpen(true);
        setAlertState();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendContext = useContext(NotificationSocketContext);
    const [searchValue, setSearchValue] = useState('');
    const [discountPercent, setDiscountPercent] = useState(100);
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

    const [classDataState, setClassDataState] = useState({});
    useEffect(() => {
        classService.getClassIntroById(classId).then((data) => {
            setClassDataState(data);
        });
    }, []);

    const inviteUserToClass = () => {
        const classMember = {
            classId: classId,
            classRole: role,
            memberAccepted: 0,
            classAccepted: 1,
            userId: searchUserState.id,
            discount: discountPercent,
        };

        if (!discountPercent) {
            classMember.discount = 0;
        }

        classMemberService.inviteClassMember(classMember).then((data) => {
            if (data) {
                setAlertState('Đã gửi lời mời!');
                reload();
                setTimeout(() => {
                    const obj = {
                        content: `Bạn có lời mời trở thành ${role === 'supporter' ? 'trợ giang' : 'học viên'} của: ${
                            classDataState.name
                        } ${discountPercent && 'với tỉ lệ giảm giá ' + discountPercent + '%'}`,
                        redirectUrl: '/class/' + classId + '/intro',
                        receiverIds: [searchUserState.id],
                    };

                    notificationService.post(obj).then((data) => {
                        setTimeout(() => {
                            sendContext([searchUserState.id]);
                        }, 3000);
                    });
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
                    {role === 'student' && 'Mời học viên'} {role === 'supporter' && 'Mời trợ giảng'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="md:w-[400px]">
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
                                                onKeyUp={(e) => {
                                                    if (e.key == 'Enter') {
                                                        viewUser();
                                                    }
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
                                            <div className="w-full">
                                                <div className="w-full flex flex-row flex-wrap items-center p-4 rounded border slate-200">
                                                    <div className="mr-4">
                                                        <Avatar src={searchUserState.avatar} />
                                                    </div>
                                                    <div>{searchUserState.username}</div>
                                                </div>
                                                {role === 'student' && (
                                                    <div className="w-full mt-4">
                                                        <TextField
                                                            label="Phần trăm giảm giá"
                                                            size="small"
                                                            className="w-full"
                                                            value={discountPercent}
                                                            type="number"
                                                            onInput={(e) => {
                                                                if (e.target.value >= 0 && e.target.value <= 100) {
                                                                    setDiscountPercent(e.target.value);
                                                                }
                                                            }}
                                                        />
                                                        <div className="w-full flex flex-row items-center justify-between">
                                                            <div>Phí ban đầu: {renderToVND(classDataState.fee)}</div>
                                                            <div className="font-bold">
                                                                Phí còn lại:
                                                                {renderToVND(
                                                                    classDataState.fee -
                                                                        classDataState.fee * (discountPercent / 100),
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
                {!alertState && (
                    <DialogActions>
                        <Button onClick={cancel}>Hủy</Button>
                        <Button variant="contained" disabled={!canAddState} onClick={submit} autoFocus>
                            Thêm
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}

export default DialogAddNewMember;

/*

luanvanctu_nguyenvana@gmail.com
luanvanctu_nguyenvanb@gmail.com

nienluanctu2023user_b@gmail.com
nienluanctu2023user_a@gmail.com

*/
