import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Avatar, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { Box } from '@mui/system';
import { userDataService } from '~/services/userDataService';

export default function AdminCreateUserDialog({ loadData = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        clear();
        setNewAdminDataState({
            avatar: '',
            username: '',
            fullname: '',
            password: '',
            gender: '',
            birthYear: '',
            phoneNumber: '',
            email: '',
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newAdminDataState, setNewAdminDataState] = useState({
        avatar: '',
        username: '',
        fullname: '',
        password: '',
        gender: '',
        birthYear: '',
        phoneNumber: '',
        email: '',
    });

    const [repasswordState, setRepasswordState] = useState('');

    const onInputNewAdmin = (property, value) => {
        setNewAdminDataState((pre) => {
            return { ...pre, [property]: value };
        });
    };

    const avatarRef = useRef();

    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repasswordError, setRepasswordError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [birthYearError, setBirthYearError] = useState('');
    const [emailError, setEmailError] = useState('');
    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const fileSize = file.size / 1024 / 1024;
                    if (fileSize <= 1) {
                        setAvatarError('');
                        setNewAdminDataState((pre) => {
                            return { ...pre, avatar: reader.result };
                        });
                    } else {
                        setAvatarError('Vượt quá dung lượng cho phép (1MB)');
                    }
                    avatarRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
        setAvatarError('');
    };

    const clear = () => {
        setUsernameError('');
        setAvatarError('');
        setFullnameError('');
        setPasswordError('');
        setRepasswordError('');
        setGenderError('');
        setBirthYearError('');
        setPhoneNumberError('');
    };

    const [success, setSuccess] = useState(false);
    const check = () => {
        let valid = true;

        if (!newAdminDataState.avatar) {
            setAvatarError('Chưa upload ảnh đại diện');
            valid = false;
        } else {
            setAvatarError('');
        }

        if (!newAdminDataState.username) {
            setUsernameError('Username không hợp lệ');
            valid = false;
        } else {
            setUsernameError('');
        }

        if (
            !newAdminDataState.birthYear ||
            Number(newAdminDataState.birthYear) > 2008 ||
            Number(newAdminDataState.birthYear) < 1950
        ) {
            setBirthYearError('Năm sinh không hợp lệ');
            valid = false;
        } else {
            setBirthYearError('');
        }

        if (
            !newAdminDataState.phoneNumber ||
            newAdminDataState.phoneNumber.length < 10 ||
            newAdminDataState.phoneNumber.length > 11
        ) {
            setPhoneNumberError('Số điện thoại không hợp lệ');
        } else {
            setPhoneNumberError('');
        }

        if (newAdminDataState.fullname.length < 8) {
            setFullnameError('Họ tên ít nhất 8 kí tự');
            valid = false;
        } else {
            setFullnameError('');
        }

        if (!newAdminDataState.password && newAdminDataState.password.length < 6) {
            setPasswordError('Mật khẩu ít nhất 6 kí tự');
            valid = false;
        } else {
            setPasswordError('');
        }

        var emailRegex = /^[0-9a-zA-Z]+(@gmail.com)$/;
        if (newAdminDataState.email.length === 0 || !newAdminDataState.email.match(emailRegex)) {
            console.log('EMAIL error', newAdminDataState.email);
            setEmailError('Email không hợp lệ');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!(newAdminDataState.password === repasswordState)) {
            setRepasswordError('Mật khẩu nhập lại không chính xác');
            valid = false;
        } else {
            setRepasswordError('');
        }

        if (!newAdminDataState.gender) {
            setGenderError('Chưa chọn giới tính');
            valid = false;
        } else {
            setGenderError('');
        }
        return valid;
    };

    const [errorState, setErrorState] = useState('');

    const submit = () => {
        if (check()) {
            userDataService.signUpAdmin(newAdminDataState).then((data) => {
                if (data.id) {
                    setSuccess(true);
                    loadData();
                    setTimeout(() => {
                        setSuccess(false);
                        handleClose();
                    }, 2000);
                } else {
                    setErrorState(data.message);
                }
            });
            clear();
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm quản trị viên
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thêm quản trị viên</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[500px]">
                            <AlertSuccessDialog open={success} />
                            <div className="flex flex-col w-full">
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.username}
                                        className="w-full"
                                        onInput={(e) => {
                                            var letterNumber = /^[0-9a-zA-Z]+$/;
                                            setUsernameError('');
                                            if (e.target.value.match(letterNumber) || e.target.value === '') {
                                                setNewAdminDataState((pre) => {
                                                    return { ...pre, username: e.target.value };
                                                });
                                            }
                                        }}
                                        label="Username"
                                    />
                                    {usernameError && <div className="text-red-500">*{usernameError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        type="password"
                                        value={newAdminDataState.password}
                                        className="w-full"
                                        onInput={(e) => {
                                            setPasswordError('');
                                            if (!e.target.value.includes(' ')) {
                                                setNewAdminDataState((pre) => {
                                                    return { ...pre, password: e.target.value };
                                                });
                                            }
                                        }}
                                        label="Password"
                                    />
                                    {passwordError && <div className="text-red-500">*{passwordError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={repasswordState}
                                        type="password"
                                        className="w-full"
                                        onInput={(e) => {
                                            if (!e.target.value.includes(' ')) {
                                                setRepasswordState(e.target.value);
                                            }
                                        }}
                                        label="Nhập lại password"
                                    />
                                    {repasswordError && <div className="text-red-500">*{repasswordError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.email}
                                        className="w-full"
                                        onInput={(e) => {
                                            setEmailError('');
                                            setNewAdminDataState((pre) => {
                                                return { ...pre, email: e.target.value };
                                            });
                                        }}
                                        label="Email"
                                    />
                                    {emailError && <div className="text-red-500">*{emailError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.fullname}
                                        className="w-full"
                                        onInput={(e) => {
                                            setFullnameError('');
                                            onInputNewAdmin('fullname', e.target.value);
                                        }}
                                        label="Họ và tên"
                                    />
                                    {fullnameError && <div className="text-red-500">*{fullnameError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.phoneNumber}
                                        className="w-full"
                                        type="number"
                                        onInput={(e) => {
                                            setPhoneNumberError('');
                                            onInputNewAdmin('phoneNumber', e.target.value);
                                        }}
                                        label="Số điện thoại"
                                    />
                                    {phoneNumberError && <div className="text-red-500">*{phoneNumberError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.birthYear}
                                        className="w-full"
                                        type="number"
                                        onInput={(e) => {
                                            setBirthYearError('');
                                            onInputNewAdmin('birthYear', e.target.value);
                                        }}
                                        label="Năm sinh"
                                    />
                                    {birthYearError && <div className="text-red-500">*{birthYearError}</div>}
                                </div>
                                <div className="my-4">
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={newAdminDataState.gender}
                                                defaultValue={newAdminDataState.gender}
                                                label="Giới tính"
                                                onChange={(e) => {
                                                    setGenderError('');
                                                    onInputNewAdmin('gender', e.target.value);
                                                }}
                                            >
                                                <MenuItem key={'male'} value={'male'}>
                                                    Nam
                                                </MenuItem>
                                                <MenuItem key={'female'} value={'female'}>
                                                    Nữ
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {genderError && <div className="text-red-500">*{genderError}</div>}
                                </div>
                                <div className="my-2">
                                    <h3>Ảnh đại diện (ít hơn 1MB)</h3>
                                    <div>
                                        <input type="file" onChange={uploadAvatar} />
                                    </div>
                                    {avatarError && <div className="text-red-500">*{avatarError}</div>}
                                    {newAdminDataState.avatar && (
                                        <div className="my-4">
                                            <Avatar
                                                sx={{ width: '64px', height: '64px' }}
                                                src={newAdminDataState.avatar}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errorState && (
                                <div>
                                    <Alert severity="error">{errorState}</Alert>
                                </div>
                            )}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={submit} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
