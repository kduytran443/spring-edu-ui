import { faCheck, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import FileReview from '../FileReview';

function UploadWidget({
    uploadButton = (
        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faUpload} />}>
            Upload
        </Button>
    ),
    uploadFunction = () => {},
    fileList = [],
    multiple = false,
}) {
    const fileRef = useRef();

    console.log('multiple', multiple);

    const [fileListState, setFileListState] = useState(fileList);

    const uploadFile = (e) => {
        console.log('Uploaded multiple');
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    //reader.result file.size file.name
                    console.log(reader.result);
                    if (multiple) {
                        setFileListState((pre) => [
                            ...pre,
                            { name: file.name, data: reader.result, size: file.size, type: file.type },
                        ]);
                    } else {
                        setFileListState([{ name: file.name, data: reader.result, size: file.size, type: file.type }]);
                    }
                    fileRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    const uploadOnClick = () => {
        fileRef.current.click();
    };

    let multipleProps = { multiple: 'multiple' };

    if (!multiple) {
        multipleProps = {};
    }

    const onCancel = (index) => {
        let files = [...fileListState];
        files.splice(index, 1);
        setFileListState(files);
    };

    useEffect(() => {
        if (fileListState.length === 0) {
            uploadFunction([]);
        }
    }, [fileListState]);

    return (
        <div className="flex flex-col items-center w-full p-4 my-6 border border-slate-200 shadow rounded-lg">
            <h2 className="text-2xl font-bold">Upload ({fileListState.length})</h2>
            <div className="my-4" onClick={uploadOnClick}>
                {uploadButton}
            </div>
            <input onChange={uploadFile} type="file" style={{ display: 'none' }} ref={fileRef} {...multipleProps} />
            <div className="flex flex-row items-start justify-center flex-wrap">
                {fileListState.map((file, index) => {
                    return (
                        <div>
                            <FileReview
                                onCancel={onCancel}
                                name={file.name}
                                data={file.data}
                                key={index}
                                size={file.size}
                                type={file.type}
                            />
                        </div>
                    );
                })}
            </div>
            {fileListState.length > 0 && (
                <div className="mt-6">
                    <Button
                        onClick={(e) => {
                            uploadFunction(fileListState);
                        }}
                        variant="contained"
                        color="success"
                        startIcon={<FontAwesomeIcon icon={faCheck} />}
                    >
                        Hoàn tất
                    </Button>
                </div>
            )}
        </div>
    );
}

export default UploadWidget;
