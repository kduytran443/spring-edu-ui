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
import { useParams } from 'react-router-dom';
import LinearProcessBar from '../LinearProcessBar';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import DeleteFileDialog from '../DeleteFileDialog';
import SubmittedExerciseFileReview from '../SubmittedExerciseFileReview';
import DeleteExerciseFileDialog from '../DeleteExerciseFileDialog';

function CreateLessonUploadWidget({
    uploadButton = (
        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faUpload} />}>
            Upload
        </Button>
    ),
    uploadFunction = () => {},
    fileList = [],
    multiple = false,
    disable,
    setFileIds = () => {},
}) {
    const fileRef = useRef();
    const { exerciseId } = useParams();
    const [fileListState, setFileListState] = useState(fileList);
    const [uploadStatusState, setUploadStatusState] = useState(0); //0: chua upload, 1: dang upload, 2: upload xong

    const uploadFile = (e) => {
        e.preventDefault();
        const files = e.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        const api = `api/class-lesson/file/0`;
        const jwt = getUserJWT();
        setUploadStatusState(1);
        axios
            .post(`${API_BASE_URL}/${api}`, formData, {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                    if (percent <= 100) {
                        setUploadFileLoading(percent);
                    }
                },
                headers: {
                    Authorization: jwt,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                const file = res.data;
                if (multiple) {
                    setFileListState((pre) => [
                        ...pre,
                        { id: file.id, name: file.name, data: file.data, size: file.size, type: file.type },
                    ]);
                    setFileIds((pre) => {
                        return [...pre, file.id];
                    });
                    setUploadStatusState(0);
                    setUploadFileLoading(0);
                } else {
                    setFileListState([
                        { id: file.id, name: file.name, data: file.data, size: file.size, type: file.type },
                    ]);
                    setFileIds((pre) => {
                        return [...pre, file.id];
                    });
                    setUploadStatusState(0);
                    setUploadFileLoading(0);
                }
                fileRef.current.value = '';
            });
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
        } else if (fileListState.length > 0) {
            uploadFunction(fileListState);
        }
    }, [fileListState]);

    const removeByIndex = (index) => {
        const arr = [...fileListState];
        arr.splice(index, 1);
        setFileListState(arr);
    };

    const reloadFileDelete = (index) => {
        removeByIndex(index);
    };

    const deleteFile = (id) => {
        setFileIds((pre) => {
            const arr = [...pre];
            const newArr = arr.filter((item) => item !== id);
            return newArr;
        });
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
            </Box>
            <div className="w-full flex flex-col items-center justify-center">
                {uploadStatusState === 1 && <LinearProcessBar progress={uploadFileLoading} />}
            </div>
            {!disable && (
                <>
                    {uploadFileLoading === 0 && (
                        <div className="my-4" onClick={uploadOnClick}>
                            {uploadButton}
                        </div>
                    )}
                </>
            )}
            <input onChange={uploadFile} type="file" style={{ display: 'none' }} ref={fileRef} {...multipleProps} />
            <div className="flex flex-row items-start justify-center flex-wrap">
                {fileListState.map((file, index) => {
                    return (
                        <div className="flex flex-col items-center">
                            <SubmittedExerciseFileReview
                                onCancel={onCancel}
                                name={file.name}
                                data={`data:${file.type};base64,${file.data}`}
                                key={index}
                                id={file.id}
                                size={file.size}
                                type={file.type}
                            />
                            {!disable && (
                                <DeleteExerciseFileDialog
                                    button={
                                        <IconButton color="error">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </IconButton>
                                    }
                                    fileId={file.id}
                                    fileName={file.name}
                                    id={0}
                                    reload={() => {
                                        deleteFile(file.id);
                                        reloadFileDelete(index);
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CreateLessonUploadWidget;
