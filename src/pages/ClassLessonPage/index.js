import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '~/constants';
import parse from 'html-react-parser';
import { getConfig } from '~/services/config';
import { classLessonService } from '~/services/classLessonService';
import RichTextEditor from '~/components/RichTextEditor';
import FileReview from '~/components/FileReview';
import { fileService } from '~/services/fileService';
import SimpleAccordion from '~/components/SimpleAccordion';
import SimpleCustomAccordion from '~/components/SimpleCustomAccordion';
import { renderToTime } from '~/utils';

function ClassLessonPage() {
    const navigate = useNavigate();
    const { lessonId, classId } = useParams();
    const [lessonDataState, setLessonDataState] = useState({});

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

    useEffect(() => {
        loadData();
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
    }, [lessonId]);
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
    }, [lessonId]);

    const [fileListState, setFileListState] = useState([]);

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

    return (
        <div className="w-full p-4 md:p-0 text-justify">
            <div className="flex flex-row items-start justify-between">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId);
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
                <div>
                    <b>Topic:</b> {lessonDataState && lessonDataState.topicName}
                </div>
            </div>

            <h1 className="font-bold text-2xl my-4 mt-8">{lessonDataState && lessonDataState.name}</h1>

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
                <p>{lessonDataState && <RichTextEditor disabled data={lessonDataState.textData} />}</p>
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
        </div>
    );
}

export default ClassLessonPage;
