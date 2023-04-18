import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { userDataService } from '~/services/userDataService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { classService } from '~/services/classService';
import { categoryService } from '~/services/categoryService';
import { useRef } from 'react';

export default function UpdateCategoryDialog({ id, button = 'Thêm', alreadyList = [], reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        clear();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [success, setSuccess] = useState(false);

    const [dataState, setDataState] = useState({
        name: '',
        code: '',
        description: '',
    });

    const [imageState, setimageState] = useState();

    const [nameError, setNameError] = useState();
    const [imageError, setimageError] = useState();
    const [codeError, setcodeError] = useState();
    const [descriptionError, setdescriptionError] = useState();
    const avatarRef = useRef();

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
                        setimageError('');
                        setimageState(reader.result);
                    } else {
                        setimageError('Vượt quá dung lượng cho phép (1MB)');
                    }
                    avatarRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
        setimageError('');
    };

    const clear = () => {
        setDataState({
            name: '',
            code: '',
            description: '',
        });
        setdescriptionError('');
        setNameError('');
        setcodeError('');
        setcodeError('');
        setimageError('');
    };

    const check = () => {
        let valid = true;
        console.log('CHẤM HỎI');

        if (!dataState.name.trim()) {
            valid = false;
            setNameError('Tên không hợp lệ');
        }
        if (dataState.code.trim()) {
            const index = alreadyList.indexOf(dataState.code.trim());
            if (index !== -1) {
                valid = false;
                setcodeError('Code đã tồn tại');
            }
        } else {
            valid = false;
            setcodeError('Code không hợp lệ');
        }

        if (!imageState) {
            setimageError('Chưa có hình ảnh');
            valid = false;
        }

        if (!dataState.description.trim()) {
            setdescriptionError('Mô tả không hợp lệ');
            valid = false;
        }

        return valid;
    };
    const submit = () => {
        if (check()) {
            const obj = { ...dataState };
            obj.image = imageState;
            if (dataState.id) {
                obj.id = dataState.id;
                categoryService.putCategory(obj).then((data) => {
                    setSuccess(true);
                    reload();
                    setTimeout(() => {
                        setSuccess(false);
                        handleClose();
                    }, 2000);
                });
            } else {
                categoryService.postCategory(obj).then((data) => {
                    setSuccess(true);
                    reload();
                    setTimeout(() => {
                        setSuccess(false);
                        handleClose();
                    }, 2000);
                });
            }
        }
    };

    useEffect(() => {
        if (id) {
            categoryService.getCategoryById(id).then((data) => {
                if (data.id) {
                    setDataState(data);
                    setimageState(data.image);

                    const index = alreadyList.indexOf(data.code.trim());
                    if (index !== -1) {
                        alreadyList.splice(index, 1);
                    }
                }
            });
        }
    }, [open]);

    return (
        <div>
            <Button color="primary" variant="contained" onClick={handleClickOpen}>
                {button}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{button} danh mục</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[400px]">
                            <AlertSuccessDialog message="Cập nhật thành công" open={success} />
                            <div className="flex flex-col w-full">
                                <h3>Danh mục</h3>
                                <div className="my-2 w-full">
                                    <TextField
                                        className="w-full"
                                        label="Tên"
                                        value={dataState.name}
                                        onChange={(e) => {
                                            setNameError('');
                                            setDataState((pre) => {
                                                return { ...pre, name: e.target.value };
                                            });
                                        }}
                                    />
                                    {nameError && <div className="text-red-600">*{nameError}</div>}
                                </div>
                                <div className="my-2 w-full">
                                    <TextField
                                        className="w-full"
                                        label="Code"
                                        value={dataState.code}
                                        onChange={(e) => {
                                            setcodeError('');
                                            setDataState((pre) => {
                                                return { ...pre, code: e.target.value };
                                            });
                                        }}
                                    />
                                    {codeError && <div className="text-red-600">*{codeError}</div>}
                                </div>
                                <div className="my-2 w-full">
                                    <TextField
                                        className="w-full"
                                        label="Mô tả ngắn"
                                        value={dataState.description}
                                        onChange={(e) => {
                                            setdescriptionError('');
                                            setDataState((pre) => {
                                                return { ...pre, description: e.target.value };
                                            });
                                        }}
                                    />
                                    {descriptionError && <div className="text-red-600">*{descriptionError}</div>}
                                </div>
                                <div className="my-2 w-full">
                                    <input type="file" onChange={uploadAvatar} ref={avatarRef} />
                                    {imageState && <img alt="" src={imageState} />}
                                    {imageError && <div className="text-red-600">*{imageError}</div>}
                                </div>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="primary" variant="contained" onClick={submit} autoFocus>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
