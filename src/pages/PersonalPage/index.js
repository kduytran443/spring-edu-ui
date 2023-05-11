import { faCalendar, faCamera, faEdit, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { HOME_PAGE_URL, LOGIN_PAGE_URL, PERSONAL_EDIT_PAGE_URL, PERSONAL_PAGE_URL } from '~/constants';
import { certificationService } from '~/services/certificationService';
import { userDataService } from '~/services/userDataService';
import { getUserInfo } from '~/services/userService';
import { openInNewTab, renderToDate } from '~/utils';

function PersonalPage() {
    const [userState, setUserState] = useState(() => {
        const obj = getUserInfo();
        return obj;
    });

    const navigate = useNavigate();
    const location = useLocation();
    const doFetch = async () => {
        const getUser = getUserInfo();
        getUser.then((data) => {
            setUserState(data);
        });
    };
    useEffect(() => {
        doFetch();
    }, [location]);

    const avatarRef = useRef();

    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setUserState((pre) => {
                        return { ...pre, avatar: reader.result };
                    });
                    userDataService.updateUserAvatar({ avatar: reader.result }).then((data) => {});
                    avatarRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    const [certificationList, setCertificationList] = useState([]);
    const loadCertification = () => {
        certificationService.getByUsername(userState.username).then((data) => {
            if (data.length > 0) {
                setCertificationList(data);
            }
        });
    };
    useEffect(() => {
        if (userState.username) {
            loadCertification();
        }
    }, [userState]);

    return (
        <div>
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate(PERSONAL_PAGE_URL);
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Quay lại
                </Button>
            </div>
            <h1 className="font-black text-4xl ml-4 my-4 mb-8">Trang cá nhân</h1>
            <div className="flex flex-col items-center md:flex-row justify-center md:items-start">
                <div className="group bg-slate-800 rounded-full cursor-pointer relative duration-200 hover:shadow-md">
                    <div>
                        <Avatar
                            className="group-hover:opacity-80 duration-200"
                            src={userState.avatar}
                            sx={{ width: '240px', height: '240px' }}
                        />
                        <div
                            onClick={(e) => {
                                avatarRef.current.click();
                            }}
                            className="absolute bg-white rounded-full group-hover:opacity-100 opacity-0 duration-200 top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
                        >
                            <IconButton color="inherit" size="large">
                                <FontAwesomeIcon icon={faCamera} />
                            </IconButton>
                        </div>
                        <input type="file" onChange={uploadAvatar} style={{ display: 'none' }} ref={avatarRef} />
                    </div>
                </div>
                <div className="flex-1 px-8 flex flex-col justify-between">
                    <span className="font-black text-2xl">{userState.fullname}</span>
                    <span className="text-2xl">Năm sinh: {userState.birthYear}</span>
                    <span className="text-2xl">Giới tính: {userState.gender}</span>
                    <span className="text-2xl">Email: {userState.email}</span>
                    <span className="text-2xl">Số điện thoại: +{userState.phoneNumber}</span>
                    <span className="text-2xl">Vai trò: {userState.role === 'ADMIN' ? 'Admin' : 'Người dùng'}</span>
                </div>
            </div>
            <div className="flex flex-col mt-12 mb-6">
                <h2 className="font-black pl-4 text-4xl mb-4">Chứng nhận ({certificationList.length})</h2>
                <ul className="flex flex-col">
                    {certificationList.map((certification) => {
                        return (
                            <li
                                key={certification.id}
                                onClick={(e) => {
                                    openInNewTab('/certificate/' + certification.id);
                                }}
                                className="group flex flex-row hover:text-white items-center text-gray-600 cursor-pointer duration-100 hover:bg-blue-500 hover:shadow hover:shadow-blue-300 rounded-lg"
                            >
                                <div className="p-4 ">
                                    <img
                                        alt=""
                                        src={images.certification}
                                        className="w-[100px] md:w-[160px] rounded-full"
                                    />
                                </div>
                                <div className="flex-1 pl-2 md:pl-4">
                                    <div className="font-bold mb-2 text-lg">{certification.classDTO.name}</div>
                                    <div>
                                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                                        Ngày cấp: {renderToDate(certification.date)}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="mt-6">
                <Button onClick={(e) => navigate(PERSONAL_EDIT_PAGE_URL)} startIcon={<FontAwesomeIcon icon={faEdit} />}>
                    Thay đổi thông tin cá nhân
                </Button>
            </div>
        </div>
    );
}

export default PersonalPage;
