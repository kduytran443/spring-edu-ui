import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function AdminStatics({
    icon = <FontAwesomeIcon icon={faUser} />,
    color = 'slate',
    title = 'title',
    data = 'data',
    description = 'Mô tả',
    link = '/admin',
}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={(e) => {
                navigate(link);
            }}
            className="w-full flex flex-col shadow-lg p-6 bg-white rounded-lg cursor-pointer group"
        >
            <div className="w-full flex flex-row items-center justify-between ">
                <div
                    className={
                        'relative aspect-ratio w-[64px] p-4 -top-[32px] shadow-md rounded-xl flex flex-col justify-center items-center ' +
                        color
                    }
                >
                    <div className="group-hover:animate-bounce duration-200 text-white font-bold text-3xl">{icon}</div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-gray-500">{title}</p>
                    <p className="text-xl font-bold">{data}</p>
                </div>
            </div>
            <div className="border-t border-slate-200 mt-2 p-2 pt-4 pb-0 text-gray-500">{description}</div>
        </div>
    );
}

export default AdminStatics;
