import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { Fragment } from 'react';

function FileReview({ name = 'Tên', size = 1, type = '', data = '', index, noDelete = false, onCancel = () => {} }) {
    let fileContent = '';

    if (type.includes('image/')) {
        fileContent = <img className="w-full" alt="file" src={data} />;
    } else if (type.includes('video/')) {
        fileContent = (
            <video controls className="w-full">
                <source src={data} type={type} />
            </video>
        );
    }
    const fileSize = size / 1024;
    console.log(name);

    return (
        <div className="flex bg-white hover:text-white hover:bg-blue-400 hover:shadow-blue-300 duration-100 cursor-pointer relative max-w-[300px] flex-col rounded-lg shadow border border-slate-100 p-4">
            {noDelete && (
                <div
                    onClick={(e) => {
                        onCancel(index);
                    }}
                    className="absolute w-[40px] h-[40px] right-0 top-0 shadow-md rounded-full flex items-center justify-center bg-white"
                >
                    <IconButton color="error">
                        <FontAwesomeIcon icon={faXmark} />
                    </IconButton>
                </div>
            )}
            <div className="max-w-[240px] max-h-[240px] overflow-hidden">{fileContent}</div>
            <div className="font-bold max-w-[240px]">{name}</div>
            <div className="">{type}</div>
            <div>{Math.round(fileSize)} KB</div>
        </div>
    );
}

export default FileReview;
