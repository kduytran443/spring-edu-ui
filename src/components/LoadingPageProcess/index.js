import { CircularProgress } from '@mui/material';
import images from '~/assets/images';

function LoadingPageProcess() {
    return (
        <div className="flex z-10 justify-center fixed left-0 top-0 w-full h-full bg-white items-center w-full py-8">
            <img alt="loading" src={images.loading} className="w-[100px] h-[100px]" />
        </div>
    );
}

export default LoadingPageProcess;
