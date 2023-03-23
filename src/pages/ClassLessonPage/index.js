import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowLeft,
    faArrowRight,
    faBackspace,
    faBackward,
    faBackwardStep,
    faBars,
    faClock,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '~/constants';
import parse from 'html-react-parser';
import { getConfig } from '~/services/config';
import { classLessonService } from '~/services/classLessonService';
import FileReview from '~/components/FileReview';
import { fileService } from '~/services/fileService';
import SimpleAccordion from '~/components/SimpleAccordion';
import SimpleCustomAccordion from '~/components/SimpleCustomAccordion';
import { renderToTime } from '~/utils';
import { confirmAlert } from 'react-confirm-alert';
import ShowTextData from '~/components/ShowTextData';
import RichTextEditor from '~/components/RichTextEditor';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import TemporaryDrawer from '~/components/TemporaryDrawer';
import LoadingProcess from '~/components/LoadingProcess';
import { topicService } from '~/services/topicService';

function ClassLessonPage() {
    const navigate = useNavigate();
    const { lessonId, classId } = useParams();
    const [lessonDataState, setLessonDataState] = useState({});
    const [loadingState, setLoadingState] = useState(true);

    const [previousLessonState, setPreviousLessonState] = useState(null);
    const [nextLessonState, setNextLessonState] = useState(null);

    const navigateToLesson = (lessonId) => {
        navigate('/class/' + classId + '/lesson/' + lessonId);
    };

    const location = useLocation();

    const loadData = () => {
        classLessonService.getClassLessonServiceById(lessonId).then((data) => {
            if (data.status !== 500) {
                console.log(data);
                setLessonDataState(data);
            } else {
                navigate('/class/' + classId);
            }
        });
    };

    const textDataRef = useRef();
    useEffect(() => {
        console.log('load dataaaaaa');
        loadData();
    }, [location]);

    useEffect(() => {
        if (textDataRef.current) {
            textDataRef.current.style.display = 'none';
            setTimeout(() => {
                textDataRef.current.style.display = 'block';
            }, 100);
        }
    }, [lessonDataState]);

    useEffect(() => {
        console.log('LONG LOADING...');
        const timeout = setTimeout(() => {
            setLoadingState(false);
        }, 2000);
    }, [location]);

    /*
    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/api/class-lesson/${lessonId}`, config)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 500) {
                    navigate('/page-not-found');
                } else setLessonDataState(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, [lessonId]);
    */

    /*PRIVATE*/
    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/api/class-lesson-review/${lessonId}?move=next`, config)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 500) {
                    setNextLessonState(null);
                } else setNextLessonState(data);
            })
            .catch((error) => {
                setNextLessonState(null);
                console.log('error', error);
            });
    }, [location]);
    /*PRIVATE*/
    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/api/class-lesson-review/${lessonId}?move=previous`, config)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 500) {
                    setPreviousLessonState(null);
                } else {
                    setPreviousLessonState(data);
                }
            })
            .catch((error) => {
                setPreviousLessonState(null);
                console.log('error', error);
            });
    }, [location]);

    const [fileListState, setFileListState] = useState([]);
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
    }, [location]);

    const [classDataState, setClassDataState] = useState(() => {});

    const loadFile = () => {
        fileService.getFilesOnClassLessonId(lessonId).then((data) => {
            if (data.status !== 500) {
                console.log('setFileListState ', data);
                setFileListState(data);
            }
        });
    };

    useEffect(() => {
        loadFile();
    }, [location]);

    const time = renderToTime(lessonDataState.createdDate);

    const deleteLesson = () => {
        classLessonService.deleteClassLesson({ id: lessonId }).then((data) => {
            if (data.status !== 500) {
                console.log("navigate('/class/' + classId);", data);
                navigate('/class/' + classId);
            }
        });
    };

    const submitDelete = () => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có muốn xóa bài học này không?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteLesson(),
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                },
            ],
        });
    };

    useEffect(() => {
        if (lessonDataState.textData) {
            const textComponent = parse(lessonDataState.textData);
        }
    }, [location]);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

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

    return (
        <div className="w-full p-4 md:p-0 text-justify">
            {loadingState && <LoadingPageProcess />}
            <div className="flex flex-row items-start justify-between">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId);
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
                <div className="flex flex-row items-center">
                    <div>
                        <b>Topic:</b> {lessonDataState && lessonDataState.topicName}
                    </div>
                    <div>
                        <TemporaryDrawer
                            button={
                                <div
                                    onClick={(e) => {
                                        setVisible(!visible);
                                    }}
                                    className={`cursor-pointer`}
                                >
                                    <IconButton>
                                        <FontAwesomeIcon icon={faBars} />
                                    </IconButton>
                                </div>
                            }
                        >
                            <div className="flex flex-col my-2 w-full">
                                {topicListState === null ? (
                                    <LoadingProcess />
                                ) : (
                                    topicListState &&
                                    topicListState?.map((topic, index) => {
                                        return (
                                            <div
                                                onClick={(e) => {
                                                    loadData();
                                                }}
                                                className="w-full flex flex-col"
                                            >
                                                <SimpleAccordion
                                                    key={index}
                                                    name={index + 1 + '. ' + topic.name}
                                                    classLessons={topic.classLessonReviews}
                                                />
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </TemporaryDrawer>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-2xl my-4 mt-8">{lessonDataState && lessonDataState.name}</h1>
            </div>

            {lessonDataState.createdDate && (
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    <span>Thời gian đăng:</span>
                    <p className="mr-2">{time}</p>
                </div>
            )}
            {fileListState.length > 0 && (
                <div>
                    <SimpleCustomAccordion name={`Tập tin đính kèm (${fileListState.length})`}>
                        <div className="flex flex-row items-start justify-center flex-wrap">
                            {fileListState.map((file, index) => {
                                return (
                                    <div>
                                        <FileReview
                                            name={file.name}
                                            data={file.data}
                                            key={index}
                                            size={file.size}
                                            type={file.type}
                                            noDelete={false}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </SimpleCustomAccordion>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-bold my-2">Nội dung bài học:</h2>
                <p>
                    {lessonDataState.textData && (
                        <div ref={textDataRef}>
                            <RichTextEditor disabled data={lessonDataState.textData} />
                        </div>
                    )}{' '}
                </p>
            </div>
            {(previousLessonState || nextLessonState) && (
                <div className="flex bg-slate-100 border border-slate-200 flex-col shadow rounded-lg p-4 md:flex-row full justify-between items-center mt-16">
                    {previousLessonState && (
                        <Link to={'/class/' + classId + '/lesson/' + previousLessonState.id}>
                            <div>
                                <b>
                                    <FontAwesomeIcon icon={faArrowLeft} /> Previous:
                                </b>{' '}
                                {previousLessonState.name}
                            </div>
                        </Link>
                    )}
                    {nextLessonState && (
                        <Link to={'/class/' + classId + '/lesson/' + nextLessonState.id}>
                            <div>
                                <b>
                                    <FontAwesomeIcon icon={faArrowRight} /> Next:
                                </b>{' '}
                                {nextLessonState.name}
                            </div>
                        </Link>
                    )}
                </div>
            )}
            {classDataState &&
                (classDataState.userRoleCode === 'supporter' || classDataState.userRoleCode === 'teacher') && (
                    <div className="flex flex-row items-center justify-end mt-10">
                        <div className="mr-4">
                            <IconButton onClick={submitDelete} color="error">
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </div>
                        <div>
                            <IconButton
                                onClick={(e) => {
                                    navigate(`/class/${classId}/lesson-update/${lessonId}`);
                                }}
                                color="primary"
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </IconButton>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default ClassLessonPage;
