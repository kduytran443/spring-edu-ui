import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE_URL, LOGIN_PAGE_URL } from '~/constants';
import { getUserInfo } from '~/services/userService';

function PersonalPage() {
    const [userState, setUserState] = useState(() => {
        const obj = getUserInfo();
        console.log(obj);
        return obj;
    });

    const navigate = useNavigate();

    useEffect(() => {
        const doFetch = async () => {
            const getUser = getUserInfo();
            getUser.then((data) => {
                setUserState(data);
            });
        };
        doFetch();
    }, []);

    return (
        <div>
            <h1 className="font-black text-4xl ml-4 my-4 mb-8">Trang cá nhân</h1>
            <div className="flex flex-col items-center md:flex-row justify-center md:items-start">
                <Avatar sx={{ width: 264, height: 264 }} src={userState.avatar} />
                <div className="flex-1 px-8 flex flex-col justify-between">
                    <span className="font-black text-2xl">{userState.fullname}</span>
                    <span className="text-2xl">Ngày sinh: 05/11/2001</span>
                    <span className="text-2xl">Giới tính: {userState.gender}</span>
                    <span className="text-2xl">Email: {userState.email}</span>
                    <span className="text-2xl">Số điện thoại: +{userState.phoneNumber}</span>
                    <span className="text-2xl">Vai trò: {userState.role === 'ADMIN' ? 'Admin' : 'Người dùng'}</span>
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;
