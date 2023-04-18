import { text } from '@fortawesome/fontawesome-svg-core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadFile } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation, useNavigate } from 'react-router-dom';
import RichTextEditor from '~/components/RichTextEditor';
import UploadWidget from '~/components/UploadWidget';
import { categoryService } from '~/services/categoryService';
import { classService } from '~/services/classService';
import { validateEmail } from '~/utils';

function ClassCreatePage() {
    const [nameState, setNameState] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [categoryState, setCategoryState] = useState();
    const [textData, setTextData] = useState();
    const [avatar, setAvatar] = useState();
    const [video, setVideo] = useState();
    const [fee, setFee] = useState();
    const [paypalAccount, setPaypalAccount] = useState('');

    const [nameError, setNameError] = useState();
    const [categoryError, setCategoryError] = useState();
    const [visibleError, setVisibleError] = useState();
    const [textDataError, setTextDataError] = useState();
    const [avatarError, setAvatarError] = useState();
    const [emailError, setemailError] = useState();

    const location = useLocation();
    useEffect(() => {
        categoryService.getCategorys().then((data) => {
            if (data.length > 0) {
                setCategoryList(data);
            }
        });
    }, [location]);

    const navigate = useNavigate();

    const check = () => {
        let valid = true;

        if (!nameState) {
            valid = false;
            setNameError('Tên không được bỏ trống');
        }

        if (!categoryState) {
            valid = false;
            setCategoryError('Chưa chọn danh mục');
        }

        if (!textData) {
            valid = false;
            setTextDataError('Nội dung giới thiệu không được bỏ trống');
        }

        if (!avatar) {
            valid = false;
            setAvatarError('Chưa upload ảnh đại diện');
        }

        if (fee > 0 && !validateEmail(paypalAccount)) {
            valid = false;
            setemailError('Email không đúng định dạng');
        }

        return valid;
    };

    const submit = () => {
        const obj = {
            name: nameState,
            status: 1,
            visiable: 1,
            category: {
                id: categoryState,
            },
            videoData: video,
            avatar: avatar,
            content: textData,
        };
        if (fee) {
            obj.fee = fee;
            obj.paypalAccount = paypalAccount;
        } else {
            obj.fee = 0;
        }

        if (check()) {
            classService.postClass(obj).then((data) => {
                if (data.id) {
                    navigate('/class/' + data.id + '/setting');
                }
            });
        }
    };

    const uploadImage = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                if (file.size <= 1024 * 1024) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setAvatar(reader.result);
                        setAvatarError('');
                    };
                    reader.onerror = (error) => {
                        console.log('error uploading!');
                    };
                } else {
                    setAvatarError('Hình ảnh phải dưới 1MB');
                }
            }
        }
    };

    return (
        <div className="p-4 md:p-0">
            <h1 className="font-bold text-2xl my-6">
                <FontAwesomeIcon icon={faPlus} /> Tạo lớp
            </h1>
            <div>
                <div className="w-full">
                    <h3 className="text-xl font-bold">Tên lớp</h3>
                    <div className="w-full">
                        <TextField
                            className="w-full"
                            value={nameState}
                            onInput={(e) => {
                                setNameState(e.target.value);
                            }}
                            error={nameError}
                        />
                    </div>
                    {nameError && <div className="text-red-500">*{nameError}</div>}
                </div>
                <div className="my-4">
                    <h3 className="text-xl font-bold">Danh mục</h3>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                            <Select
                                error={categoryError}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryState}
                                defaultValue={categoryState}
                                label="Chủ đề"
                                onChange={(e) => {
                                    setCategoryState(e.target.value);
                                }}
                            >
                                {categoryList.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    {categoryError && <div className="text-red-500">*{categoryError}</div>}
                </div>
                <div className="w-full">
                    <h3 className="text-xl font-bold">Phí tham gia (optional)</h3>
                    <div className="w-full">
                        <TextField
                            className="w-full"
                            value={fee}
                            type={'number'}
                            onInput={(e) => {
                                if (e.target.value >= 0) {
                                    setFee(e.target.value);
                                } else {
                                    setPaypalAccount('');
                                }
                                if (!e.target.value) {
                                    setPaypalAccount('');
                                }
                            }}
                        />
                    </div>
                </div>
                {!(fee <= 0 || !fee) && (
                    <div className="w-full mt-2">
                        <h3 className="text-xl font-bold">Tài khoản paypal</h3>
                        <div className="w-full">
                            <TextField
                                disabled={fee <= 0 || !fee}
                                className="w-full"
                                value={paypalAccount}
                                type={'email'}
                                onInput={(e) => {
                                    setPaypalAccount(e.target.value);
                                }}
                                error={emailError}
                            />
                        </div>
                        {emailError && <div className="text-red-500">*{emailError}</div>}
                    </div>
                )}
            </div>
            <div className="w-full my-6">
                <h3 className="text-xl font-bold">Nội dung giới thiệu</h3>
                <RichTextEditor setData={setTextData} />
                {textDataError && <div className="text-red-500">*{textDataError}</div>}
            </div>
            <div className="my-4">
                <h3 className="text-xl font-bold">
                    <FontAwesomeIcon icon={faYoutube} />
                    Video giới thiệu (optional)
                </h3>
                <TextField
                    className="w-full"
                    value={video}
                    onChange={(e) => {
                        setVideo(e.target.value);
                    }}
                />
            </div>
            <div className="my-4">
                <h3 className="text-xl font-bold">Ảnh đại diện</h3>
                <input type="file" onChange={uploadImage} />
                {avatar && (
                    <div className="max-w-[280px]">
                        <img alt="avatar" src={avatar} />
                    </div>
                )}
                {avatarError && <div className="text-red-500">*{avatarError}</div>}
            </div>
            <div
                onClick={submit}
                className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tạo lớp
            </div>
        </div>
    );
}

export default ClassCreatePage;
