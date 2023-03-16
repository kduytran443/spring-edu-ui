import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Rating } from '@mui/material';
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function ClassReviewCard({
    id,
    name,
    description,
    img,
    people = 0,
    review = 4,
    reviewPeople = 0,
    navigateTo,
    userFullname,
    avatar = 'https://pbs.twimg.com/media/FJE1rt2X0AAI_6X?format=jpg&name=4096x4096',
    fee = 7200000,
}) {
    const navigate = useNavigate();

    return (
        <div className="p-2 w-full">
            <div
                onClick={(e) => {
                    navigate(navigateTo);
                }}
                className="w-full hover:bg-slate-100 flex flex-col p-2 md:p-4 cursor-pointer duration-200 rounded-xl shadow hover:shadow-md hover:scale-[1.02] group"
            >
                <div className="duration-200 max-h-[226px] overflow-hidden w-full overflow-hidden aspect-ratio rounded-xl group-hover:bg-black">
                    <img alt="avatar" src={img} className="duration-200 group-hover:opacity-90" />
                </div>
                <div className="my-4">
                    <div className="flex flex-row items-center mb-2">
                        <Avatar src={avatar} />
                        <p className="ml-2 font-semibold text-gray-700">{userFullname}</p>
                    </div>
                    <h3 className="text-lg">{name}</h3>
                    <div className="font-semibold">{VND.format(fee)}</div>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <div className="text-gray-700">
                            <FontAwesomeIcon icon={faUserGroup} className="mr-2" />
                            {people}
                        </div>
                        <div className="flex flex-row items-center">
                            <Rating name="half-rating" readOnly defaultValue={review} precision={0.5} />
                            <div className="ml-2">({reviewPeople})</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassReviewCard;
