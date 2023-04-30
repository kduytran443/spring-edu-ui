import { Avatar } from '@mui/material';
import images from '~/assets/images';

function ClassMemberItemCard({ avatar, name, size = '48px', certification = false }) {
    return (
        <div className="flex flex-row items-center justify-between w-full p-2 select-none cursor-pointer duration-100">
            <div className="flex flex-row items-center">
                <Avatar style={{ width: size, height: size }} src={avatar} />
                <span className="font-bold ml-2">{name}</span>
            </div>
            <div className="w-[72px]">
                {certification && <img className="w-full" alt="certification" src={images.miniFinishSeal} />}
            </div>
        </div>
    );
}

export default ClassMemberItemCard;
