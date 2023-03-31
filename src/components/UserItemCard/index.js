import { Avatar } from '@mui/material';

function UserItemCard({ avatar, name, size = '48px', mark, maxMark, submitTime }) {
    console.log('user', mark, maxMark);
    return (
        <div className="flex flex-row items-center justify-between w-full p-2 select-none cursor-pointer duration-100">
            <div className="flex flex-row items-center">
                <Avatar style={{ width: size, height: size }} src={avatar} />
                <span className="font-bold ml-2">{name}</span>
            </div>
            {(mark >= 0 || maxMark) && (
                <div className="ml-6">
                    {mark !== null ? (
                        <>
                            <span className="text-green-500 font-bold">{mark}</span> / {maxMark}
                        </>
                    ) : (
                        <div className="text-red-500">{submitTime ? 'Chưa chấm' : 'Chưa nộp'}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserItemCard;
