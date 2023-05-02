import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FolderItem({ itemData = {} }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={(e) => {
                navigate('/question-bank/' + itemData.id);
            }}
            className="p-4 hover:bg-slate-100 max-w-full duration-200 cursor-pointer rounded"
        >
            <div>
                <Avatar
                    variant="square"
                    src="https://cdn-icons-png.flaticon.com/512/3767/3767084.png"
                    sx={{ width: '64px', height: '64px' }}
                />
            </div>
            <div className="max-w-[200px] overflow-hidden truncate">{itemData.name}</div>
        </div>
    );
}

export default FolderItem;
