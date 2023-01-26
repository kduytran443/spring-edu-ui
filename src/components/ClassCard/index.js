import { Avatar, Button, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClassCard({ id, name, description, img, navigateTo }) {
    const navigate = useNavigate();

    const bgImage =
        'https://www.pluggedin.com/wp-content/uploads/2020/01/assassins-creed-unity-review-image-1024x587.jpg';

    return (
        <div className="w-full h-full">
            <div className="w-full md:p-4 p-2 h-full">
                <div
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                    onClick={(e) => {
                        navigate(navigateTo);
                    }}
                    className={`relative bg-cover flex flex-col bg-center w-full h-0 pb-[80%] shadow-lg hover:shadow-xl object-cover rounded-lg overflow-hidden cursor-pointer group`}
                >
                    <div className="duration-200 block w-full h-full absolute bg-black opacity-[0.2] group-hover:opacity-[0.4]"></div>
                    <div className="duration-200 flex flex-col justify-between h-full w-full md:p-6 p-2 text-white overflow-hidden absolute z-10">
                        <div>
                            <div className="flex flex-row items-center font-black justify-between bg-white rounded-full md:rounded-lg shadow-md overflow-hidden text-black p-0 md:p-2 mb-4">
                                <div className="flex flex-row items-center">
                                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                                    <p className="ml-2">Remy Sharp</p>
                                </div>
                                <Rating name="half-rating" readOnly defaultValue={2.5} precision={0.5} />
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-black">{name}</h1>
                        </div>
                        <p className="font-semibold hidden md:block">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassCard;
