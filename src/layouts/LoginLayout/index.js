import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import { HOME_PAGE_URL } from '~/constants';
import SimpleFooter from '../components/SimpleFooter';

function LoginLayout({ children }) {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-100 min-h-screen w-full flex flex-col justify-between items-center pt-4">
            <div className="w-full relative">
                <Button
                    sx={{ borderRadius: 28 }}
                    variant="outlined"
                    className="left-4"
                    onClick={(e) => {
                        navigate(HOME_PAGE_URL);
                    }}
                >
                    <div className="flex flex-row justify-center items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        <span>Trang chủ</span>
                    </div>
                </Button>
            </div>
            <div className="flex flex-col items-center sm:flex-row flex-1 w-full justify-around flex-wrap">
                <div className="w-full max-w-[200px] sm:max-w-[320px] my-8">
                    <Logo />
                </div>
                {children}
            </div>
            <SimpleFooter />
        </div>
    );
}

export default LoginLayout;
