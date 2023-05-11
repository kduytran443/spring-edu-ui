import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { renderToTime } from '~/utils';
function HeaderNotifierBox({ dataList = [] }) {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    return (
        <div className="bg-white p-2 w-[300px] lg:w-[420px] border-[1px] border-slate-300 min-h-[100px] shadow-lg rounded-lg flex flex-col">
            <ul>
                {dataList.map((notify, index) => {
                    return index < page * 5 ? (
                        <li
                            onClick={(e) => {
                                navigate(notify.redirectUrl);
                            }}
                            className="flex flex-col my-2 cursor-pointer hover:bg-slate-100 p-4"
                            key={index}
                        >
                            <div className="flex flex-row items-center w-full">
                                <Avatar src={notify.senderAvatar} />
                                <div className="ml-4">{notify.senderFullname}</div>
                            </div>
                            <div className="text-gray-500 mt-2">{renderToTime(notify.time)}</div>
                            <div className="mt-2">{notify.content}</div>
                        </li>
                    ) : (
                        <></>
                    );
                })}
                {dataList.length === 0 && <div className="w-full p-6 text-center">Không có thông báo nào</div>}
            </ul>
            {page * 5 < dataList.length && (
                <Button
                    onClick={(e) => {
                        setPage((pre) => pre + 1);
                    }}
                >
                    Xem thêm
                </Button>
            )}
        </div>
    );
}

export default HeaderNotifierBox;
