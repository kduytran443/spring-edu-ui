import { faArrowLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Editor } from 'draft-js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '~/components/RichTextEditor';
import UploadWidget from '~/components/UploadWidget';
import { classLessonService } from '~/services/classLessonService';
import { fileService } from '~/services/fileService';
import { topicService } from '~/services/topicService';
import parse from 'html-react-parser';

function ClassLessonUpdatePage() {
    const navigate = useNavigate();
    const { classId, lessonId } = useParams();

    const location = useLocation();

    const [nameState, setNameState] = useState('');
    const [topicIdState, setTopicIdState] = useState();
    const [textDataState, setTextDataState] = useState('');
    const [fileListState, setFileListState] = useState([]);

    const [topicListState, setTopicListState] = useState([]);

    const loadTopic = () => {
        topicService.getTopicByClassId(classId).then((data) => {
            if (data.status !== 500) {
                setTopicListState(data);
            }
        });
    };

    useEffect(() => {
        loadTopic();
    }, [location]);

    const setTextData = (data) => {
        setTextDataState(data);
    };

    const onInputName = (e) => {
        setNameState(e.target.value);
    };

    const onInputTextData = (e) => {
        setTextDataState(e.target.value);
    };

    const handleChange = (event) => {
        setTopicIdState(event.target.value);
    };

    const uploadFileList = (files) => {
        console.log(fileListState);
        setFileListState(files); //name, data, size, type
    };

    const uploadFiles = (classLessonId, file) => {
        fileService.postFileOnClassLessonId(classLessonId, file).then((data) => {});
    };

    const postLesson = () => {
        if (nameState && topicIdState && textDataState) {
            const obj = {
                name: nameState,
                topicId: topicIdState,
                textData: textDataState,
            };

            classLessonService.postClassLesson(obj).then((data) => {
                if (data.status !== 500) {
                    if (fileListState.length > 0) {
                        fileListState.forEach((file) => {
                            uploadFiles(data.id, file);
                        });
                    }

                    navigate('/class/' + classId);
                }
            });

            if (fileListState.length > 0) {
                fileListState.forEach((file) => {
                    console.log('file', file);
                });
            }
        }
    };

    useEffect(() => {}, [textDataState]);

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState('');

    const updateLesson = () => {
        if (nameState && topicIdState && textDataState) {
            const obj = {
                id: lessonId,
                name: nameState,
                topicId: topicIdState,
                textData: textDataState,
            };

            classLessonService.putClassLesson(obj).then((data) => {
                if (data.id) {
                    /*
                    if (fileListState.length > 0) {
                        fileListState.forEach((file) => {
                            uploadFiles(data.id, file);
                        });
                    }
*/
                    navigate('/class/' + classId + '/lesson/' + data.id);
                }
            });
            /*
            if (fileListState.length > 0) {
                fileListState.forEach((file) => {
                    console.log('file', file);
                });
            }
            */
        }
    };

    useEffect(() => {
        classLessonService.getClassLessonServiceById(lessonId).then((data) => {
            if (data.id) {
                setTextData(data.textData);
                setNameState(data.name);
                setTopicIdState(data.topicId);
                setFileListState(data.files);
            }
        });
    }, [location]);

    return (
        <div className="w-full p-4 md:p-0">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate(`/class/${classId}/lesson/${lessonId}`);
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại bài học
                </Button>
            </div>
            <h2 className="font-bold text-3xl">Sửa bài học</h2>
            <div className="w-full flex-col my-8">
                <div className="w-full my-6">
                    <TextField className="w-full" label="Tên bài học" value={nameState} onInput={onInputName} />
                </div>
                {topicListState && topicIdState && (
                    <div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={topicIdState}
                                    defaultValue={topicIdState}
                                    label="Chủ đề"
                                    onChange={handleChange}
                                >
                                    {topicListState.map((topic) => (
                                        <MenuItem key={topic.id} value={topic.id}>
                                            {topic.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                )}
                <div className="w-full my-6">
                    <h2>Nội dung bài học</h2>
                    <RichTextEditor data={textDataState} setData={setTextData} />
                </div>
                <div
                    onClick={updateLesson}
                    className="w-full mt-16 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                >
                    <FontAwesomeIcon icon={faPen} className="mr-2" /> Sửa
                </div>
            </div>
        </div>
    );
}

export default ClassLessonUpdatePage;
