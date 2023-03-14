import { faArrowDown, faArrowLeft, faArrowUp, faEdit, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, Breadcrumbs, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AlertDialog from '~/components/AlertDialog';
import ClassTopic from '~/components/ClassTopic';
import LoadingProcess from '~/components/LoadingProcess';
import SimpleAccordion from '~/components/SimpleAccordion';
import SimpleDialog from '~/components/SimpleDialog';
import { API_BASE_URL } from '~/constants';
import { getConfig } from '~/services/config';
import { topicService } from '~/services/topicService';
import { useUser } from '~/stores/UserStore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SimpleCustomAccordion from '~/components/SimpleCustomAccordion';
import TopicUpdateDialog from '~/components/TopicUpdateDialog';

function ClassPage() {
    const [classDataState, setClassDataState] = useState(() => {
        return {
            name: 'Tên lớp học',
            description: `Mô tả ngắn`,
            price: '99000',
            creDate: 'dd/mm/yyyy',
            startDate: 'dd/mm/yyyy',
            endDate: 'dd/mm/yyyy',
            schedule: 'Lịch hàng tuần',
            status: 'Đã bắt đầu',
        };
    });
    const { classId } = useParams();
    const [topicListState, setTopicListState] = useState([]);

    const [userState, userDispatch] = useUser();

    const [visibleAddTopicState, setVisibleAddTopicState] = useState(false);

    const loadTopic = () => {
        topicService.getTopicByClassId(classId).then((data) => {
            if (data.status !== 500) {
                setTopicListState(data);
            }
        });
    };
    useEffect(() => {
        /*
        const config = getConfig();
        fetch(`${API_BASE_URL}/api/topic/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 500) {
                } else setTopicListState(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
        */

        loadTopic();
    }, []);

    /*
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/topic/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 500) {
                } else setTopicListState(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);
*/
    const navigate = useNavigate();

    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/public/api/class-intro/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                if (data.userRoleCode) {
                    setClassDataState(data);
                } else {
                    navigate('/page-not-found');
                }
            });
    }, []);

    const [newTopicNameState, setNewTopicNameState] = useState('');

    const [newLessonState, setNewLessonState] = useState('');
    const [visibleAddNewLessonState, setVisibleAddNewLessonState] = useState([]);

    const openNewLesson = (lessonId) => {
        const index = visibleAddNewLessonState.findIndex((item) => item === lessonId);
        if (index === -1) {
            const obj = [...visibleAddNewLessonState];
            obj.push(lessonId);
            setVisibleAddNewLessonState(obj);
        } else {
            const obj = [...visibleAddNewLessonState];
            obj.splice(index, 1);
            setVisibleAddNewLessonState(obj);
        }
    };

    const isAddingNewLesson = (lessonId) => {
        const index = visibleAddNewLessonState.findIndex((item) => item === lessonId);
        if (index === -1) {
            return false;
        } else return true;
    };

    const addNewLesson = (topicId) => {};

    const deleteTopic = (topicId) => {
        topicService.deleteTopic({ id: topicId }).then((data) => {
            loadTopic();
        });
    };

    return (
        <>
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId + '/intro');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Trang giới thiệu
                </Button>
            </div>
            {classDataState &&
                (classDataState.userRoleCode === 'supporter' || classDataState.userRoleCode === 'teacher') && (
                    <div className="flex flex-col md:flex-row items-center">
                        <div>
                            <TopicUpdateDialog
                                buttonOpen={
                                    <div className="flex flex-col text-lg select-none hover:bg-blue-100 active:bg-blue-200 items-center justify-center p-6 border-2 border-blue-500 rounded-lg hover:shadow cursor-pointer text-blue-500">
                                        <FontAwesomeIcon icon={faPlus} /> Thêm chủ đề
                                    </div>
                                }
                                loadTopic={loadTopic}
                            />
                        </div>
                        <div>
                            <div
                                onClick={(e) => {
                                    navigate('lesson-create');
                                }}
                                className="flex flex-col md:ml-4 text-lg select-none hover:bg-blue-100 active:bg-blue-200 items-center justify-center p-6 border-2 border-blue-500 rounded-lg hover:shadow cursor-pointer text-blue-500"
                            >
                                <MenuBookIcon color="primary" /> Thêm bài học
                            </div>
                        </div>
                    </div>
                )}
            <div className="w-full">
                <div className="flex flex-col my-2 w-full">
                    {topicListState === null ? (
                        <LoadingProcess />
                    ) : (
                        topicListState &&
                        topicListState?.map((topic, index) => {
                            return (
                                <div className="w-full flex flex-col">
                                    {classDataState &&
                                        (classDataState.userRoleCode === 'supporter' ||
                                            classDataState.userRoleCode === 'teacher') && (
                                            <div className="flex flex-col">
                                                <div className="flex flex-row items-center mt-10 justify-between">
                                                    <Button size="small" startIcon={<FontAwesomeIcon icon={faEdit} />}>
                                                        Thay đổi
                                                    </Button>
                                                    <Button
                                                        onClick={(e) => {
                                                            deleteTopic(topic.id);
                                                        }}
                                                        size="small"
                                                        startIcon={<FontAwesomeIcon icon={faEyeSlash} />}
                                                    >
                                                        Ẩn
                                                    </Button>
                                                    <div className="flex flex-row items-center mr-2">
                                                        {index !== topicListState.length - 1 && (
                                                            <div className="mr-2">
                                                                <IconButton color="primary" size="small">
                                                                    <FontAwesomeIcon icon={faArrowDown} />
                                                                </IconButton>
                                                            </div>
                                                        )}
                                                        {index !== 0 && (
                                                            <div>
                                                                <IconButton color="primary" size="small">
                                                                    <FontAwesomeIcon icon={faArrowUp} />
                                                                </IconButton>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {isAddingNewLesson(topic.id) && (
                                                    <div className="w-full p-4 border border-slate-200 rounded">
                                                        <h3 className="font-bold text-xl mb-2">
                                                            Thêm bài học vào: {topic.name}
                                                        </h3>
                                                        <div className="w-full">
                                                            <TextField
                                                                label="Tên bài học"
                                                                className="w-full"
                                                                value={newLessonState}
                                                                onInput={(e) => {
                                                                    setNewLessonState(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="w-full flex flex-row items-center my-4 justify-end pr-6">
                                                            <Button
                                                                onClick={(e) => {
                                                                    openNewLesson(topic.id);
                                                                }}
                                                            >
                                                                Hủy
                                                            </Button>
                                                            <div>
                                                                <Button variant="contained">Thêm</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    <SimpleAccordion
                                        key={index}
                                        name={topic.ordinalNumber + '. ' + topic.name}
                                        classLessons={topic.classLessonReviews}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default ClassPage;
