import { Avatar, Rating } from '@mui/material';

function ReviewCard({ username = 'Ẩn danh', avatar, comment, stars = 0 }) {
    return (
        <div className="flex flex-col w-full p-4 my-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex flex-row justify-center items-center mb-2 sm:mb-0">
                    <Avatar src={avatar} sx={{ width: '48px', height: '48px' }} />
                    <h3 className="text-lg font-bold ml-4">{username}</h3>
                </div>
                <Rating name="half-rating" readOnly defaultValue={stars} precision={0.5} />
            </div>
            <p className="mt-4">{comment}</p>
        </div>
    );
}

export default ReviewCard;
