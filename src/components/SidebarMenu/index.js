import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import {
    CALENDAR_PAGE_URL,
    HOME_PAGE_URL,
    INTRO_PAGE_URL,
    JOINED_CLASS_PAGE_URL,
    QUESTION_BANK_URL,
    WORK_PAGE_URL,
} from '~/constants';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import BallotIcon from '@mui/icons-material/Ballot';
import { useUser } from '~/stores/UserStore';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';

function SidebarMenu({ preAction = () => {} }) {
    const location = useLocation();

    const selected = false;

    const navigate = useNavigate();

    const doNavigate = (url) => {
        preAction();
        navigate(url);
    };

    const [userState, userDispatch] = useUser();

    return (
        <ul className="flex flex-col items-center mt-0 lg:mt-4">
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate(HOME_PAGE_URL);
                }}
            >
                <HomeIcon style={{ padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Trang chủ</span>
            </li>

            {userState.username && (
                <>
                    <li
                        className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                            selected && ' bg-gray-200 border-[1px] shadow'
                        }`}
                        onClick={(e) => {
                            doNavigate(JOINED_CLASS_PAGE_URL);
                        }}
                    >
                        <SchoolIcon style={{ padding: '4px', margin: '0' }} fontSize="large" />
                        <span className="text-xs font-bold">Lớp học</span>
                    </li>
                    <li
                        className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                            selected && ' bg-gray-200 border-[1px] shadow'
                        }`}
                        onClick={(e) => {
                            doNavigate(CALENDAR_PAGE_URL);
                        }}
                    >
                        <CalendarMonthIcon style={{ padding: '4px', margin: '0' }} fontSize="large" />
                        <span className="text-xs font-bold">Lịch</span>
                    </li>
                    <li
                        className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                            selected && ' bg-gray-200 border-[1px] shadow'
                        }`}
                        onClick={(e) => {
                            doNavigate(QUESTION_BANK_URL);
                        }}
                    >
                        <BallotIcon style={{ padding: '4px', margin: '0' }} fontSize="large" />
                        <span className="text-xs font-bold text-center">Question Bank</span>
                    </li>
                    <li
                        className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                            selected && ' bg-gray-200 border-[1px] shadow'
                        }`}
                        onClick={(e) => {
                            doNavigate(WORK_PAGE_URL);
                        }}
                    >
                        <WorkIcon style={{ padding: '4px', margin: '0' }} fontSize="large" />
                        <span className="text-xs font-bold text-center">Việc cần làm</span>
                    </li>
                </>
            )}

            <li>
                <IconButton aria-label="other" size="large" style={{ width: '64px', height: '64px' }}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </IconButton>
            </li>
        </ul>
    );
}

export default SidebarMenu;
/*
<li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate(INTRO_PAGE_URL);
                }}
            >
                <InfoIcon style={{ padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">About us</span>
            </li>
*/
