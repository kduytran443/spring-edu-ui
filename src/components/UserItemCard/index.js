import { Avatar } from '@mui/material';

function UserItemCard({ avatar, name, size = '48px' }) {
    return (
        <div className="flex flex-row items-center p-2 select-none cursor-pointer duration-100">
            <Avatar style={{ width: size, height: size }} src={avatar} />
            <span className="font-bold ml-2">{name}</span>
        </div>
    );
}

export default UserItemCard;
