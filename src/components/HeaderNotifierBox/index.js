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
import { Button } from '@mui/material';
function HeaderNotifierBox() {
    const [someLastNotifyState, setSomeLastNotifyState] = useState([
        {
            id: 1,
            content: 'Mr.Beast đã đăng ký lớp học "Nấu ăn" của bạn',
            date: new Date(2023, 0, 28, 20, 0),
        },
        {
            id: 2,
            content: 'Mr.Beast đã đăng ký lớp học "Nấu ăn" của bạn',
            date: new Date(2023, 0, 28, 20, 0),
        },
    ]);

    return (
        <div className="bg-white p-2 w-[300px] border-[1px] border-slate-300 min-h-[100px] shadow-lg rounded-lg flex flex-col">
            <ul>
                {someLastNotifyState.map((notify, index) => {
                    return (
                        <li className="flex flex-col my-2 cursor-pointer hover:bg-slate-100 p-4" key={index}>
                            <div className="text-gray-500">{notify.date.toDateString()}</div>
                            <div>{notify.content}</div>
                        </li>
                    );
                })}
            </ul>
            <Button>Xem tất cả</Button>
        </div>
    );
}

export default HeaderNotifierBox;
