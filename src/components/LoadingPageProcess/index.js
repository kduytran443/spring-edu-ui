import { CircularProgress } from '@mui/material';

function LoadingPageProcess() {
    return (
        <div className="flex z-10 justify-center fixed left-0 top-0 w-full h-full bg-white items-center w-full py-8">
            <CircularProgress />
        </div>
    );
}

export default LoadingPageProcess;
