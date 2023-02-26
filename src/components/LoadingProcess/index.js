import { CircularProgress } from '@mui/material';

function LoadingProcess() {
    return (
        <div className="flex justify-center items-center w-full py-8">
            <CircularProgress />
        </div>
    );
}

export default LoadingProcess;
