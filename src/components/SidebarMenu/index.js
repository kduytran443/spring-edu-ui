import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import { CALENDAR_PAGE_URL, HOME_PAGE_URL } from '~/constants';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import BallotIcon from '@mui/icons-material/Ballot';

function SidebarMenu({ preAction = () => {} }) {
    const location = useLocation();
    console.log('hash', location.hash);
    console.log('pathname', location.pathname);
    console.log('search', location.search);

    const selected = false;

    const navigate = useNavigate();

    const doNavigate = (url) => {
        preAction();
        navigate(url);
    };

    return (
        <ul className="flex flex-col items-center mt-8">
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate(HOME_PAGE_URL);
                }}
            >
                <HomeIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Trang chủ</span>
            </li>

            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
            >
                <SchoolIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Đã đăng ký</span>
            </li>
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate(CALENDAR_PAGE_URL);
                }}
            >
                <CalendarMonthIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Lịch</span>
            </li>
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
            >
                <BallotIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold text-center">Việc cần làm</span>
            </li>
            <li>
                <IconButton aria-label="other" size="large" style={{ width: '64px', height: '64px' }}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </IconButton>
            </li>
        </ul>
    );
}

export default SidebarMenu;
