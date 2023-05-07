import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import images from '~/assets/images';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { fileService } from '~/services/fileService';

function FilePage() {
    const { fileId } = useParams();
    const [fileState, setFileState] = useState();
    const location = useLocation();

    let fileContent = '';

    if (fileState) {
        if (fileState.type.includes('image/')) {
            fileContent = <img className="w-full" alt="file" src={fileState.data} />;
        } else if (fileState.type.includes('video/')) {
            fileContent = (
                <video controls className="w-full">
                    <source src={fileState.data} type={fileState.type} />
                </video>
            );
        } else if (fileState.type.includes('audio/')) {
            fileContent = (
                <audio className="w-full" style={{ width: '100%', height: '48px' }} controls src={fileState.data} />
            );
        } else if (fileState.type.includes('compressed')) {
            fileContent = <img className="w-full max-h-[220px] max-w-[140px]" alt="file" src={images.zip} />;
        } else {
            fileContent = <img className="w-full max-h-[220px] max-w-[140px]" alt="file" src={images.file} />;
        }
    }

    const downloadRef = useRef();
    const download = () => {
        console.log('DOWNLOAD');
        downloadRef.current.click();
    };

    useEffect(() => {
        fileService.get(fileId).then((data) => {
            if (data.id) {
                const obj = { ...data };
                obj.data = `data:${data.type};base64,${data.data}`;
                setFileState(obj);
            }
        });
    }, [location]);

    return (
        <div className="w-full flex flex-col items-center min-h-full justify-center">
            {!fileState ? (
                <LoadingPageProcess />
            ) : (
                <div className="flex bg-white duration-100 relative w-full flex-col rounded-lg shadow border border-slate-100 p-4">
                    {fileState && (
                        <a
                            ref={downloadRef}
                            style={{ display: 'none' }}
                            href={fileState.data}
                            download={fileState.name}
                        >
                            Download
                        </a>
                    )}
                    <div className="flex flex-col w-full items-center">
                        <div className="select-none w-full">{fileContent}</div>
                    </div>
                    <div className="font-bold max-w-full overflow-hidden truncate text-xl my-4">{fileState.name}</div>
                    <div className="font-bold max-w-full overflow-hidden truncate">{fileState.type}</div>
                    <div>{Math.round(fileState.size / 1024)} KB</div>
                    <div className="mt-4">
                        <Button size="large" onClick={download} startIcon={<FontAwesomeIcon icon={faDownload} />}>
                            Tải về
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilePage;
