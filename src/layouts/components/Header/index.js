import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Button, IconButton } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import CustomizedInputBase from '~/components/CustomizedInputBase';
import { HOME_PAGE_URL, LOGIN_PAGE_URL } from '~/constants';
import { authorize, getUserInfo } from '~/services/userService';
import HomeIcon from '@mui/icons-material/Home';
import HeaderAvatar from '~/components/HeaderAvatar';
import FullScreenDialog from '~/components/FullScreenDialog';
import MobileHeaderMenu from '~/components/MobileHeaderMenu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeaderNotifier from '~/components/HeaderNotifier';
import { useUser } from '~/stores/UserStore';
import { useEffect } from 'react';

function Header() {
    const navigate = useNavigate();
    const [authenticatedState, setAuthenticatedState] = useState(true);
    const [userState, dispatchUserState] = useUser();

    return (
        <header className="sticky z-50 top-0 w-full relative bg-white">
            <div className="w-full h-header-height shadow border-slate-200 border-b-[1px] flex flex-row justify-between items-center px-4">
                <div className="md:hidden block">
                    <MobileHeaderMenu />
                </div>
                <div className="md:hidden flex flex-row items-center justify-center">
                    <IconButton
                        onClick={(e) => {
                            navigate('/search');
                        }}
                        sx={{ p: '10px' }}
                        aria-label="menu"
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
                <div
                    className="h-full  flex-row justify-center items-center md:flex hidden select-none cursor-pointer"
                    onClick={(e) => {
                        navigate(HOME_PAGE_URL);
                    }}
                >
                    <img alt="logo" src={images.logo} className="h-full p-2" />
                    <h1 className="font-black text-xl ">Spring Edu</h1>
                </div>
                <div className="md:block hidden">
                    <CustomizedInputBase />
                </div>
                {userState.username ? (
                    <div className="flex flex-row justify-center items-center">
                        <div className="mr-2">
                            {userState.role === 'ADMIN' ? (
                                <Button
                                    onClick={(e) => {
                                        navigate('/admin');
                                    }}
                                    startIcon={<FontAwesomeIcon icon={faUser} />}
                                >
                                    Admin
                                </Button>
                            ) : (
                                <Button
                                    onClick={(e) => {
                                        navigate('/create-class');
                                    }}
                                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                                >
                                    Tạo lớp
                                </Button>
                            )}
                        </div>
                        <div className="p-[10px] mr-4">
                            <HeaderNotifier />
                        </div>
                        <HeaderAvatar image={userState.avatar} username={userState.username} />
                    </div>
                ) : (
                    <div>
                        <Button
                            sx={{ borderRadius: 28 }}
                            variant="outlined"
                            onClick={(e) => {
                                navigate(LOGIN_PAGE_URL);
                            }}
                        >
                            <div className="flex flex-row justify-center items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                <span>Đăng nhập</span>
                            </div>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
