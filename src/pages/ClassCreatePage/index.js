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

function ClassCreatePage() {
    const [nameState, setNameState] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [categoryState, setCategoryState] = useState();
    const [visibleState, setVisibleState] = useState();
    const [textData, setTextData] = useState();
    const [avatar, setAvatar] = useState();
    const [video, setVideo] = useState();
    const [fee, setFee] = useState(0);

    const location = useLocation();
    useEffect(() => {
        categoryService.getCategorys().then((data) => {
            if (data.length > 0) {
                setCategoryList(data);
            }
        });
    }, [location]);

    const navigate = useNavigate();

    const submit = () => {
        const obj = {
            name: nameState,
            status: 1,
            visiable: 1,
            category: {
                id: categoryState,
            },
            videoData: video,
            fee: fee,
            avatar: avatar,
            content: textData,
        };

        classService.postClass(obj).then((data) => {
            if (data.id) {
                navigate('/class/' + data.id + '/setting');
            }
        });
    };

    const uploadFile = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setVideo(reader.result);
                    console.log('UPLOAD');
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
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

    return (
        <div>
            <h1 className="font-bold text-2xl my-6">Tạo lớp</h1>
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
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                            <Select
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
                </div>
                <div className="w-full">
                    <h3 className="text-xl font-bold">Phí tham gia (Để 0 nếu miễn phí)</h3>
                    <div className="w-full">
                        <TextField
                            className="w-full"
                            value={fee}
                            onInput={(e) => {
                                setFee(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full my-6">
                <h3 className="text-xl font-bold">Nội dung giới thiệu</h3>
                <RichTextEditor setData={setTextData} />
            </div>
            <div className="my-4">
                <h3 className="text-xl font-bold">Video giới thiệu</h3>
                <TextField
                    value={video}
                    onChange={(e) => {
                        setVideo(e.target.value);
                    }}
                />
            </div>
            <div className="my-4">
                <h3 className="text-xl font-bold">Ảnh đại diện</h3>
                <input type="file" onChange={uploadImage} />
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
