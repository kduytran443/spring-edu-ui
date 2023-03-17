import { faArrowLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Editor } from 'draft-js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CloudinaryUploadWidget from '~/components/CloudinaryUploadWidget';
import RichTextEditor from '~/components/RichTextEditor';
import UploadWidget from '~/components/UploadWidget';
import { classLessonService } from '~/services/classLessonService';
import { fileService } from '~/services/fileService';
import { topicService } from '~/services/topicService';

function ClassLessonCreatePage() {
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
                setTopicIdState(data[0]);
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

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (
        <div className="w-full p-4 md:p-0">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId);
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Giao diện chính
                </Button>
            </div>
            <h2 className="font-bold text-3xl">Tạo bài học</h2>
            <div className="w-full flex-col my-8">
                <div className="w-full my-6">
                    <TextField className="w-full" label="Tên bài học" value={nameState} onInput={onInputName} />
                </div>
                {topicListState && (
                    <div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={topicIdState}
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
                    <RichTextEditor setData={setTextData} />
                </div>
                <div></div>
                <div className="w-full">
                    <UploadWidget multiple uploadFunction={uploadFileList} />
                </div>
                <div
                    onClick={postLesson}
                    className="w-full mt-16 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                >
                    <FontAwesomeIcon icon={faPen} className="mr-2" /> Tạo
                </div>
            </div>
        </div>
    );
}

export default ClassLessonCreatePage;
