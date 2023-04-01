import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CategoryCard({ id, name, description, img, navigateTo }) {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full hover:scale-[1.02] duration-200">
            <div className="w-full p-4 h-full">
                <div
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                    onClick={(e) => {
                        navigate(navigateTo);
                    }}
                    className={`relative bg-cover flex flex-col bg-center w-full h-0 pb-[80%] shadow-lg hover:shadow-xl object-cover rounded-lg  overflow-hidden cursor-pointer group`}
                >
                    <div className="duration-200 block w-full h-full absolute bg-black opacity-[0.2] group-hover:opacity-[0.4]"></div>
                    <div className="duration-200 flex flex-col justify-between h-full w-full p-6 text-white overflow-hidden absolute z-10">
                        <h1 className="text-2xl lg:text-3xl font-black uppercase">{name}</h1>
                        <p className="font-semibold">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
