import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { HOME_PAGE_URL } from '~/constants';

function Logo({ shape = 'default', size = 'medium' }) {
    const navigate = useNavigate();

    return (
        <div
            className="w-full select-none"
            onClick={(e) => {
                navigate(HOME_PAGE_URL);
            }}
        >
            <img className="w-full" src={images.logo} alt="logo" />
        </div>
    );
}

export default Logo;
