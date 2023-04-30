import { faCheck, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import FileReview from '../FileReview';
import { Box } from '@mui/system';
import axios from 'axios';
import { getUserJWT } from '~/services/userService';
import { API_BASE_URL } from '~/constants';

function NewUploadWidget({
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

    const [fileListState, setFileListState] = useState(fileList);

    const uploadFile = (e) => {
        e.preventDefault();
        const files = e.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        const api = 'api/upload';
        const jwt = getUserJWT();
        axios
            .post(`${API_BASE_URL}/${api}`, formData, {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                    if (percent < 100) {
                        setUploadFileLoading(percent);
                    }
                },
                headers: {
                    Authorization: jwt,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res);
                this.setState({ avatar: res.data.url, uploadPercentage: 100 }, () => {
                    setTimeout(() => {
                        this.setState({ uploadPercentage: 0 });
                    }, 1000);
                });
                if (multiple) {
                }
                fileRef.current.value = '';
            });

        if (multiple) {
            setFileListState((pre) => [...pre, formData]);
        } else {
            setFileListState([formData]);
        }
        fileRef.current.value = '';
    };
    /*
    const uploadFile = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    //reader.result file.size file.name
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
    };*/

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
        } else if (fileListState.length > 0) {
            uploadFunction(fileListState);
        }
    }, [fileListState]);

    const removeByIndex = (index) => {
        const arr = [...fileListState];
        arr.splice(index, 1);
        setFileListState(arr);
    };

    const [uploadFileLoading, setUploadFileLoading] = useState(0);

    return (
        <div className="flex flex-col items-center w-full p-4 my-6 border border-slate-200 shadow rounded-lg">
            <h2 className="text-2xl font-bold">Upload ({fileListState.length})</h2>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <div className="w-full relative">
                        <LinearProgress sx={{ minHeight: 32 }} variant="determinate" value={uploadFileLoading} />
                    </div>
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        uploadFileLoading,
                    )}%`}</Typography>
                </Box>
            </Box>
            <div className="my-4" onClick={uploadOnClick}>
                {uploadButton}
            </div>
            <input onChange={uploadFile} type="file" style={{ display: 'none' }} ref={fileRef} {...multipleProps} />
            <div className="flex flex-row items-start justify-center flex-wrap">
                {fileListState.map((file, index) => {
                    return (
                        <div className="flex flex-col items-center">
                            <FileReview
                                onCancel={onCancel}
                                name={file.name}
                                data={file.data}
                                key={index}
                                size={file.size}
                                type={file.type}
                            />
                            <IconButton
                                onClick={(e) => {
                                    removeByIndex(index);
                                }}
                                color="error"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NewUploadWidget;

/*


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

*/
