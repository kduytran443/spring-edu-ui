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
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '~/constants';
import parse from 'html-react-parser';
import { getConfig } from '~/services/config';

function ClassLessonPage() {
    const navigate = useNavigate();
    const { lessonId, classId } = useParams();
    const [lessonDataState, setLessonDataState] = useState(null);

    const [previousLessonState, setPreviousLessonState] = useState(null);
    const [nextLessonState, setNextLessonState] = useState(null);

    const navigateToLesson = (lessonId) => {
        navigate('/class/' + classId + '/lesson/' + lessonId);
    };

    /*PRIVATE*/
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
            <h1 className="font-bold text-2xl my-4">{lessonDataState && lessonDataState.name}</h1>

            <div>
                <p>{lessonDataState && parse(lessonDataState.textData)}</p>
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
