import { CircularProgress } from '@mui/material';

function DialogProcessLoading() {
    return (
        <div className="flex z-10 justify-center absolute left-0 top-0 h-full bg-white items-center w-full py-8">
            <CircularProgress />
        </div>
    );
}

export default DialogProcessLoading;
