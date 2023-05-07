import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faBackspace,
    faBackward,
    faBackwardStep,
    faBars,
    faClock,
    faComment,
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
import ClassLessonDeleteDialog from '~/components/ClassLessonDeleteDialog';
import { commentService } from '~/services/commentService';
import CommentCard from '~/components/CommentCard';
import { useUser } from '~/stores/UserStore';
import { useContext } from 'react';
import { NotificationSocketContext } from '~/components/NotificationSocketProvider';
import { uploadService } from '~/services/uploadService';
import CreateLessonUploadWidget from '~/components/CreateLessonUploadWidget';
import ExerciseUploadWidget from '~/components/ExerciseUploadWidget';

function ClassLessonPage() {
    const navigate = useNavigate();
    const { lessonId, classId } = useParams();
    const [lessonDataState, setLessonDataState] = useState({});
    const [loadingState, setLoadingState] = useState(true);

    const sendContext = useContext(NotificationSocketContext);
    const [previousLessonState, setPreviousLessonState] = useState(null);
    const [nextLessonState, setNextLessonState] = useState(null);
    const [userData, userDispatch] = useUser();

    const navigateToLesson = (lessonId) => {
        navigate('/class/' + classId + '/lesson/' + lessonId);
    };

    const location = useLocation();

    const loadData = () => {
        classLessonService.getClassLessonServiceById(lessonId).then((data) => {
            if (data.status !== 500) {
                setLessonDataState(data);
                setLoadingState(false);
            } else {
                navigate('/class/' + classId);
            }
        });
    };

    const textDataRef = useRef();
    useEffect(() => {
        loadData();
    }, [location]);

    useEffect(() => {
        /*
        const timeout = setTimeout(() => {
            setLoadingState(false);
        }, 2000);
        */
    }, [location]);

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
                navigate('/class/' + classId);
            }
        });
    };

    const [commentListState, setCommentListState] = useState([]);

    const loadComment = () => {
        commentService.getByLessonId(lessonId).then((data) => {
            if (data.length > 0) {
                setCommentListState(data);
            }
        });
    };

    useEffect(() => {
        loadComment();
    }, [location]);

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
    const [commentContent, setCommentContent] = useState('');
    const [commentPrivateMode, setCommentPrivateMode] = useState(0);
    const submitComment = () => {
        const obj = {
            lessonId: lessonId,
            content: commentContent,
            privateMode: commentPrivateMode,
        };
        commentService.post(obj).then((data) => {
            sendContext([], 'COMMENT');
            setCommentContent('');
        });
    };
    const [fileList, setFileList] = useState([]);
    const loadFiles = () => {
        classLessonService.getFiles(lessonId).then((data) => {
            if (data.length >= 0) {
                setFileList(data);
            }
        });
    };

    useEffect(() => {
        loadTopic();
        loadFiles();
    }, [location]);

    useEffect(() => {
        const trigger = (e) => {
            loadComment();
        };
        window.addEventListener('onCommentEvent', trigger);
        return () => {
            window.removeEventListener('onCommentEvent', trigger);
        };
    }, [location]);

    const [commentPagination, setCommentPagination] = useState(1);

    const fileRef = useRef();
    const uploadFile = (e) => {
        e.preventDefault();
        const files = e.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        uploadService.post(formData).then((res) => {
            if (res.ok) {
                alert('File uploaded successfully.');
            }
        });
    };

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
                                        return topic.visible ? (
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
                                        ) : (
                                            <></>
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
            <ExerciseUploadWidget fileList={fileList} multiple disable />

            <div className="mt-8">
                <h2 className="text-xl font-bold my-2">Nội dung bài học:</h2>
                <p>
                    {lessonDataState.textData && (
                        <div ref={textDataRef}>
                            <RichTextEditor readOnly disabled data={lessonDataState.textData} />
                        </div>
                    )}{' '}
                </p>
            </div>
            {classDataState &&
                (classDataState.userRoleCode === 'supporter' || classDataState.userRoleCode === 'teacher') && (
                    <div className="flex flex-row items-center justify-end mt-10">
                        <div className="mr-4">
                            <ClassLessonDeleteDialog id={lessonId} />
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
            <div className="pt-4 border-t-2 border-slate-200">
                <h2 className="text-xl font-bold mb-4">Bình luận</h2>
                <ul>
                    <div className={`w-full p-2 rounded `}>
                        <div className="w-full">
                            <div className="w-full">
                                <TextField
                                    label="Bình luận"
                                    placeholder="Bình luận"
                                    className="w-full bg-white"
                                    value={commentContent}
                                    onInput={(e) => {
                                        setCommentContent(e.target.value);
                                    }}
                                    maxRows={5}
                                    minRows={2}
                                    multiline
                                />
                            </div>
                        </div>
                        <div
                            onClick={commentContent ? submitComment : () => {}}
                            className={`w-full my-2 p-2 text-center rounded ${
                                commentContent
                                    ? 'hover:bg-blue-600 cursor-pointer active:bg-blue-700 bg-blue-500 shadow-blue-300'
                                    : 'bg-gray-300 shadow-gray-200'
                            } shadow select-none text-white font-bold`}
                        >
                            <FontAwesomeIcon icon={faComment} className="mr-2" /> Bình luận
                        </div>
                    </div>
                    {commentListState
                        .filter((comment) => !comment.parentId)
                        .map((comment, index) => {
                            return index + 1 <= commentPagination * 5 ? (
                                <li key={index}>
                                    <CommentCard
                                        avatar={comment.userAvatar}
                                        comment={comment.content}
                                        username={comment.userName}
                                        fullname={comment.fullname}
                                        date={comment.createdDate}
                                        isParent
                                        parentId={comment.id}
                                        reload={loadComment}
                                        id={comment.id}
                                        owner={userData.username === comment.userName}
                                    >
                                        {comment.replies.map((reply, key) => {
                                            return (
                                                <CommentCard
                                                    avatar={reply.userAvatar}
                                                    comment={reply.content}
                                                    username={reply.userName}
                                                    fullname={reply.fullname}
                                                    date={reply.createdDate}
                                                    parentId={comment.id}
                                                    reload={loadComment}
                                                    id={reply.id}
                                                    owner={userData.username === reply.userName}
                                                />
                                            );
                                        })}
                                    </CommentCard>
                                </li>
                            ) : (
                                <></>
                            );
                        })}
                </ul>
                <div className="flex flex-col items-center justify-center">
                    {commentListState.length > 0 &&
                        commentListState.filter((comment) => !comment.parentId)?.length > commentPagination * 5 && (
                            <Button
                                onClick={(e) => {
                                    setCommentPagination(commentPagination + 1);
                                }}
                                variant="outlined"
                                startIcon={<FontAwesomeIcon icon={faArrowDown} />}
                            >
                                Xem thêm
                            </Button>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ClassLessonPage;
