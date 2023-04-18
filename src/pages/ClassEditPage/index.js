import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPen, faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadFile } from '@mui/icons-material';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import RichTextEditor from '~/components/RichTextEditor';
import UploadWidget from '~/components/UploadWidget';
import { categoryService } from '~/services/categoryService';
import { classService } from '~/services/classService';
import { inputNumber, validateEmail } from '~/utils';

function ClassEditPage() {
    const [nameState, setNameState] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [categoryState, setCategoryState] = useState();
    const [visibleState, setVisibleState] = useState();
    const [textData, setTextData] = useState(null);
    const [avatar, setAvatar] = useState();
    const [video, setVideo] = useState();
    const [fee, setFee] = useState(0);
    const { classId } = useParams();
    const [paypalAccount, setPaypalAccount] = useState('');

    const [nameError, setNameError] = useState();
    const [categoryError, setCategoryError] = useState();
    const [visibleError, setVisibleError] = useState();
    const [textDataError, setTextDataError] = useState();
    const [avatarError, setAvatarError] = useState();
    const [emailError, setemailError] = useState();

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

    const location = useLocation();
    useEffect(() => {
        categoryService.getCategorys().then((data) => {
            if (data.length > 0) {
                setCategoryList(data);
            }
        });
    }, [location]);

    const navigate = useNavigate();

    const [success, setSuccess] = useState(0);

    const submit = () => {
        if (check()) {
            const obj = {
                name: nameState,
                status: 1,
                id: classId,
                visiable: 1,
                category: {
                    id: categoryState,
                },
                videoData: video,
                fee: fee,
                avatar: avatar,
                content: textData,
                paypalAccount: paypalAccount,
            };

            classService.putClass(obj).then((data) => {
                if (data.id) {
                    setSuccess(1);
                    setTimeout(() => {
                        navigate('/class/' + data.id + '/setting');
                    }, 1000);
                } else {
                    setSuccess(-1);
                    setTimeout(() => {
                        setSuccess(0);
                    }, 1000);
                }
            });
        } else {
            setSuccess(-1);
            setTimeout(() => {
                setSuccess(0);
            }, 1000);
        }
    };
    const uploadImage = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setAvatar(reader.result);
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    useEffect(() => {
        classService.getClassIntroById(classId).then((data) => {
            if (data.id) {
                setNameState(data.name);
                setCategoryState(data.categoryId);
                setTextData(data.textData);
                setAvatar(data.avatar);
                setVideo(data.video);
                setFee(data.fee);
                setPaypalAccount(data.paypalAccount);
            }
        });
    }, [location]);

    return (
        <div className="p-4 md:p-0">
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId + '/setting');
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Quay lại
                </Button>
            </div>
            <h1 className="font-bold text-2xl my-6">Sửa lớp</h1>
            <AlertSuccessDialog open={success === 1} />
            <AlertFailDialog open={success === -1} />
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
                        />
                    </div>
                </div>
                <div className="my-4">
                    <h3 className="text-xl font-bold">Danh mục</h3>
                    {categoryState && (
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryState}
                                    defaultValue={categoryState}
                                    onChange={(e) => {
                                        setCategoryState(e.target.value);
                                    }}
                                    disabled
                                >
                                    {categoryList.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </div>
                <div className="w-full">
                    <h3 className="text-xl font-bold">Phí tham gia (optional)</h3>
                    <div className="w-full">
                        <TextField
                            className="w-full"
                            value={fee}
                            onInput={(e) => {
                                inputNumber(e.target.value, setFee);
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
                {textData !== null && <RichTextEditor data={textData} setData={setTextData} />}
            </div>
            <div className="my-4">
                <h3 className="text-xl font-bold">
                    <FontAwesomeIcon icon={faYoutube} /> Video giới thiệu (optional)
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
            </div>
            <div
                onClick={submit}
                className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
            >
                <FontAwesomeIcon icon={faPen} className="mr-2" /> Sửa lớp
            </div>
        </div>
    );
}

export default ClassEditPage;
