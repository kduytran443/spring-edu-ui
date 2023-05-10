import {
    faArrowDown,
    faArrowLeft,
    faArrowUp,
    faEdit,
    faEye,
    faEyeSlash,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, Breadcrumbs, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import EditTopicDialog from '~/components/EditTopicDialog';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DeleteTopicDialog from '~/components/DeleteTopicDialog';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { useRef } from 'react';

function ClassPage() {
    const [loadingState, setLoadingState] = useState(true);
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

    console.log('???????????????????????????? nè');

    const location = useLocation();
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
        loadTopic();
    }, [location]);

    const navigate = useNavigate();

    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/public/api/class-intro/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                setClassDataState(data);
                setLoadingState(false);
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

    const deleteTopic = (topicId) => {
        topicService.deleteTopic({ id: topicId }).then((data) => {
            loadTopic();
        });
    };

    const [justChangedOrdinalNumber, setJustChangedOrdinalNumber] = useState();
    const changeOrdinalNumber = (obj) => {
        if (obj.ordinalNumber < 1) {
            obj.ordinalNumber = topicListState.length;
        }
        if (obj.ordinalNumber > topicListState.length) {
            obj.ordinalNumber = 1;
        }

        topicService.putOrdinalNumber(obj).then((data) => {
            if (data) {
                loadTopic();
                setJustChangedOrdinalNumber(data.ordinalNumber);

                setTimeout(() => {
                    setJustChangedOrdinalNumber();
                }, 1200);
            }
        });
    };

    const changeVisible = (obj) => {
        topicService.putVisible(obj).then((data) => {
            if (data.id) {
                loadTopic();
            }
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
            {loadingState && <LoadingPageProcess />}
            {classDataState &&
                (classDataState.userRoleCode === 'supporter' || classDataState.userRoleCode === 'teacher') && (
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="aspect-ratio">
                            <TopicUpdateDialog
                                buttonOpen={
                                    <div className="flex flex-col text-lg select-none hover:bg-blue-50 active:bg-blue-200 items-center hover:outline-2 hover:outline-blue-400 hover:outline-dashed justify-center p-6 border-blue-500 cursor-pointer text-blue-500">
                                        <FontAwesomeIcon icon={faPlus} /> Thêm chủ đề
                                    </div>
                                }
                                loadTopic={loadTopic}
                            />
                        </div>
                        <div className="aspect-ratio">
                            <div
                                onClick={(e) => {
                                    navigate('lesson-create');
                                }}
                                className="flex flex-col md:ml-4 text-lg select-none hover:bg-blue-50 active:bg-blue-200 items-center hover:outline-2 hover:outline-blue-400 hover:outline-dashed justify-center p-6 border-blue-500 cursor-pointer text-blue-500"
                            >
                                <MenuBookIcon color="primary" /> Thêm bài học
                            </div>
                        </div>
                        <div className="aspect-ratio">
                            <div
                                onClick={(e) => {
                                    navigate('exercise-create');
                                }}
                                className="flex flex-col md:ml-4 text-lg select-none hover:bg-blue-50 active:bg-blue-200 items-center hover:outline-2 hover:outline-blue-400 hover:outline-dashed justify-center p-6 border-blue-500 cursor-pointer text-blue-500"
                            >
                                <FactCheckIcon color="primary" /> Thêm bài tập
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
                                <div
                                    className={`w-full duration-100 flex flex-col ${
                                        topic.ordinalNumber === justChangedOrdinalNumber &&
                                        'outline-2 rounded-sm outline-blue-500 outline-dashed'
                                    }`}
                                >
                                    {classDataState &&
                                        (classDataState.userRoleCode === 'supporter' ||
                                            classDataState.userRoleCode === 'teacher') && (
                                            <div className="flex flex-col">
                                                <div className="flex flex-row items-center mt-10 justify-between">
                                                    <EditTopicDialog topicId={topic.id} reload={loadTopic} />
                                                    <DeleteTopicDialog
                                                        topicId={topic.id}
                                                        reload={loadTopic}
                                                        topicName={topic.name}
                                                    />
                                                    <IconButton
                                                        onClick={(e) => {
                                                            const obj = {
                                                                id: topic.id,
                                                            };
                                                            if (topic.visible) {
                                                                obj.visible = 0;
                                                            } else {
                                                                obj.visible = 1;
                                                            }
                                                            changeVisible(obj);
                                                        }}
                                                        color="primary"
                                                    >
                                                        <FontAwesomeIcon icon={topic.visible ? faEye : faEyeSlash} />
                                                    </IconButton>
                                                    <div className="flex flex-row items-center mr-2">
                                                        <div className="mr-2">
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    const obj = {
                                                                        ordinalNumber: topic.ordinalNumber - 1,
                                                                        id: topic.id,
                                                                    };
                                                                    changeOrdinalNumber(obj);
                                                                }}
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                <FontAwesomeIcon icon={faArrowUp} />
                                                            </IconButton>
                                                        </div>
                                                        <div>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    const obj = {
                                                                        ordinalNumber: topic.ordinalNumber + 1,
                                                                        id: topic.id,
                                                                    };
                                                                    changeOrdinalNumber(obj);
                                                                }}
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                <FontAwesomeIcon icon={faArrowDown} />
                                                            </IconButton>
                                                        </div>
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
                                    {classDataState && topic.visible ? (
                                        <SimpleAccordion
                                            key={index}
                                            name={index + 1 + '. ' + topic.name}
                                            classLessons={topic.classLessonReviews}
                                        />
                                    ) : (
                                        <>
                                            {(classDataState.userRoleCode === 'supporter' ||
                                                classDataState.userRoleCode === 'teacher') && (
                                                <div className="w-full opacity-40">
                                                    <SimpleAccordion
                                                        key={index}
                                                        name={index + 1 + '. ' + topic.name}
                                                        classLessons={topic.classLessonReviews}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
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

/*

<Button
                                                        onClick={(e) => {
                                                            deleteTopic(topic.id);
                                                        }}
                                                        size="small"
                                                        startIcon={<FontAwesomeIcon icon={faEyeSlash} />}
                                                    >
                                                        Ẩn
                                                    </Button>
*/
