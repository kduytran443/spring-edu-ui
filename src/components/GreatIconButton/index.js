import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GreatIconButton({ color = 'bg-blue-500 shadow-blue-500', icon = <FontAwesomeIcon icon={faCheckCircle} /> }) {
    return (
        <div
            className={
                'relative group-hover:bg-blue-500 duration-200 group-hover:shadow-blue-400 aspect-ratio w-[64px] p-4 absolute -top-[32px] shadow-md rounded-xl flex flex-col justify-center items-center ' +
                color
            }
        >
            <div className="animate-bounce duration-200 text-white font-bold text-3xl overflow-hidden">{icon}</div>
        </div>
    );
}

export default GreatIconButton;
