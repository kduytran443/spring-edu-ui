import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import { Fragment } from 'react';
import images from '~/assets/images';
import { openInNewTab } from '~/utils';

function SubmittedExerciseFileReview({
    name = 'Tên',
    size = 1,
    type = '',
    data = '',
    index,
    id,
    noDelete = false,
    onCancel = () => {},
}) {
    let fileContent = '';

    if (type.includes('image/')) {
        fileContent = <img className="w-full max-w-[140px]" alt="file" src={images.imageIcon} />;
    } else if (type.includes('video/')) {
        fileContent = <img className="w-full max-w-[140px]" alt="file" src={images.videoIcon} />;
    } else if (type.includes('audio/')) {
        fileContent = <img className="w-full max-w-[140px]" alt="file" src={images.audioIcon} />;
    } else if (type.includes('octet-stream')) {
        fileContent = <img className="w-full max-w-[140px]" alt="file" src={images.winrarIcon} />;
    } else if (type.includes('compressed')) {
        fileContent = <img className="w-full max-w-[140px]" alt="file" src={images.zip} />;
    } else {
        fileContent = <img className="w-full max-w-[140px]" alt="file" src={images.file} />;
    }
    const fileSize = size / 1024;
    const downloadRef = useRef();

    const download = () => {
        openInNewTab('/file/' + id);
    };

    return (
        <div
            onClick={download}
            className="flex bg-white hover:text-white hover:bg-blue-400 hover:shadow-blue-300 duration-100 cursor-pointer relative max-w-[300px] flex-col rounded-lg shadow border border-slate-100 p-4"
        >
            <a ref={downloadRef} style={{ display: 'none' }} href={data} download={name}>
                Download
            </a>
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
            <div className="flex flex-col w-full items-center">
                <div className="select-none max-h-[220px] overflow-hidden">{fileContent}</div>
            </div>
            <div className="font-bold max-w-[220px] overflow-hidden truncate">{name}</div>
            <div className="font-bold max-w-[220px] overflow-hidden truncate">{type}</div>
            <div>{Math.round(fileSize)} KB</div>
        </div>
    );
}

export default SubmittedExerciseFileReview;
