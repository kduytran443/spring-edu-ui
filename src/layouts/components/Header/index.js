import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import CustomizedInputBase from '~/components/CustomizedInputBase';
import { LOGIN_PAGE_URL } from '~/constants';
import { authorize } from '~/services/userService';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
    const navigate = useNavigate();
    const [authenticatedState, setAuthenticatedState] = useState(true);

    return (
        <header className="w-full">
            <div className="w-full h-header-height shadow border-slate-200 border-b-[1px] flex flex-row justify-between items-center px-4">
                <div className="md:hidden block">
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className="md:hidden block">
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                </div>
                <div className="h-full  flex-row justify-center items-center md:flex hidden">
                    <img alt="logo" src={images.logo} className="h-full p-2" />
                    <h1 className="font-black text-xl ">Spring Edu</h1>
                </div>
                <div className="md:block hidden">
                    <CustomizedInputBase />
                </div>
                {authenticatedState ? (
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={
                            'https://vcdn1-ngoisao.vnecdn.net/2021/10/15/messi1-8720-1634293782.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=hTOVrO1AGptYaG7l17xfPw'
                        }
                    />
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
